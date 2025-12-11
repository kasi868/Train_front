// src/components/EditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// default local preview image (developer-uploaded)
const DEFAULT_PREVIEW = "/mnt/data/97a0ea64-76c0-4e0f-8415-eea2339c24b8.jpg";

export default function EditProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const stored = localStorage.getItem("user");
  const storedUser = stored ? JSON.parse(stored) : null;

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(storedUser?.profileImageUrl ? `http://localhost:5000${storedUser.profileImageUrl}` : DEFAULT_PREVIEW);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    address: storedUser?.address || "",
    city: storedUser?.city || "",
    state: storedUser?.state || "",
    country: storedUser?.country || "",
    pincode: storedUser?.pincode || "",
    education: storedUser?.education || {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      fromYear: "",
      toYear: ""
    },
    experience: storedUser?.experience || [],
    skills: storedUser?.skills || [],
  });

  useEffect(() => {
    // refresh profile from server if we have id
    async function fetchProfile() {
      try {
        if (!storedUser?.id && !storedUser?._id) return;
        const id = storedUser.id || storedUser._id;
        const res = await axios.get(`http://localhost:5000/api/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          const u = res.data.user;
          setForm({
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            address: u.address || "",
            city: u.city || "",
            state: u.state || "",
            country: u.country || "",
            pincode: u.pincode || "",
            education: u.education || {
              institution: "",
              degree: "",
              fieldOfStudy: "",
              fromYear: "",
              toYear: ""
            },
            experience: u.experience || [],
            skills: u.skills || [],
          });
          if (u.profileImageUrl) setPreview(`http://localhost:5000${u.profileImageUrl}`);
          localStorage.setItem("user", JSON.stringify(u));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function addExperience() {
    setForm({ ...form, experience: [...form.experience, { company: "", role: "", start: "", end: "", description: "" }] });
  }
  function removeExperience(idx) {
    setForm({ ...form, experience: form.experience.filter((_, i) => i !== idx) });
  }
  function updateExperience(idx, key, value) {
    const ex = [...form.experience];
    ex[idx][key] = value;
    setForm({ ...form, experience: ex });
  }
  function addSkillFromInput(text) {
    if (!text) return;
    const parts = text.split(",").map(s => s.trim()).filter(Boolean);
    setForm({ ...form, skills: Array.from(new Set([...form.skills, ...parts])) });
  }
  function toggleSkill(skill) {
    const set = new Set(form.skills);
    if (set.has(skill)) set.delete(skill);
    else set.add(skill);
    setForm({ ...form, skills: Array.from(set) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone || "");
      fd.append("address", form.address || "");
      fd.append("city", form.city || "");
      fd.append("state", form.state || "");
      fd.append("country", form.country || "");
      fd.append("pincode", form.pincode || "");
      fd.append("education", JSON.stringify(form.education));
      fd.append("experience", JSON.stringify(form.experience));
      fd.append("skills", JSON.stringify(form.skills));

      if (file) fd.append("profileImage", file);

      const res = await axios.put("http://localhost:5000/api/profile/update", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("Profile updated");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/profile");
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating profile");
    } finally {
      setLoading(false);
    }
  }

  const suggestedSkills = ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="flex gap-6 items-start">
          <div className="w-40">
            <div className="w-40 h-40 rounded-full bg-gray-100 overflow-hidden">
              <img src={preview} alt="profile preview" className="w-full h-full object-cover" />
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-3" />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="p-3 border rounded" required />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="p-3 border rounded" disabled />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="p-3 border rounded" />
            <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="Pincode" className="p-3 border rounded" />
            <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="p-3 border rounded" />
            <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="p-3 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full p-3 border rounded" rows={2} />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Education</h3>
          <div className="grid grid-cols-2 gap-4">
            <input value={form.education.institution} onChange={(e) => setForm({ ...form, education: { ...form.education, institution: e.target.value } })} placeholder="Institution" className="p-3 border rounded" />
            <input value={form.education.degree} onChange={(e) => setForm({ ...form, education: { ...form.education, degree: e.target.value } })} placeholder="Degree" className="p-3 border rounded" />
            <input value={form.education.fieldOfStudy} onChange={(e) => setForm({ ...form, education: { ...form.education, fieldOfStudy: e.target.value } })} placeholder="Field of study" className="p-3 border rounded" />
            <input value={form.education.fromYear} onChange={(e) => setForm({ ...form, education: { ...form.education, fromYear: e.target.value } })} placeholder="From year" className="p-3 border rounded" />
            <input value={form.education.toYear} onChange={(e) => setForm({ ...form, education: { ...form.education, toYear: e.target.value } })} placeholder="To year" className="p-3 border rounded" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Experience</h3>
          <div className="space-y-4">
            {form.experience.map((exp, idx) => (
              <div key={idx} className="p-3 border rounded">
                <div className="grid grid-cols-2 gap-3">
                  <input value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} placeholder="Company" className="p-2 border rounded" />
                  <input value={exp.role} onChange={(e) => updateExperience(idx, "role", e.target.value)} placeholder="Role" className="p-2 border rounded" />
                  <input value={exp.start} onChange={(e) => updateExperience(idx, "start", e.target.value)} placeholder="Start (e.g., 2019)" className="p-2 border rounded" />
                  <input value={exp.end} onChange={(e) => updateExperience(idx, "end", e.target.value)} placeholder="End (e.g., 2021 or Present)" className="p-2 border rounded" />
                </div>
                <textarea value={exp.description} onChange={(e) => updateExperience(idx, "description", e.target.value)} placeholder="Description" className="w-full mt-2 p-2 border rounded" rows={3} />
                <div className="flex justify-end gap-2 mt-2">
                  <button type="button" onClick={() => removeExperience(idx)} className="px-3 py-1 bg-red-50 text-red-700 rounded">Remove</button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Experience</button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedSkills.map((s) => (
              <button type="button" key={s} onClick={() => toggleSkill(s)}
                className={`px-3 py-1 rounded ${form.skills.includes(s) ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                {s}
              </button>
            ))}
          </div>
          <input placeholder="Add custom skill (comma separated)" onBlur={(e) => { addSkillFromInput(e.target.value); e.target.value = ""; }} className="p-2 border rounded w-full" />
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 text-white rounded">
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

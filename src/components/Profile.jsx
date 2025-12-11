// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

/**
 * Modern animated Profile page (Edit + View)
 *
 * Notes:
 * - Uses FormData to send files + JSON fields to /api/profile/update
 * - Expects JWT token in localStorage ("token")
 * - Uses developer-uploaded default preview path:
 *   /mnt/data/97a0ea64-76c0-4e0f-8415-eea2339c24b8.jpg
 */

const DEFAULT_PREVIEW = "/mnt/data/97a0ea64-76c0-4e0f-8415-eea2339c24b8.jpg";

const fadeUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

export default function Profile() {
  const token = localStorage.getItem("token");

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const safeEdu = {
    institution: "",
    degree: "",
    fieldOfStudy: "",
    fromYear: "",
    toYear: "",
    cgpa: "",
  };

  const safeCert = [{ title: "", issuedBy: "", year: "" }];
  const safeProj = [{ title: "", description: "", link: "" }];
  const safeExp = [{ company: "", role: "", start: "", end: "", description: "" }];

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    education: safeEdu,
    experience: safeExp,
    skills: [],
    languages: [],
    hobbies: [],
    certifications: safeCert,
    projects: safeProj,
    profileImageUrl: "",
    resumeUrl: "",
  });

  // local file state for preview
  const [profileFile, setProfileFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_PREVIEW);

  // load profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!token) return;
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.success) {
          const u = res.data.user;
          setProfile({
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            gender: u.gender || "",
            dob: u.dob || "",
            bio: u.bio || "",
            address: u.address || "",
            city: u.city || "",
            state: u.state || "",
            country: u.country || "",
            pincode: u.pincode || "",
            education: u.education || safeEdu,
            experience: Array.isArray(u.experience) && u.experience.length ? u.experience : [],
            skills: Array.isArray(u.skills) ? u.skills : [],
            languages: Array.isArray(u.languages) ? u.languages : [],
            hobbies: Array.isArray(u.hobbies) ? u.hobbies : [],
            certifications: Array.isArray(u.certifications) && u.certifications.length ? u.certifications : [],
            projects: Array.isArray(u.projects) && u.projects.length ? u.projects : [],
            profileImageUrl: u.profileImageUrl || "",
            resumeUrl: u.resumeUrl || "",
          });

          if (u.profileImageUrl) {
            setPreviewUrl(`http://localhost:5000${u.profileImageUrl}`);
          }
          localStorage.setItem("user", JSON.stringify(u));
        }
      } catch (err) {
        console.error("fetchProfile:", err);
      }
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle profile image selection
  function onProfileFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setProfileFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function onResumeFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setResumeFile(f);
  }

  // dynamic helpers
  function addExperience() {
    setProfile((p) => ({ ...p, experience: [...(p.experience || []), { company: "", role: "", start: "", end: "", description: "" }] }));
  }
  function removeExperience(i) {
    setProfile((p) => ({ ...p, experience: p.experience.filter((_, idx) => idx !== i) }));
  }
  function updateExperience(i, key, value) {
    setProfile((p) => {
      const exp = [...(p.experience || [])];
      exp[i] = { ...exp[i], [key]: value };
      return { ...p, experience: exp };
    });
  }

  function addCertification() {
    setProfile((p) => ({ ...p, certifications: [...(p.certifications || []), { title: "", issuedBy: "", year: "" }] }));
  }
  function removeCertification(i) {
    setProfile((p) => ({ ...p, certifications: p.certifications.filter((_, idx) => idx !== i) }));
  }
  function updateCertification(i, key, val) {
    setProfile((p) => {
      const arr = [...(p.certifications || [])];
      arr[i] = { ...arr[i], [key]: val };
      return { ...p, certifications: arr };
    });
  }

  function addProject() {
    setProfile((p) => ({ ...p, projects: [...(p.projects || []), { title: "", description: "", link: "" }] }));
  }
  function removeProject(i) {
    setProfile((p) => ({ ...p, projects: p.projects.filter((_, idx) => idx !== i) }));
  }
  function updateProject(i, key, val) {
    setProfile((p) => {
      const arr = [...(p.projects || [])];
      arr[i] = { ...arr[i], [key]: val };
      return { ...p, projects: arr };
    });
  }

  function addSkill(skill) {
    if (!skill) return;
    setProfile((p) => ({ ...p, skills: Array.from(new Set([...(p.skills || []), skill])) }));
  }
  function removeSkill(skill) {
    setProfile((p) => ({ ...p, skills: (p.skills || []).filter((s) => s !== skill) }));
  }

  function addLanguage(lang) {
    if (!lang) return;
    setProfile((p) => ({ ...p, languages: Array.from(new Set([...(p.languages || []), lang])) }));
  }
  function removeLanguage(lang) {
    setProfile((p) => ({ ...p, languages: (p.languages || []).filter((s) => s !== lang) }));
  }

  function addHobby(hobby) {
    if (!hobby) return;
    setProfile((p) => ({ ...p, hobbies: Array.from(new Set([...(p.hobbies || []), hobby])) }));
  }
  function removeHobby(hobby) {
    setProfile((p) => ({ ...p, hobbies: (p.hobbies || []).filter((s) => s !== hobby) }));
  }

  // submit update
  async function handleSave() {
    try {
      setLoading(true);
      const fd = new FormData();

      // simple fields
      const simple = ["name", "phone", "gender", "dob", "bio", "address", "city", "state", "country", "pincode"];
      simple.forEach((k) => fd.append(k, profile[k] || ""));

      // nested & arrays -> stringified
      fd.append("education", JSON.stringify(profile.education || {}));
      fd.append("experience", JSON.stringify(profile.experience || []));
      fd.append("skills", JSON.stringify(profile.skills || []));
      fd.append("languages", JSON.stringify(profile.languages || []));
      fd.append("hobbies", JSON.stringify(profile.hobbies || []));
      fd.append("certifications", JSON.stringify(profile.certifications || []));
      fd.append("projects", JSON.stringify(profile.projects || []));

      if (profileFile) fd.append("profileImage", profileFile);
      if (resumeFile) fd.append("resume", resumeFile);

      const res = await axios.put("http://localhost:5000/api/profile/update", fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.success) {
        const u = res.data.user;
        // normalize nested defaults
        setProfile({
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          gender: u.gender || "",
          dob: u.dob || "",
          bio: u.bio || "",
          address: u.address || "",
          city: u.city || "",
          state: u.state || "",
          country: u.country || "",
          pincode: u.pincode || "",
          education: u.education || {},
          experience: u.experience || [],
          skills: u.skills || [],
          languages: u.languages || [],
          hobbies: u.hobbies || [],
          certifications: u.certifications || [],
          projects: u.projects || [],
          profileImageUrl: u.profileImageUrl || "",
          resumeUrl: u.resumeUrl || "",
        });

        // set preview to returned image url if any
        if (u.profileImageUrl) setPreviewUrl(`http://localhost:5000${u.profileImageUrl}`);

        localStorage.setItem("user", JSON.stringify(u));
        setEditing(false);
        alert("Profile updated successfully");
      } else {
        console.error("update failed", res.data);
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error("update error:", err);
      alert("Server error while updating profile");
    } finally {
      setLoading(false);
    }
  }

  // small UI helpers
  const chip = (text, onRemove) => (
    <div key={text} className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-sm">
      <span>{text}</span>
      {onRemove && (
        <button type="button" onClick={() => onRemove(text)} className="text-xs text-red-500">×</button>
      )}
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto p-6">
      <motion.h1 {...fadeUp} className="text-3xl font-extrabold mb-6">My Profile</motion.h1>

      <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: image + basic */}
        <motion.div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-1" {...fadeUp}>
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden border">
              <img src={previewUrl} alt="profile" className="w-full h-full object-cover" />
            </div>

            {editing && (
              <div className="mt-3 w-full">
                <label className="block text-sm text-slate-600">Change Photo</label>
                <input type="file" accept="image/*" onChange={onProfileFileChange} className="mt-2" />
              </div>
            )}

            <div className="mt-4 w-full text-center">
              <div className="text-xl font-semibold">{profile.name || "—"}</div>
              <div className="text-sm text-slate-500">{profile.email || "—"}</div>
            </div>

            <div className="mt-4 w-full">
              <div className="flex flex-wrap gap-2 justify-center">
                {profile.skills && profile.skills.length ? profile.skills.map((s) => chip(s, editing ? removeSkill : null)) : <div className="text-xs text-slate-400">No skills</div>}
              </div>
            </div>

            <div className="mt-4 w-full">
              {!editing ? (
                <button onClick={() => setEditing(true)} className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl">Edit Profile</button>
              ) : (
                <div className="space-y-2">
                  <button onClick={handleSave} disabled={loading} className="w-full px-4 py-2 bg-green-600 text-white rounded-xl">{loading ? "Saving..." : "Save Changes"}</button>
                  <button onClick={() => setEditing(false)} className="w-full px-4 py-2 border rounded-xl">Cancel</button>
                </div>
              )}
            </div>

            {/* Resume */}
            <div className="mt-4 w-full text-left">
              <label className="block text-sm text-slate-600">Resume</label>
              {!editing && profile.resumeUrl && (
                <a href={profile.resumeUrl.startsWith("/uploads") ? `http://localhost:5000${profile.resumeUrl}` : profile.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline text-sm">Open resume</a>
              )}
              {editing && (
                <input type="file" accept=".pdf,.doc,.docx" onChange={onResumeFileChange} className="mt-2" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Right column: sections */}
        <motion.div className="lg:col-span-2 space-y-6">
          {/* Personal + Contact */}
          <motion.section className="bg-white p-6 rounded-2xl shadow-lg" {...fadeUp}>
            <h3 className="text-lg font-semibold mb-3">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-slate-600">Full name</label>
                <input value={profile.name || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1 w-full p-2 border rounded" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Email</label>
                <input value={profile.email || ""} disabled className="mt-1 w-full p-2 border bg-gray-50 rounded" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Phone</label>
                <input value={profile.phone || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1 w-full p-2 border rounded" />
              </div>

              <div>
                <label className="text-sm text-slate-600">Gender</label>
                <select value={profile.gender || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="mt-1 w-full p-2 border rounded">
                  <option value="">Prefer not to say</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-600">Date of birth</label>
                <input type="date" value={profile.dob || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className="mt-1 w-full p-2 border rounded" />
              </div>

              <div className="md:col-span-3">
                <label className="text-sm text-slate-600">Short bio</label>
                <textarea value={profile.bio || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="mt-1 w-full p-2 border rounded" rows={3}></textarea>
              </div>
            </div>
          </motion.section>

          {/* Address */}
          <motion.section className="bg-white p-6 rounded-2xl shadow-lg" {...fadeUp}>
            <h3 className="text-lg font-semibold mb-3">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-3">
                <label className="text-sm text-slate-600">Address</label>
                <input value={profile.address || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="mt-1 w-full p-2 border rounded" />
              </div>
              <input value={profile.city || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, city: e.target.value })} placeholder="City" className="p-2 border rounded" />
              <input value={profile.state || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, state: e.target.value })} placeholder="State" className="p-2 border rounded" />
              <input value={profile.country || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, country: e.target.value })} placeholder="Country" className="p-2 border rounded" />
              <input value={profile.pincode || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, pincode: e.target.value })} placeholder="Pincode" className="p-2 border rounded" />
            </div>
          </motion.section>

          {/* Education */}
          <motion.section className="bg-white p-6 rounded-2xl shadow-lg" {...fadeUp}>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input value={profile.education?.institution || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, education: { ...profile.education, institution: e.target.value } })} placeholder="Institution" className="p-2 border rounded" />
              <input value={profile.education?.degree || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, education: { ...profile.education, degree: e.target.value } })} placeholder="Degree" className="p-2 border rounded" />
              <input value={profile.education?.fieldOfStudy || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, education: { ...profile.education, fieldOfStudy: e.target.value } })} placeholder="Field of study" className="p-2 border rounded" />
              <input value={profile.education?.fromYear || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, education: { ...profile.education, fromYear: e.target.value } })} placeholder="From year" className="p-2 border rounded" />
              <input value={profile.education?.toYear || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, education: { ...profile.education, toYear: e.target.value } })} placeholder="To year" className="p-2 border rounded" />
              <input value={profile.education?.cgpa || ""} disabled={!editing} onChange={(e) => setProfile({ ...profile, education: { ...profile.education, cgpa: e.target.value } })} placeholder="Percentage / CGPA" className="p-2 border rounded" />
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section className="bg-white p-6 rounded-2xl shadow-lg" {...fadeUp}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-3">Experience</h3>
              {editing && <button onClick={addExperience} className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">Add</button>}
            </div>

            <div className="space-y-4">
              {(profile.experience || []).length === 0 && <div className="text-sm text-slate-500">No experience listed.</div>}
              {(profile.experience || []).map((exp, i) => (
                <div key={i} className="p-4 border rounded">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input value={exp.company || ""} disabled={!editing} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Company" className="p-2 border rounded" />
                    <input value={exp.role || ""} disabled={!editing} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Role" className="p-2 border rounded" />
                    <input value={exp.start || ""} disabled={!editing} onChange={(e) => updateExperience(i, "start", e.target.value)} placeholder="Start (e.g., 2019)" className="p-2 border rounded" />
                    <input value={exp.end || ""} disabled={!editing} onChange={(e) => updateExperience(i, "end", e.target.value)} placeholder="End (e.g., 2021 or Present)" className="p-2 border rounded" />
                    <textarea value={exp.description || ""} disabled={!editing} onChange={(e) => updateExperience(i, "description", e.target.value)} placeholder="Description" className="md:col-span-3 p-2 border rounded" rows={3}></textarea>
                  </div>
                  {editing && <div className="mt-2 text-right"><button onClick={() => removeExperience(i)} className="text-sm text-red-600">Remove</button></div>}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Skills / Languages / Hobbies */}
          <motion.section className="bg-white p-6 rounded-2xl shadow-lg" {...fadeUp}>
            <h3 className="text-lg font-semibold mb-3">Skills / Languages / Hobbies</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-slate-600">Skills</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {(profile.skills || []).map((s) => chip(s, editing ? removeSkill : null))}
                </div>
                {editing && <input onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(e.target.value); e.target.value = ""; } }} placeholder="Type skill and press Enter" className="mt-2 p-2 border rounded w-full" />}
              </div>

              <div>
                <label className="text-sm text-slate-600">Languages</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {(profile.languages || []).map((s) => chip(s, editing ? removeLanguage : null))}
                </div>
                {editing && <input onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLanguage(e.target.value); e.target.value = ""; } }} placeholder="Add language and press Enter" className="mt-2 p-2 border rounded w-full" />}
              </div>

              <div>
                <label className="text-sm text-slate-600">Hobbies</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {(profile.hobbies || []).map((s) => chip(s, editing ? removeHobby : null))}
                </div>
                {editing && <input onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addHobby(e.target.value); e.target.value = ""; } }} placeholder="Add hobby and press Enter" className="mt-2 p-2 border rounded w-full" />}
              </div>
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section className="bg-white p-6 rounded-2xl shadow-lg" {...fadeUp}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-3">Certifications</h3>
              {editing && <button onClick={addCertification} className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">Add</button>}
            </div>

            <div className="space-y-4">
              {(profile.certifications || []).length === 0 && <div className="text-sm text-slate-500">No certifications listed.</div>}
              {(profile.certifications || []).map((c, i) => (
                <div key={i} className="p-3 border rounded grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input value={c.title || ""} disabled={!editing} onChange={(e) => updateCertification(i, "title", e.target.value)} placeholder="Title" className="p-2 border rounded" />
                  <input value={c.issuedBy || ""} disabled={!editing} onChange={(e) => updateCertification(i, "issuedBy", e.target.value)} placeholder="Issued by" className="p-2 border rounded" />
                  <input value={c.year || ""} disabled={!editing} onChange={(e) => updateCertification(i, "year", e.target.value)} placeholder="Year" className="p-2 border rounded" />
                  {editing && <div className="flex items-center"><button onClick={() => removeCertification(i)} className="text-sm text-red-600">Remove</button></div>}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section className="bg-white p-6 rounded-2xl shadow-lg" {...fadeUp}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-3">Projects</h3>
              {editing && <button onClick={addProject} className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">Add</button>}
            </div>

            <div className="space-y-4">
              {(profile.projects || []).length === 0 && <div className="text-sm text-slate-500">No projects listed.</div>}
              {(profile.projects || []).map((p, i) => (
                <div key={i} className="p-3 border rounded grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input value={p.title || ""} disabled={!editing} onChange={(e) => updateProject(i, "title", e.target.value)} placeholder="Title" className="p-2 border rounded" />
                  <input value={p.link || ""} disabled={!editing} onChange={(e) => updateProject(i, "link", e.target.value)} placeholder="Link" className="p-2 border rounded" />
                  <textarea value={p.description || ""} disabled={!editing} onChange={(e) => updateProject(i, "description", e.target.value)} placeholder="Description" className="p-2 border rounded" rows={2}></textarea>
                  {editing && <div className="flex items-center"><button onClick={() => removeProject(i)} className="text-sm text-red-600">Remove</button></div>}
                </div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </main>
  );
}

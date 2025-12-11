import React from "react";
import {
  useGetMyInternshipsQuery,
  useDeleteInternshipMutation,
} from "../redux/api/employerApi";
import { useNavigate } from "react-router-dom";

export default function MyInternships() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyInternshipsQuery();
  const [deleteInternship] = useDeleteInternshipMutation();

  if (isLoading)
    return <div className="p-10 text-lg">Loading internships...</div>;

  const internships = data?.internships || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?"))
      return;

    try {
      await deleteInternship(id).unwrap();
      alert("Internship deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete internship");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">
        My Internships
      </h2>

      {internships.length === 0 ? (
        <div className="text-slate-600 text-lg">No internships posted yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((intern) => (
            <div
              key={intern._id}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{intern.title}</h3>
              <p className="text-slate-600 mt-2">{intern.company}</p>
              <p className="text-sm text-slate-500 mt-1">{intern.location}</p>

              <p className="mt-2 text-green-600 font-medium">
                Stipend: {intern.stipend}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Duration: {intern.duration}
              </p>

              <p className="mt-3 text-sm text-slate-600">
                {intern.description}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/employer/edit-internship/${intern._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(intern._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

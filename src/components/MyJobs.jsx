import React from "react";
import {
  useGetMyJobsQuery,
  useDeleteJobMutation,
} from "../redux/api/employerApi";
import { useNavigate } from "react-router-dom";

export default function MyJobs() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyJobsQuery();
  const [deleteJob] = useDeleteJobMutation();

  if (isLoading)
    return <div className="p-10 text-lg">Loading jobs...</div>;

  const jobs = data?.jobs || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(id).unwrap();
      alert("Job deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">My Jobs</h2>

      {jobs.length === 0 ? (
        <div className="text-slate-600 text-lg">No jobs posted yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-slate-600 mt-2">{job.company}</p>
              <p className="text-sm text-slate-500 mt-1">{job.location}</p>

              {job.salary && (
                <p className="mt-2 text-indigo-600 font-medium">
                  Salary: {job.salary}
                </p>
              )}

              <p className="mt-3 text-sm text-slate-600">
                {job.description}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/employer/edit-job/${job._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
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

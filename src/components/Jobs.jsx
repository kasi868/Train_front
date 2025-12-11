// src/components/Jobs.jsx
import React, { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useGetAllJobsQuery,
  useGetAllInternshipsQuery,
} from "../redux/api/jobApi";

// --- Job / Internship Card ---
const JobCard = memo(function JobCard({ job, index }) {
  const isInternship = job.type === "internship";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl border transition cursor-pointer"
    >
      <div className="flex justify-between items-start">

        {/* LEFT SIDE */}
        <div className="w-full">
          <div className="flex items-center gap-3">
            <div className="font-bold text-lg text-slate-800">{job.title}</div>

            <div
              className={`text-xs px-2 py-1 rounded-full border ${
                isInternship
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : "bg-blue-100 text-blue-800 border-blue-200"
              }`}
            >
              {isInternship ? "Internship" : "Job"}
            </div>
          </div>

          <div className="text-sm text-slate-500 mt-1">
            {job.company} • {job.location}
          </div>

          {/* Job Salary */}
          {!isInternship && job.salary && (
            <div className="mt-2 text-sm font-medium text-slate-700">
              Salary: {job.salary}
            </div>
          )}

          {/* Internship Stipend */}
          {isInternship && job.stipend && (
            <div className="mt-2 text-sm font-medium text-slate-700">
              Stipend: {job.stipend} • Duration: {job.duration}
            </div>
          )}

          {/* Skills */}
          <div className="text-xs text-slate-400 mt-2">
            Skills: {job.skills?.join(", ")}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-end gap-2">
          <Link
            to={`/jobs/${job._id}`}
            className="px-4 py-1.5 rounded-md border text-sm hover:bg-slate-100 transition"
          >
            View
          </Link>

          <button className="px-4 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow transition">
            Apply
          </button>
        </div>

      </div>
    </motion.div>
  );
});

// ==============================
// MAIN PAGE
// ==============================
export default function JobsPage({ filterType }) {
  const location = useLocation();
  const [filter, setFilter] = useState(filterType || "all");

  // Fetch jobs + internships separately
  const { data: jobsData, isLoading: loadingJobs } = useGetAllJobsQuery();
  const {
    data: internshipData,
    isLoading: loadingInternships,
  } = useGetAllInternshipsQuery();

  useEffect(() => {
    setFilter(filterType || "all");
  }, [filterType, location.pathname]);

  if (loadingJobs || loadingInternships)
    return <div className="p-10 text-lg">Loading jobs...</div>;

  const jobs = jobsData?.jobs || [];
  const internships = internshipData?.internships || [];

  // Combine into ONE list
  const allItems = [
    ...jobs.map((j) => ({ ...j, type: "job" })),
    ...internships.map((i) => ({ ...i, type: "internship" })),
  ];

  // Apply filter
  const visible =
    filter === "all"
      ? allItems
      : allItems.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-14 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-slate-800">
            Job & Internship Openings
          </h2>

          <p className="text-slate-600 mt-3 font-semibold text-lg max-w-2xl">
            Browse the latest job and internship opportunities.
          </p>

          {/* FILTER BUTTONS */}
          <div className="flex gap-3 mt-6">
            {[
              { label: "All", value: "all" },
              { label: "Jobs", value: "job" },
              { label: "Internships", value: "internship" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-5 py-2 rounded-xl border text-sm font-medium ${
                  filter === btn.value
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "border-slate-300 bg-white hover:bg-slate-100"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* JOB & INTERNSHIP LIST */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
        {visible.map((job, index) => (
          <JobCard key={job._id} job={job} index={index} />
        ))}
      </div>
    </div>
  );
}

// src/components/AdminPanel.jsx
import React, { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetPendingEmployersQuery,
  useApproveEmployerMutation,
  useRejectEmployerMutation,
  useGetJobsAdminQuery,
  useDeleteJobAdminMutation,
  useGetInternshipsAdminQuery,
  useDeleteInternshipAdminMutation,
  useGetCoursesAdminQuery,
  useDeleteCourseAdminMutation,
  useGetStatsQuery,
} from "../redux/api/adminApi";

import { useNavigate } from "react-router-dom";

import {
  Users2,
  Briefcase,
  Box,
  BookOpen,
  ChartPie,
  Settings,
  Trash,
  CheckCircle,
} from "lucide-react";

export default function AdminPanel() {
  const [tab, setTab] = useState("dashboard");
  const navigate = useNavigate();

  const { data: stats } = useGetStatsQuery();
  const { data: users } = useGetUsersQuery(undefined, { skip: tab !== "users" });
  const { data: pending } = useGetPendingEmployersQuery(undefined, { skip: tab !== "employers" });
  const { data: jobs } = useGetJobsAdminQuery(undefined, { skip: tab !== "jobs" });
  const { data: internships } = useGetInternshipsAdminQuery(undefined, { skip: tab !== "internships" });
  const { data: courses } = useGetCoursesAdminQuery(undefined, { skip: tab !== "courses" });

  const [deleteUser] = useDeleteUserMutation();
  const [approveEmployer] = useApproveEmployerMutation();
  const [rejectEmployer] = useRejectEmployerMutation();
  const [deleteJob] = useDeleteJobAdminMutation();
  const [deleteInternship] = useDeleteInternshipAdminMutation();
  const [deleteCourse] = useDeleteCourseAdminMutation();

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await deleteUser(id).unwrap();
  };

  const handleApproveEmployer = async (id) => {
    await approveEmployer(id).unwrap();
  };

  const handleRejectEmployer = async (id) => {
    if (!window.confirm("Reject employer?")) return;
    await rejectEmployer(id).unwrap();
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Delete job?")) return;
    await deleteJob(id).unwrap();
  };

  const handleDeleteInternship = async (id) => {
    if (!window.confirm("Delete internship?")) return;
    await deleteInternship(id).unwrap();
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await deleteCourse(id).unwrap();
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        
        {/* SIDEBAR */}
        <aside className="w-64">
          <div className="space-y-2 sticky top-20">
            {[
              ["dashboard", <ChartPie />, "Dashboard"],
              ["users", <Users2 />, "Users"],
              ["employers", <Briefcase />, "Employers"],
              ["jobs", <Box />, "Jobs"],
              ["internships", <Box />, "Internships"],
              ["courses", <BookOpen />, "Courses"],
              ["settings", <Settings />, "Settings"],
            ].map(([key, icon, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 ${
                  tab === key ? "bg-indigo-50" : ""
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main>
          <h2 className="text-2xl font-extrabold mb-4">Admin Panel</h2>

          {tab === "dashboard" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Users" value={stats?.users || 0} />
                <StatCard title="Employers" value={stats?.employers || 0} />
                <StatCard title="Jobs" value={stats?.jobs || 0} />
                <StatCard title="Courses" value={stats?.courses || 0} />
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold mb-3">Quick Actions</h3>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/employer/post-job")}
                    className="p-2 bg-indigo-600 text-white rounded"
                  >
                    Create Job
                  </button>

                  <button
                    onClick={() => navigate("/employer/post-course")}
                    className="p-2 bg-green-600 text-white rounded"
                  >
                    Create Course
                  </button>

                  <button
                    onClick={() => navigate("/employer/post-internship")}
                    className="p-2 bg-violet-600 text-white rounded"
                  >
                    Create Internship
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "users" && (
            <DataList
              title="Users"
              list={users}
              deleteAction={handleDeleteUser}
            />
          )}

          {tab === "employers" && (
            <div className="space-y-4">
              {pending?.map((e) => (
                <Card key={e._id} title={e.companyName} subtitle={e.email}>
                  <button onClick={() => handleApproveEmployer(e._id)} className="px-3 py-1 bg-green-500 text-white rounded">
                    Approve
                  </button>
                  <button onClick={() => handleRejectEmployer(e._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                    Reject
                  </button>
                </Card>
              ))}
            </div>
          )}

          {tab === "jobs" && (
            <DataList
              title="Jobs"
              list={jobs}
              deleteAction={handleDeleteJob}
            />
          )}

          {tab === "internships" && (
            <DataList
              title="Internships"
              list={internships}
              deleteAction={handleDeleteInternship}
            />
          )}

          {tab === "courses" && (
            <DataList
              title="Courses"
              list={courses}
              deleteAction={handleDeleteCourse}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h4 className="text-sm text-slate-500">{title}</h4>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow flex justify-between">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

function DataList({ title, list, deleteAction }) {
  if (!list?.length) return <div>No {title} found.</div>;

  return (
    <div className="space-y-4">
      {list.map((i) => (
        <Card key={i._id} title={i.title || i.name} subtitle={i.email || i.company}>
          <button
            onClick={() => deleteAction(i._id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </Card>
      ))}
    </div>
  );
}

// src/components/CourseDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCourseByIdQuery } from "../redux/api/courseApi";

export default function CourseDetail() {
  const { id } = useParams();
  const { data: course, isLoading } = useGetCourseByIdQuery(id);

  if (isLoading)
    return <div className="p-8 text-center text-lg">Loading...</div>;

  if (!course) return <div className="p-8">Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">{course.title}</h1>
            <div className="text-sm text-slate-500">
              {course.mode} • {course.duration} • {course.videos} videos
            </div>
            <p className="mt-4 text-slate-700">{course.summary}</p>
          </div>

          <div className="text-right">
            <div className="text-indigo-600 font-bold text-xl">
              {course.price}
            </div>
            <Link
              to="/contact"
              className="mt-4 inline-block px-4 py-2 rounded bg-indigo-600 text-white"
            >
              Enroll
            </Link>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold">Syllabus</h3>
            <ul className="mt-3 text-slate-600 list-disc list-inside">
              {course.syllabus?.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Assessments & Support</h3>
            <p className="mt-2 text-slate-600">
              quizzes, tasks, assignment reviews, doubt-solving support.
            </p>
            <Link
              to="/chatbot"
              className="mt-4 inline-block px-3 py-2 border rounded"
            >
              Open Chatbot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { COURSES } from "../components/mock";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";

// Import your home hero image
import homeHeroImg from "../assests/z2.png";

function Stat({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white/60 backdrop-blur-md border rounded-xl text-center shadow-sm hover:shadow-md transition"
    >
      <div className="text-3xl font-extrabold text-indigo-600">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main>

      {/* ---------------- HERO SECTION ---------------- */}
      <section
        className="
          py-24 
          bg-gradient-to-br 
          from-[#d6e4ff]
          via-[#bfd8ff]
          to-[#8cb5ff]
        "
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-[3.2rem] font-extrabold leading-tight text-slate-800">
              Learn, Test & Get Hired —
              <span className="text-indigo-600"> end-to-end</span> placement platform
            </h1>

            <p className="mt-6 text-slate-700 max-w-xl text-lg">
              Online & offline courses, structured hiring rounds, CV builder,
              portfolio tools and an AI assistant to guide your learning journey.
            </p>

            {/* Buttons */}
            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/courses"
                className="px-5 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Explore Courses
              </Link>

              <Link
                to="/jobs"
                className="px-5 py-3 border font-medium rounded-xl shadow-sm hover:shadow transition"
              >
                Browse Jobs
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Courses" value="12+" />
              <Stat label="Companies" value="80+" />
              <Stat label="Placements" value="230+" />
              <Stat label="Internships" value="50+" />
            </div>

            <div className="mt-10">
              <SearchBar />
            </div>
          </motion.div>

          {/* ---------------- RIGHT SECTION WITH IMAGE ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.img
              src={homeHeroImg}
              alt="Learning Illustration"
              className="w-[full] md:w-[520px] -mr-24 drop-shadow-2xl rounded-3xl"

              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

        </div>
      </section>

      {/* ---------------- FEATURED COURSE ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 backdrop-blur-lg border shadow-xl rounded-3xl p-6 md:p-8"
        >
          <h2 className="text-xl font-bold mb-4 text-indigo-700">
            ⭐ Featured Course
          </h2>

          <CourseCard course={COURSES[0]} />
        </motion.div>
      </section>

      {/* ---------------- TOP COURSES SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold"
        >
          Top Courses
        </motion.h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.slice(1).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border transition"
            >
              <CourseCard course={c} />
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}

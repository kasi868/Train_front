import React from "react";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <p className="mt-3 text-slate-600">
        Have questions about courses, jobs, or training? Feel free to reach out.
      </p>

      <form className="mt-6 bg-white shadow p-6 rounded-xl grid gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border px-4 py-2 rounded"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Subject"
          className="border px-4 py-2 rounded"
        />

        <textarea
          placeholder="Write your message..."
          className="border px-4 py-2 rounded h-32"
        ></textarea>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Send Message
        </button>
      </form>

      <div className="mt-8 text-slate-700">
        <h3 className="text-xl font-semibold">Our Office</h3>
        <p className="mt-2">MaxZen Tech Solutions</p>
        <p>Hyderabad, Telangana</p>
        <p>Email: info@maxzen.tech</p>
        <p>Phone: +91 99999 99999</p>
      </div>
    </div>
  );
}

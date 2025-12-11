// src/components/JobDetail.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { JOBS } from '../components/mock'

export default function JobDetail() {
  const { id } = useParams()
  const job = JOBS.find(j => j.id === id)
  if (!job) return <div className="p-8">Listing not found</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold">{job.title}</h1>
              <div className={`text-xs px-2 py-1 rounded-full ${job.type === 'internship' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                {job.type === 'internship' ? 'Internship' : 'Job'}
              </div>
            </div>

            <div className="text-sm text-slate-500 mt-2">{job.company} • {job.location}</div>

            <p className="mt-4 text-slate-700">
              {job.type === 'internship'
                ? `This internship runs for ${job.duration}. Stipend: ${job.stipend}.`
                : `This is a salaried role. Salary: ${job.salary || 'Competitive'}.`}
            </p>

            <h4 className="mt-6 font-semibold">Selection Rounds</h4>
            <ol className="list-decimal list-inside mt-2 text-slate-600">
              {job.rounds.map((r, i) => <li key={i}>{r}</li>)}
            </ol>

            {job.type === 'internship' && (
              <>
                <h4 className="mt-6 font-semibold">Internship Details</h4>
                <ul className="list-disc list-inside mt-2 text-slate-600">
                  <li>Duration: {job.duration}</li>
                  <li>Stipend: {job.stipend}</li>
                  <li>Possible conversion: {job.possibleConversion ? 'Yes' : 'No'}</li>
                </ul>
              </>
            )}
          </div>

          <div className="text-right">
            <div className="text-indigo-600 font-bold text-xl">Apply</div>
            <Link to="/tests" className="mt-4 inline-block px-4 py-2 rounded bg-indigo-600 text-white">Start Test</Link>
            <Link to="/schedule-interview" className="mt-2 inline-block px-4 py-2 rounded border">Schedule Interview</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

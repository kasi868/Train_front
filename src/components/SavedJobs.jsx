// src/components/extra/SavedJobs.jsx
import React, { useEffect, useState } from 'react'

const KEY = 'saved_jobs_v1'

export default function SavedJobs() {
  const [saved, setSaved] = useState([])

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || '[]')
      setSaved(s)
    } catch { setSaved([]) }
  }, [])

  function remove(id) {
    const next = saved.filter(s => s.id !== id)
    setSaved(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }

  if (!saved.length) return <div className="p-6 bg-white rounded">No saved jobs yet</div>

  return (
    <div className="space-y-4">
      {saved.map(s => (
        <div key={s.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <div className="font-semibold">{s.title}</div>
            <div className="text-sm text-slate-500">{s.company}</div>
          </div>
          <div className="flex gap-2">
            <a className="px-3 py-2 border rounded" href={`/jobs/${s.id}`}>View</a>
            <button onClick={() => remove(s.id)} className="px-3 py-2 bg-rose-500 text-white rounded">Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}

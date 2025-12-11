// src/components/extra/JobCardAdvanced.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import JobCardAdvanced from './extra/JobCardAdvanced'

export default function JobCardAdvanced({ item, onSave }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="font-bold text-lg">{item.title}</div>
          <div className={`text-xs px-2 py-1 rounded-full ${item.type==='internship'? 'bg-amber-100 text-amber-800':'bg-slate-100 text-slate-700'}`}>{item.type==='internship' ? 'Internship' : 'Job'}</div>
        </div>
        <div className="text-sm text-slate-500">{item.company} • {item.location}</div>
        <div className="mt-2 text-sm text-slate-700">{item.salary || item.stipend || ''}</div>
        <div className="mt-3 text-xs text-slate-400">Rounds: {item.rounds?.join(' → ')}</div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Link to={`/jobs/${item.id}`} className="px-3 py-2 border rounded">View</Link>
        <button onClick={() => onSave(item)} className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
        <JobCardAdvanced item={j} onSave={saveJob} />
      </div>
    </div>
  )
}

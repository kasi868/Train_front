// src/components/extra/CompanyPage.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { COMPANIES } from '../components/companies'
import { JOBS } from '../components/mock'

export default function CompanyPage() {
  const { id } = useParams()
  const company = COMPANIES.find(c => c.id === id)
  if (!company) return <div className="p-8">Company not found</div>
  const roles = JOBS.filter(j => j.company.toLowerCase().includes(company.name.toLowerCase()) || j.company===company.name)
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{company.name}</h1>
            <div className="text-sm text-slate-500">{company.industry} • {company.location} • {company.size}</div>
            <p className="mt-3 text-slate-700">{company.about}</p>
          </div>
          <a href={company.website} target="_blank" rel="noreferrer" className="px-3 py-2 border rounded">Website</a>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Open Roles</h3>
        <div className="mt-4 space-y-3">
          {roles.length === 0 ? <div className="text-slate-500">No open roles right now</div> : roles.map(r => (
            <div key={r.id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-slate-500">{r.location}</div>
              </div>
              <a href={`/jobs/${r.id}`} className="px-3 py-2 bg-indigo-600 text-white rounded">View</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

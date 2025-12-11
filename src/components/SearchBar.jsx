// src/components/extra/SearchBar.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ defaultKeyword = '', defaultLoc = '' }) {
  const [keyword, setKeyword] = useState(defaultKeyword)
  const [location, setLocation] = useState(defaultLoc)
  const [type, setType] = useState('all')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    // navigate to jobs with query params
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (location) params.set('loc', location)
    if (type && type !== 'all') params.set('type', type)
    navigate(`/jobs?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className="bg-white p-3 rounded-lg shadow flex gap-2 items-center">
      <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="What job title, skill or company?" className="flex-1 px-3 py-2 border rounded" />
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="w-48 px-3 py-2 border rounded" />
      <select value={type} onChange={e=>setType(e.target.value)} className="px-3 py-2 border rounded">
        <option value="all">All</option>
        <option value="job">Jobs</option>
        <option value="internship">Internships</option>
        <option value="remote">Remote</option>
      </select>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Search</button>
    </form>
  )
}

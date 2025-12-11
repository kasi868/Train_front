// src/components/extra/Alerts.jsx
import React, { useState, useEffect } from 'react'

const KEY = 'job_alerts_v1'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    setAlerts(JSON.parse(localStorage.getItem(KEY) || '[]'))
  }, [])

  function add() {
    if (!keyword.trim()) return
    const next = [{ id: Date.now(), keyword: keyword.trim() }, ...alerts]
    setAlerts(next)
    localStorage.setItem(KEY, JSON.stringify(next))
    setKeyword('')
  }

  function remove(id) {
    const next = alerts.filter(a => a.id !== id)
    setAlerts(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <div className="flex gap-2">
        <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Keyword for alert (eg: React)" className="flex-1 border rounded px-3 py-2" />
        <button onClick={add} className="px-3 py-2 bg-indigo-600 text-white rounded">Create</button>
      </div>

      {alerts.length === 0 ? <div className="text-slate-500">No alerts created</div> : (
        <div className="space-y-2">
          {alerts.map(a => (
            <div key={a.id} className="flex justify-between items-center">
              <div>{a.keyword}</div>
              <button onClick={() => remove(a.id)} className="text-sm text-rose-600">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import React, {useState} from 'react'
import { Link } from 'react-router-dom'


export default function ScheduleInterview(){
const [date,setDate] = useState('')
const [time,setTime] = useState('')
const [link,setLink] = useState('')
function schedule(){ if(!date||!time) return alert('Pick date & time'); const zoom = `https://zoom.us/j/${Math.floor(1000000000 + Math.random()*9000000000)}`; setLink(zoom); alert('Interview scheduled — calendar invite simulated.') }
return (
<div className="max-w-2xl mx-auto px-6 py-10">
<h2 className="text-2xl font-bold">Schedule Interview (Simulated)</h2>
<div className="mt-6 bg-white p-6 rounded-2xl shadow">
<label className="block">Date</label>
<input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-3 py-2 mt-2 w-full" />
<label className="block mt-3">Time</label>
<input type="time" value={time} onChange={e=>setTime(e.target.value)} className="border rounded px-3 py-2 mt-2 w-full" />
<div className="mt-4 flex gap-2"><button onClick={schedule} className="px-3 py-2 bg-indigo-600 text-white rounded">Schedule</button><Link to="/jobs" className="px-3 py-2 border rounded">Back to Jobs</Link></div>
{link? <div className="mt-4 p-3 border rounded bg-slate-50">Zoom Link: <a href={link} className="text-indigo-600" target="_blank" rel="noreferrer">{link}</a></div>: null}
</div>
</div>
)
}
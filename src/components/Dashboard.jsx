import React from 'react'


export default function Dashboard(){
return (
<div className="max-w-7xl mx-auto px-6 py-10">
<h2 className="text-2xl font-bold">Dashboard</h2>
<div className="mt-6 grid md:grid-cols-3 gap-6">
<div className="bg-white p-6 rounded-2xl shadow"><div className="font-semibold">My Courses</div><div className="mt-3 text-slate-600">You are enrolled in 2 courses.</div></div>
<div className="bg-white p-6 rounded-2xl shadow"><div className="font-semibold">My Tests</div><div className="mt-3 text-slate-600">1 upcoming test — Aptitude, Nov 30</div></div>
<div className="bg-white p-6 rounded-2xl shadow"><div className="font-semibold">My Applications</div><div className="mt-3 text-slate-600">Applied to 3 roles. 1 in progress.</div></div>
</div>
</div>
)
}
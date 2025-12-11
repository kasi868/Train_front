import React, {useState} from 'react'


export default function PortfolioBuilder(){
const [projects,setProjects] = useState([])
const [title,setTitle] = useState('')
const [desc,setDesc] = useState('')
function addProject(){ if(!title.trim()) return; setProjects(p=>[...p,{id:Date.now(), title: title.trim(), desc: desc.trim()}]); setTitle(''); setDesc('') }
return (
<div className="max-w-4xl mx-auto px-6 py-10">
<h2 className="text-2xl font-bold">Portfolio Builder</h2>
<div className="mt-6 grid md:grid-cols-2 gap-6">
<div className="bg-white p-6 rounded-2xl shadow">
<h3 className="font-semibold">Add Project</h3>
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Project title" className="mt-3 w-full border rounded px-3 py-2" />
<textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description" className="mt-3 w-full border rounded px-3 py-2" />
<div className="mt-3 flex gap-2"><button onClick={addProject} className="px-3 py-2 bg-indigo-600 text-white rounded">Add</button><button onClick={()=>{setTitle(''); setDesc('')}} className="px-3 py-2 border rounded">Clear</button></div>
</div>
<div className="bg-white p-6 rounded-2xl shadow">
<h3 className="font-semibold">Preview</h3>
<div className="mt-4 space-y-4">{projects.length===0? <div className="text-slate-500">No projects yet. Add one to see preview.</div>: null}{projects.map(p=>(<div key={p.id} className="border rounded p-3"><div className="font-semibold">{p.title}</div><div className="text-sm text-slate-600">{p.desc}</div></div>))}</div>
</div>
</div>
</div>
)
}
import React, {useEffect, useState} from 'react'
import { UploadCloud } from 'lucide-react'


export default function CVBuilder(){
const [form,setForm] = useState({name:'', email:'', phone:'', summary:'', skills:''})
const [file,setFile] = useState(null)
const [preview,setPreview] = useState(null)
useEffect(()=>{ if(!file){ setPreview(null); return } const reader = new FileReader(); reader.onload = e=> setPreview(e.target.result); reader.readAsDataURL(file) },[file])
function downloadCV(){ const html = `<html><body><h1>${form.name}</h1><p>${form.summary}</p><h3>Skills</h3><p>${form.skills}</p><h3>Contact</h3><p>${form.email} • ${form.phone}</p></body></html>`; const blob = new Blob([html], {type:'text/html'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${form.name || 'cv'}.html`; a.click(); URL.revokeObjectURL(url) }
return (
<div className="max-w-3xl mx-auto px-6 py-10">
<h2 className="text-2xl font-bold">CV Builder & Uploader</h2>
<div className="mt-6 grid md:grid-cols-2 gap-6">
<div className="bg-white p-6 rounded-2xl shadow">
<input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Full name" className="w-full border rounded px-3 py-2" />
<input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="Email" className="mt-3 w-full border rounded px-3 py-2" />
<input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} placeholder="Phone" className="mt-3 w-full border rounded px-3 py-2" />
<textarea value={form.summary} onChange={e=>setForm({...form, summary: e.target.value})} placeholder="Professional summary" className="mt-3 w-full border rounded px-3 py-2" />
<input value={form.skills} onChange={e=>setForm({...form, skills: e.target.value})} placeholder="Comma separated skills" className="mt-3 w-full border rounded px-3 py-2" />
<div className="mt-3"><label className="flex items-center gap-2 cursor-pointer"><UploadCloud /><span>Upload existing CV (pdf/png/jpg)</span><input type="file" accept="image/*,.pdf" onChange={e=>setFile(e.target.files?.[0] ?? null)} className="hidden" /></label>{preview? <div className="mt-3 text-sm text-slate-500">Preview available below.</div>: null}</div>
<div className="mt-4 flex gap-2"><button onClick={downloadCV} className="px-3 py-2 bg-indigo-600 text-white rounded">Download CV</button><button onClick={()=>alert('Uploaded to candidate profile (simulated)')} className="px-3 py-2 border rounded">Upload to Profile</button></div>
</div>
<div className="bg-white p-6 rounded-2xl shadow">
<h3 className="font-semibold">Live Preview</h3>
<div className="mt-4"><div className="font-bold text-lg">{form.name || 'Full Name'}</div><div className="text-sm text-slate-600">{form.email} • {form.phone}</div><p className="mt-3 text-slate-700">{form.summary || 'A short professional summary appears here.'}</p><div className="mt-3"><strong>Skills:</strong> {form.skills}</div>{preview? (<div className="mt-4 border rounded p-2">{file.type?.startsWith('image')? <img src={preview} alt="cv" className="max-w-full"/>: <div className="text-sm">Uploaded file: {file.name}</div>}</div>): null}</div>
</div>
</div>
</div>
)
}
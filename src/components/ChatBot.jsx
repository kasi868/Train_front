import React, {useRef, useState} from 'react'


export default function ChatBot(){
const [messages,setMessages] = useState([{from:'bot', text:'Hi — ask me any course or test related question. I will try to answer.'}])
const [text,setText] = useState('')
const inputRef = useRef()


function send(){ if(!text.trim()) return; const userMsg = {from:'user', text: text.trim()}; setMessages(m=>[...m,userMsg]); setText(''); setTimeout(()=>{ const reply = generateReply(userMsg.text); setMessages(m=>[...m,{from:'bot', text:reply}]); inputRef.current?.focus(); },600) }
function generateReply(q){ const low = q.toLowerCase(); if(low.includes('syllabus')) return 'The syllabus covers fundamentals, intermediate topics, and a capstone project across 12 modules.'; if(low.includes('apply')|| low.includes('apply for job')) return 'To apply, go to the job listing and click Apply. You will be asked to take a written test.'; if(low.includes('zoom') || low.includes('interview')) return 'Interviews are scheduled via Zoom links. We will send a calendar invite with a Zoom URL after you clear the coding round.'; return "That's an interesting question — for precise answers we show suggested documentation links and sample videos inside the course page." }


return (
<div className="max-w-3xl mx-auto px-6 py-10">
<h2 className="text-2xl font-bold">Doubt Solving Chatbot</h2>
<div className="mt-6 bg-white rounded-2xl shadow p-4 flex flex-col gap-4">
<div className="max-h-80 overflow-y-auto p-2 space-y-3">{messages.map((m,i)=>(<div key={i} className={`p-3 rounded-lg ${m.from==='bot'? 'bg-slate-100 self-start': 'bg-indigo-600 text-white self-end'}`}>{m.text}</div>))}</div>
<div className="flex gap-2"><input ref={inputRef} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} placeholder="Ask a question..." className="flex-1 border rounded px-3 py-2"/><button onClick={send} className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button></div>
</div>
</div>
)
}
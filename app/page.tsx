'use client';
import {useState} from 'react';
import {Zap, Send, LayoutDashboard, MessageSquare, Mail, Database} from 'lucide-react';

export default function NaveMae() {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState([{t:'08:50', x:'Nave Mãe v1.5: Botões e Chat Ativados. Use agora.'}]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!command) return;
    const n = {t: new Date().toLocaleTimeString(), x: command};
    setLogs([n, ...logs]);
    setCommand('');
    
    try {
      const r = await fetch('/api/orchestrator', {method:'POST', body:JSON.stringify({command:n.x})});
      const d = await r.json();
      setLogs([{t: new Date().toLocaleTimeString(), x: d.message}, n, ...logs]);
    } catch(err) {
      setLogs([{t:'ERR', x:'Sem conexão com o cérebro.'}, ...logs]);
    }
  };

  return (
    <div className='flex h-screen bg-[#09090b] text-white font-sans overflow-hidden'>
      <aside className='w-64 border-r border-zinc-800 p-8 flex flex-col gap-10 bg-black'>
        <div className='text-[#D4AF37] font-black text-3xl italic cursor-pointer'>KAIZEN</div>
        <nav className='flex flex-col gap-6 text-zinc-500'>
          <div className='flex items-center gap-4 text-[#D4AF37]'><LayoutDashboard/> Lousa Central</div>
          <button onClick={() => alert('Abrindo QR Code do WhatsApp...')} className='flex items-center gap-4 hover:text-white transition-colors'><MessageSquare/> WhatsApp</button>
          <button onClick={() => window.location.href='https://kaizen-org.com'} className='flex items-center gap-4 hover:text-white transition-colors'><Mail/> Conectar Gmail</button>
        </nav>
      </aside>
      <main className='flex-1 flex flex-col'>
        <header className='h-24 border-b border-zinc-800 flex items-center justify-between px-10'>
          <h1 className='text-2xl font-bold italic'>NAVE MÃE <span className='text-[#D4AF37]'>v1.5</span></h1>
          <Zap className='text-[#D4AF37] animate-pulse'/>
        </header>
        <section className='flex-1 p-10 overflow-y-auto space-y-4'>
          {logs.map((m, i) => (
            <div key={i} className='p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl'>
              <span className='text-[#D4AF37] text-[10px] font-mono'>{m.t}</span>
              <p className='text-sm mt-1 font-light'>{m.x}</p>
            </div>
          ))}
        </section>
        <form onSubmit={handleSubmit} className='p-10'>
          <input value={command} onChange={(e)=>setCommand(e.target.value)} className='w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-6 px-10 outline-none focus:border-[#D4AF37] text-xl font-light' placeholder='Digite sua ordem...'/>
        </form>
      </main>
    </div>
  );
}

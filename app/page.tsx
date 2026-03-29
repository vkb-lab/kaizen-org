'use client';
import {useState} from 'react';
import {Zap, LayoutDashboard, MessageSquare, Mail} from 'lucide-react';
export default function NaveMae() {
  const [c, setC] = useState('');
  const [l, setL] = useState([{t:'16:00', x:'Nave Mãe v2.1: Client ID Sincronizado com Google Cloud.'}]);
  const h = async (e) {
    e.preventDefault(); if(!c) return;
    const n = {t: new Date().toLocaleTimeString(), x: c};
    setL([n, ...l]); setC('');
    const r = await fetch('/api/orchestrator', {method:'POST', body:JSON.stringify({command:n.x})});
    const d = await r.json();
    setL([{t:new Date().toLocaleTimeString(), x: d.message}, n, ...l]);
  };
  const authGmail = () => {
    const url = "https://accounts.google.com/o/oauth2/v2/auth?client_id=97358151142-1bmvhmdk9pbdlkel6jmn5qgt9f91qq87.apps.googleusercontent.com&redirect_uri=https://nave-mae-kaizen.vercel.app/api/auth/callback&response_type=code&scope=https://www.googleapis.com/auth/gmail.modify&access_type=offline&prompt=consent";
    window.open(url, '_blank');
  };
  return (
    <div className='flex h-screen bg-black text-white font-sans overflow-hidden'>
      <aside className='w-64 border-r border-zinc-800 p-8 flex flex-col gap-10 bg-black'>
        <div className='text-[#D4AF37] font-black text-3xl italic'>KAIZEN</div>
        <nav className='flex flex-col gap-6 text-zinc-500'>
          <div className='text-[#D4AF37] flex items-center gap-4'><LayoutDashboard size=20/> LOUSA</div>
          <div onClick={authGmail} className='flex items-center gap-4 cursor-pointer hover:text-[#D4AF37] transition-all'><Mail size=20/> CONECTAR GMAIL</div>
        </nav>
      </aside>
      <main className='flex-1 flex flex-col'>
        <header className='h-24 border-b border-zinc-800 flex items-center justify-between px-10'>
          <h1 className='text-xl font-bold uppercase italic'>NAVE MÃE <span className='text-[#D4AF37]'>v2.1</span></h1>
          <Zap className='text-[#D4AF37] animate-pulse' size=24 />
        </header>
        <section className='flex-1 p-10 overflow-y-auto space-y-4'>
          {l.map((m, i) => (
            <div key={i} className='p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl animate-in fade-in'>
              <span className='text-[#D4AF37] text-[10px] font-mono'>{m.t}</span>
              <p className='text-sm mt-1'>{m.x}</p>
            </div>
          ))};
        </section>
        <form onSubmit={h} className='p-10 border-t border-zinc-800'>
          <input value={c} onChange={(e)=>setC(e.target.value)} className='w-full bg-zinc-900 border border-zinc-800 rounded-3xl py-7 px-10 outline-none focus:border-[#D4AF37] text-xl font-light' placeholder='Dê a ordem real...' />
        </form>
      </main>
    </div>
  );
}

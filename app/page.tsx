'use client';
import {useState} from 'react';
import {Zap, Send, LayoutDashboard, MessageSquare, Mail} from 'lucide-react';

export default function NaveMae() {
  const [c, setC] = useState('');
  const [l, setL] = useState([{t:'14:50', x:'Nave Mãe v1.9: Identidade Rogger Consolidada. Sistema em Operação Real.'}]);

  const h = async (e: any) => {
    e.preventDefault();
    if(!c) return;
    const n = {t: new Date().toLocaleTimeString(), x: c};
    setL([n, ...l]);
    setC('');
    const r = await fetch('/api/orchestrator', {method:'POST', body:JSON.stringify({command:n.x})});
    const d = await r.json();
    setL([{t:new Date().toLocaleTimeString(), x: d.message}, n, ...l]);
  };

  return (
    <div className='flex h-screen bg-[#09090b] text-white font-sans overflow-hidden'>
      <aside className='w-64 border-r border-zinc-800 p-8 flex flex-col gap-10 bg-black'>
        <div className='text-[#D4AF37] font-black text-3xl italic tracking-tighter'>KAIZEN</div>
        <nav className='flex flex-col gap-6 text-zinc-500 text-sm'>
          <div className='flex items-center gap-4 text-[#D4AF37]'><LayoutDashboard size={20}/> LOUSA CENTRAL</div>
          <div onClick={() => alert('WhatsApp Motor Local Online e Ouvindo')} className='flex items-center gap-4 cursor-pointer hover:text-white transition-all'><MessageSquare size={20}/> WHATSAPP</div>
          <div onClick={() => window.location.href='https://accounts.google.com/o/oauth2/v2/auth?client_id=575371271615-buoyant-song-491421-v6.apps.googleusercontent.com&redirect_uri=https://kaizen-org.com/auth/callback&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly'} className='flex items-center gap-4 cursor-pointer hover:text-[#D4AF37] transition-all'><Mail size={20}/> CONECTAR GMAIL</div>
        </nav>
      </aside>
      <main className='flex-1 flex flex-col'>
        <header className='h-24 border-b border-zinc-800 flex items-center justify-between px-10'>
          <h1 className='text-2xl font-bold uppercase italic tracking-tighter'>Nave Mãe <span className='text-[#D4AF37]'>v1.9</span></h1>
          <Zap className='text-[#D4AF37] animate-pulse' size={30} />
        </header>
        <section className='flex-1 p-10 overflow-y-auto space-y-4'>
          {l.map((m, i) => (
            <div key={i} className='p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl'>
              <span className='text-[#D4AF37] text-[10px] font-mono'>{m.t}</span>
              <p className='text-sm mt-1 font-light leading-relaxed'>{m.x}</p>
            </div>
          ))}
        </section>
        <form onSubmit={h} className='p-10 border-t border-zinc-800'>
          <input value={c} onChange={(e:any)=>setC(e.target.value)} className='w-full bg-zinc-900 border border-zinc-800 rounded-3xl py-7 px-10 outline-none focus:border-[#D4AF37] text-xl font-light' placeholder='Comande a Nave Mãe...' />
        </form>
      </main>
    </div>
  );
}

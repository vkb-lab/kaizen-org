'use client';
import React, { useState } from 'react';
import { Zap, Send, LayoutDashboard, MessageSquare, Mail, Database, Loader2 } from 'lucide-react';

export default function NaveMae() {
  const [c, setC] = useState('');
  const [loading, setLoading] = useState(false);
  const [l, setL] = useState([{t:'09:15', x:'Nave Mãe v1.8: Versão 14.2.15 Estável Ativada.'}]);

  const h = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!c) return;
    setLoading(true);
    const n = {t: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), x: c};
    setL([n, ...l]);
    setC('');

    try {
      const r = await fetch('/api/orchestrator', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({command: n.x})
      });
      const d = await r.json();
      setL([{t: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), x: d.message}, n, ...l]);
    } catch(err) {
      setL([{t:'ERR', x:'Erro na ponte de comando.'}, ...l]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-screen bg-[#09090b] text-white font-sans overflow-hidden'>
      <aside className='w-64 border-r border-zinc-800 p-8 flex flex-col gap-10 bg-black'>
        <div className='text-[#D4AF37] font-black text-3xl italic tracking-tighter'>KAIZEN</div>
        <nav className='flex flex-col gap-6 text-zinc-500 text-sm'>
          <div className='flex items-center gap-4 text-[#D4AF37]'><LayoutDashboard size={20}/> LOUSA CENTRAL</div>
          <div onClick={() => alert('WhatsApp QR em processamento...')} className='flex items-center gap-4 cursor-pointer hover:text-white transition-all'><MessageSquare size={20}/> WHATSAPP</div>
          <div className='flex items-center gap-4 opacity-30'><Mail size={20}/> GMAIL (LOCK)</div>
        </nav>
      </aside>
      <main className='flex-1 flex flex-col'>
        <header className='h-24 border-b border-zinc-800 flex items-center justify-between px-10'>
          <h1 className='text-2xl font-bold uppercase italic tracking-tighter'>Nave Mãe <span className='text-[#D4AF37]'>v1.8</span></h1>
          <Zap className={`text-[#D4AF37] ${loading ? 'animate-spin' : 'animate-pulse'}`} size={30} />
        </header>
        <section className='flex-1 p-10 overflow-y-auto space-y-4 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black'>
          {l.map((m, i) => (
            <div key={i} className='p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl backdrop-blur-sm'>
              <span className='text-[#D4AF37] text-[10px] font-mono'>{m.t}</span>
              <p className='text-sm mt-1 font-light leading-relaxed'>{m.x}</p>
            </div>
          ))}
        </section>
        <form onSubmit={h} className='p-10 border-t border-zinc-800 bg-black/60 backdrop-blur-xl'>
          <div className='max-w-5xl mx-auto relative'>
            <input
              value={c}
              onChange={(e) => setC(e.target.value)}
              disabled={loading}
              className='w-full bg-zinc-900/80 border border-zinc-800 rounded-3xl py-7 px-10 outline-none focus:border-[#D4AF37]/50 text-xl font-light transition-all disabled:opacity-50'
              placeholder={loading ? 'Orquestrador processando...' : 'Comande o seu ecossistema...'}
            />
            {loading && <Loader2 className='absolute right-8 top-8 animate-spin text-[#D4AF37]' />}
          </div>
        </form>
      </main>
    </div>
  );
}
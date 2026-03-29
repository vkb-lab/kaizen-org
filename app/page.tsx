'use client';
import {useState} from 'react';
import {Zap, Send, LayoutDashboard} from 'lucide-react';

export default function NaveMae() {
  const [c, setC] = useState('');
  const [l, setL] = useState([{t:'22:15', x:'Sistema Blindado. Build Forçado Ativo.'}]);

  const h = async (e: any) => {
    e.preventDefault();
    if(!c) return;
    const n = {t: new Date().toLocaleTimeString(), x: c};
    setL([n, ...l]);
    setC('');
    try {
      const r = await fetch('/api/orchestrator', {method:'POST', body:JSON.stringify({command:c})});
      const d = await r.json();
      setL([{t:new Date().toLocaleTimeString(), x:d.message}, n, ...l]);
    } catch(err) {
      setL([{t:'ERR', x:'Erro de conexão com o cérebro.'}, ...l]);
    }
  };

  return (
    <div className='flex h-screen bg-black text-white font-sans overflow-hidden'>
      <aside className='w-64 border-r border-zinc-800 p-8 flex flex-col gap-10'>
        <div className='text-[#D4AF37] font-black text-3xl italic tracking-tighter'>KAIZEN</div>
        <div className='text-[#D4AF37] flex items-center gap-3 text-sm'><LayoutDashboard size={18}/> LOUSA CENTRAL</div>
      </aside>
      <main className='flex-1 flex flex-col'>
        <header className='h-24 border-b border-zinc-800 flex items-center justify-between px-10'>
          <h1 className='text-xl font-bold uppercase tracking-tighter italic'>NAVE MÃE <span className='text-[#D4AF37]'>v1.3</span></h1>
          <Zap className='text-[#D4AF37] animate-pulse' />
        </header>
        <section className='flex-1 p-10 overflow-y-auto space-y-4'>
          {l.map((m, i) => (
            <div key={i} className='p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl animate-in fade-in slide-in-from-bottom-2'>
              <span className='text-[#D4AF37] text-[10px] font-mono'>{m.t}</span>
              <p className='text-sm mt-1 font-light'>{m.x}</p>
            </div>
          ))}
        </section>
        <form onSubmit={h} className='p-10 bg-black/50 backdrop-blur-md'>
          <input 
            value={c} 
            onChange={(e) => setC(e.target.value)}
            className='w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-6 px-10 outline-none focus:border-[#D4AF37] text-xl font-light'
            placeholder='Envie sua ordem...'
          />
        </form>
      </main>
    </div>
  );
}

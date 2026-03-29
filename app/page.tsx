'use client';
import {useState, useEffect} from 'react';
import {Zap, Send, LayoutDashboard, MessageSquare, Activity, Settings, Mail, Database, QrCode, X} from 'lucide-react';

export default function NaveMae() {
  const [view, setView] = useState('dashboard');
  const [command, setCommand] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState([{t:'08:30', x:'Nave Mãe v1.3: Sistema Nervoso Ativo. Aguardando comandos.'}]);

  const h = async (e: any) => {
    e.preventDefault();
    if(!command) return;
    const n = {t: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), x: command};
    setLogs([n, ...logs]);
    setCommand('');
    
    // CHAMADA AO CÉREBRO REAL
    const r = await fetch('/api/orchestrator', {method:'POST', body:JSON.stringify({command})});
    const d = await r.json();
    setLogs([{t: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), x: d.message}, n, ...logs]);
  };

  const connectGmail = () => {
    // URL de OAuth baseada no seu Bloco Kaizen
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=575371271615-buoyant-song-491421-v6.apps.googleusercontent.com&redirect_uri=https://kaizen-org.com/auth/callback&response_type=code&scope=https://www.googleapis.com/auth/gmail.modify";
  };

  return (
    <div className='flex h-screen bg-[#09090b] text-white font-sans overflow-hidden'>
      {/* SIDEBAR INTERATIVA */}
      <aside className='w-20 md:w-64 border-r border-zinc-800 p-8 flex flex-col gap-10 bg-black'>
        <div className='text-[#D4AF37] font-black text-3xl italic cursor-pointer' onClick={() => setView('dashboard')}>KAIZEN</div>
        <nav className='flex flex-col gap-6'>
          <button onClick={() => setView('dashboard')} className={`flex items-center gap-4 transition-all ${view==='dashboard'?'text-[#D4AF37]':'text-zinc-500 hover:text-white'}`}>
            <LayoutDashboard size={24}/> <span className='hidden md:block'>Lousa Central</span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className='flex items-center gap-4 text-zinc-500 hover:text-[#D4AF37] transition-all'>
            <MessageSquare size={24}/> <span className='hidden md:block'>WhatsApp</span>
          </button>
          <button className='flex items-center gap-4 text-zinc-500 hover:text-white opacity-30 cursor-not-allowed'>
            <Settings size={24}/> <span className='hidden md:block'>Configurações</span>
          </button>
        </nav>
      </aside>

      {/* PAINEL PRINCIPAL */}
      <main className='flex-1 flex flex-col relative'>
        <header className='h-24 border-b border-zinc-800 flex items-center justify-between px-10 bg-black/50 backdrop-blur-md'>
          <h1 className='text-xl font-bold uppercase italic tracking-tighter'>NAVE MÃE <span className='text-[#D4AF37]'>v1.4</span></h1>
          <Zap className='text-[#D4AF37] animate-pulse cursor-pointer' onClick={() => setLogs([{t:'SYS', x:'Reiniciando protocolos de orquestração...'}, ...logs])} />
        </header>

        <section className='flex-1 p-10 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-10'>
          {/* TIMELINE OPERACIONAL */}
          <div className='md:col-span-8 bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 space-y-4'>
            <h2 className='text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4'>Timeline Operacional</h2>
            {logs.map((m, i) => (
              <div key={i} className='p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl animate-in fade-in slide-in-from-bottom-2'>
                <span className='text-[#D4AF37] text-[10px] font-mono'>{m.t}</span>
                <p className='text-sm mt-1 font-light'>{m.x}</p>
              </div>
            ))}
          </div>

          {/* SALA DE MÁQUINAS ATIVA */}
          <div className='md:col-span-4 space-y-6'>
             <h2 className='text-[10px] font-black text-zinc-500 uppercase tracking-widest'>Sala de Máquinas</h2>
             <button onClick={connectGmail} className='w-full p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex justify-between items-center hover:border-[#D4AF37]/50 transition-all group'>
                <div className='flex items-center gap-4'><Mail className='text-zinc-500 group-hover:text-[#D4AF37]'/> <span className='text-xs'>Conectar Gmail</span></div>
                <span className='text-[9px] text-[#D4AF37] font-bold uppercase'>Action Required</span>
             </button>
             <button onClick={() => setIsModalOpen(true)} className='w-full p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex justify-between items-center hover:bg-[#D4AF37]/5 transition-all'>
                <div className='flex items-center gap-4'><MessageSquare className='text-[#D4AF37]'/> <span className='text-xs'>WhatsApp QR</span></div>
                <span className='text-[9px] text-green-500 font-bold uppercase tracking-tighter'>Ready</span>
             </button>
             <div className='p-6 bg-zinc-900/50 border border-green-500/20 rounded-2xl flex justify-between items-center opacity-50'>
                <div className='flex items-center gap-4'><Database className='text-green-500'/> <span className='text-xs'>Supabase Storage</span></div>
                <span className='text-[9px] text-green-500 font-bold uppercase'>Online</span>
             </div>
          </div>
        </section>

        {/* INPUT DE COMANDO */}
        <footer className='p-10'>
          <form onSubmit={h} className='max-w-5xl mx-auto flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-8 focus-within:border-[#D4AF37] transition-all'>
            <input 
              value={command} 
              onChange={(e) => setCommand(e.target.value)}
              className='flex-1 bg-transparent py-6 outline-none text-xl font-light'
              placeholder='Envie sua ordem real...'
            />
            <button type='submit' className='text-[#D4AF37] hover:scale-110 transition-transform'><Send/></button>
          </form>
        </footer>

        {/* MODAL DE WHATSAPP QR */}
        {isModalOpen && (
          <div className='absolute inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 animate-in fade-in zoom-in-95'>
            <div className='bg-zinc-900 border border-zinc-800 p-12 rounded-[40px] flex flex-col items-center gap-8 relative max-w-sm'>
              <button onClick={() => setIsModalOpen(false)} className='absolute top-6 right-6 text-zinc-500 hover:text-white'><X/></button>
              <div className='text-[#D4AF37] font-black uppercase tracking-widest'>Autenticação WhatsApp</div>
              <div className='bg-white p-4 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.2)]'>
                <QrCode size={200} className='text-black' />
              </div>
              <p className='text-[10px] text-zinc-500 text-center uppercase tracking-widest'>Escaneie para ativar a extensão de agente 24/7</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

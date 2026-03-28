'use client';
import React from 'react';
import { LayoutDashboard, MessageSquare, Activity, Settings, Zap, Mail, Database } from 'lucide-react';

export default function NaveMae() {
  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      <aside className="w-20 md:w-64 border-r border-zinc-800/50 flex flex-col items-center py-8 gap-10 bg-black">
        <div className="text-[#D4AF37] font-black text-3xl tracking-tighter italic">KAIZEN</div>
        <nav className="flex flex-col gap-8 text-zinc-500">
          <div className="p-3 bg-zinc-900 rounded-xl text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"><LayoutDashboard /></div>
          <div className="p-3"><MessageSquare /></div>
          <div className="p-3"><Activity /></div>
          <div className="p-3"><Settings /></div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-zinc-800/50 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold italic tracking-tighter uppercase text-white">Nave Mãe <span className="text-[#D4AF37]">v1.0</span></h1>
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold tracking-widest">Operador: Rogger | Identidade Ativa</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
            <Zap className="text-[#D4AF37] w-5 h-5 animate-pulse" />
          </div>
        </header>

        <section className="flex-1 p-10 grid grid-cols-1 md:grid-cols-12 gap-10 overflow-y-auto">
          <div className="md:col-span-8 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-8 min-h-[450px]">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Timeline Operacional</h2>
            <div className="flex gap-6 p-5 bg-zinc-800/20 rounded-2xl border border-zinc-700/30">
              <span className="text-[#D4AF37] font-mono text-xs">20:43</span>
              <p className="text-sm text-zinc-300">
                <strong className="text-white">Sistema:</strong> Reconstrução Total Concluída. Estrutura industrial limpa e funcional. Aguardando ativação dos conectores.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Módulos Ativos</h2>
            <div className="p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-4"><Mail className="text-zinc-500" /> <span className="text-xs">Gmail</span></div>
                <span className="text-[9px] text-zinc-600 font-bold uppercase">Aguardando</span>
            </div>
            <div className="p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-4"><MessageSquare className="text-[#D4AF37]" /> <span className="text-xs">WhatsApp</span></div>
                <span className="text-[9px] text-[#D4AF37] font-bold uppercase">Pronto</span>
            </div>
            <div className="p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex justify-between items-center border-green-500/20">
                <div className="flex items-center gap-4"><Database className="text-green-500" /> <span className="text-xs">Supabase</span></div>
                <span className="text-[9px] text-green-500 font-bold uppercase">Online</span>
            </div>
          </div>
        </section>

        <footer className="p-10">
          <div className="max-w-5xl mx-auto">
            <input 
              type="text" 
              placeholder="Comande o orquestrador..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl py-7 px-10 focus:outline-none focus:border-[#D4AF37]/50 text-xl font-light"
            />
          </div>
        </footer>
      </main>
    </div>
  );
}
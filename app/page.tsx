'use client';
import React from 'react';
import { LayoutDashboard, MessageSquare, Activity, Settings, Zap, Database } from 'lucide-react';

export default function NaveMae() {
  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      <aside className="w-20 md:w-64 border-r border-zinc-800/50 flex flex-col items-center py-8 gap-10 bg-black">
        <div className="text-[#D4AF37] font-black text-3xl tracking-tighter italic">KAIZEN</div>
        <nav className="flex flex-col gap-8 text-zinc-500">
          <div className="p-3 bg-zinc-900 rounded-xl text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"><LayoutDashboard /></div>
          <div className="p-3 hover:text-zinc-100 transition-colors"><MessageSquare /></div>
          <div className="p-3 hover:text-zinc-100 transition-colors"><Activity /></div>
          <div className="p-3 hover:text-zinc-100 transition-colors"><Settings /></div>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-zinc-800/50 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold italic tracking-tighter uppercase text-white">Nave Mãe <span className="text-[#D4AF37]">v1.0</span></h1>
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold tracking-widest">Operador: Rogger | Status: Sistema Reconstruído</p>
          </div>
          <Zap className="text-[#D4AF37] w-6 h-6 animate-pulse" />
        </header>
        <section className="flex-1 p-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-8">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Timeline Operacional</h2>
            <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-700/30">
              <p className="text-sm">Aguardando Deploy Final com TypeScript Engine...</p>
            </div>
          </div>
          <div className="md:col-span-4 space-y-4">
            <div className="p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3"><Database className="text-green-500 w-4 h-4" /> <span className="text-xs">Supabase</span></div>
              <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Online</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
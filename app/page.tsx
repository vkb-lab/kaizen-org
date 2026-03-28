'use client';
import React from 'react';
import { LayoutDashboard, MessageSquare, Activity, Settings, Mail, Database, Instagram, Zap } from 'lucide-react';

export default function NaveMae() {
  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar - Visual Premium Rogger */}
      <aside className="w-20 md:w-64 border-r border-zinc-800/50 flex flex-col items-center py-8 gap-10 bg-black">
        <div className="text-[#D4AF37] font-black text-3xl tracking-tighter italic">KAIZEN</div>
        <nav className="flex flex-col gap-8 text-zinc-500">
          <div className="p-3 bg-zinc-900 rounded-xl text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"><LayoutDashboard /></div>
          <div className="p-3 hover:text-zinc-300 transition-colors"><MessageSquare /></div>
          <div className="p-3 hover:text-zinc-300 transition-colors"><Activity /></div>
          <div className="p-3 hover:text-zinc-300 transition-colors"><Settings /></div>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-zinc-800/50 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold italic tracking-tighter uppercase text-white">Nave Mãe <span className="text-[#D4AF37]">v1.0</span></h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">Operador: Rogger</span>
              <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">Identidade Ativa</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Cérebro Híbrido</span>
                <span className="text-xs text-white font-mono">OpenAI + Gemini</span>
             </div>
             <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <Zap className="text-[#D4AF37] w-5 h-5 fill-[#D4AF37]" />
             </div>
          </div>
        </header>

        <section className="flex-1 p-10 grid grid-cols-1 md:grid-cols-12 gap-10 overflow-y-auto">
          {/* Timeline de Execução */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-8 min-h-[450px] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]/50"></div>
              <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Timeline Operacional</h2>
              
              <div className="space-y-6">
                <div className="flex gap-6 p-5 bg-zinc-800/20 rounded-2xl border border-zinc-700/30">
                  <span className="text-[#D4AF37] font-mono text-xs mt-1">14:55</span>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    <strong className="text-white">Sistema:</strong> Memória Rogger (2024-2026) carregada com sucesso. Orquestrador aguardando deploy final para iniciar varredura de e-mails e marketing <span className="text-[#D4AF37]">Oxypower</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sala de Máquinas (Módulos) */}
          <div className="md:col-span-4 space-y-5">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Módulos de Sistema</h2>
            <ModuleCard icon={<Mail size={18}/>} label="Gmail vkb@kaizen-org.com" status="Aguardando Token" color="text-zinc-500" />
            <ModuleCard icon={<MessageSquare size={18}/>} label="WhatsApp QR" status="Pronto para Scan" color="text-[#D4AF37]" />
            <ModuleCard icon={<Instagram size={18}/>} label="Social Oxypower" status="Standby" color="text-zinc-500" />
            <ModuleCard icon={<Database size={18}/>} label="Supabase Kaizen15315" status="Online" color="text-green-500" active />
          </div>
        </section>

        {/* Input de Comando Rogger */}
        <footer className="p-10">
          <div className="max-w-5xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            <input 
              type="text" 
              placeholder="Comande a Nave Mãe..."
              className="relative w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl py-7 px-10 focus:outline-none focus:border-[#D4AF37]/50 transition-all text-xl placeholder:text-zinc-700 text-white font-light"
            />
            <div className="absolute right-8 top-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Aperte Enter</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ModuleCard({ icon, label, status, color, active = false }) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 p-5 rounded-2xl flex items-center justify-between group hover:border-[#D4AF37]/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-zinc-800/50 rounded-xl text-zinc-400 group-hover:text-[#D4AF37] transition-colors">{icon}</div>
        <div>
          <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter">{label}</h3>
          <p className={`text-[9px] font-black uppercase tracking-widest ${color}`}>{status}</p>
        </div>
      </div>
      {active && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>}
    </div>
  );
}

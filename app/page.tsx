'use client';
import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, Activity, Settings, Zap, Mail, Database, Send, Loader2 } from 'lucide-react';

export default function NaveMae() {
  const [command, setCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([
    { time: '21:42', text: 'Nave Mãe Tripulada. Cérebro Híbrido em Standby.' }
  ]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command || isLoading) return;
    
    setIsLoading(true);
    const userLog = { time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), text: `Rogger: ${command}` };
    setLogs([userLog, ...logs]);

    try {
      const res = await fetch('/api/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        const systemLog = { time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), text: data.message };
        setLogs([systemLog, userLog, ...logs]);
      }
    } catch (err) {
      setLogs([{ time: 'ERR', text: 'Falha na conexão com o Cérebro.' }, ...logs]);
    } finally {
      setIsLoading(false);
      setCommand('');
    }
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      <aside className="w-20 md:w-64 border-r border-zinc-800/50 flex flex-col items-center py-8 gap-10 bg-black">
        <div className="text-[#D4AF37] font-black text-3xl tracking-tighter italic">KAIZEN</div>
        <nav className="flex flex-col gap-6 text-zinc-500">
          <div className="p-4 bg-zinc-900 text-[#D4AF37] rounded-2xl"><LayoutDashboard /></div>
          <div className="p-4 hover:text-zinc-300"><MessageSquare /></div>
          <div className="p-4 hover:text-zinc-300"><Activity /></div>
          <div className="p-4 hover:text-zinc-300"><Settings /></div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-zinc-800/50 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold italic tracking-tighter uppercase text-white">Nave Mãe <span className="text-[#D4AF37]">v1.0</span></h1>
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Operador: Rogger | Cérebro Híbrido Ativo</p>
          </div>
          <Zap className={`text-[#D4AF37] w-6 h-6 ${isLoading ? 'animate-bounce' : 'animate-pulse'}`} />
        </header>

        <section className="flex-1 p-10 grid grid-cols-1 md:grid-cols-12 gap-10 overflow-hidden">
          <div className="md:col-span-8 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-8 flex flex-col overflow-hidden">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Timeline de Orquestração</h2>
            <div className="flex-1 overflow-y-auto space-y-4 pr-4">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-4 p-4 rounded-xl border ${log.text.startsWith('Rogger') ? 'bg-zinc-800/10 border-zinc-800' : 'bg-[#D4AF37]/5 border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)]'}`}>
                  <span className="text-[#D4AF37] font-mono text-[10px] mt-1">{log.time}</span>
                  <p className="text-sm text-zinc-300 font-light">{log.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Sala de Máquinas</h2>
            <div className="p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex justify-between items-center group cursor-pointer hover:border-[#D4AF37]/30 transition-all">
                <div className="flex items-center gap-4"><Mail className="text-zinc-500 group-hover:text-[#D4AF37]" /> <span className="text-xs">Conectar Gmail</span></div>
                <div className="h-1.5 w-1.5 bg-zinc-700 rounded-full"></div>
            </div>
            <div className="p-5 bg-zinc-900/40 border border-[#D4AF37]/30 rounded-2xl flex justify-between items-center shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                <div className="flex items-center gap-4"><MessageSquare className="text-[#D4AF37]" /> <span className="text-xs text-white">WhatsApp Business</span></div>
                <div className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
            </div>
            <div className="p-5 bg-zinc-900/40 border border-green-500/20 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-4"><Database className="text-green-500" /> <span className="text-xs">Supabase Storage</span></div>
                <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Online</span>
            </div>
          </div>
        </section>

        <footer className="p-10">
          <form onSubmit={handleCommand} className="max-w-5xl mx-auto relative group">
            <input 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              disabled={isLoading}
              type="text" 
              placeholder={isLoading ? "Orquestrador pensando..." : "Comande a Nave Mãe..."}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl py-7 px-10 focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light text-white disabled:opacity-50"
            />
            <button type="submit" disabled={isLoading} className="absolute right-6 top-6 p-2 text-zinc-600 hover:text-[#D4AF37] transition-colors disabled:opacity-0">
              {isLoading ? <Loader2 className="animate-spin" /> : <Send size={24} />}
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}

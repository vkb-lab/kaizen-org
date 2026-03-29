'use client';
import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, Activity, Settings, Zap, Mail, Database, Send, Loader2, QrCode } from 'lucide-react';

export default function NaveMae() {
  const [command, setCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [logs, setLogs] = useState([
    { time: '21:50', text: 'Nave Mãe: Motor 24/7 iniciado. Orquestrador pronto.' }
  ]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command || isLoading) return;
    setIsLoading(true);
    setLogs([{ time: new Date().toLocaleTimeString(), text: `Rogger: ${command}` }, ...logs]);

    try {
      const res = await fetch('/api/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      setLogs([{ time: new Date().toLocaleTimeString(), text: `IA: ${data.message}` }, ...logs]);
    } catch (err) {
      setLogs([{ time: 'ERR', text: 'Falha crítica no Cérebro.' }, ...logs]);
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
          <button onClick={() => setShowQR(false)} className="p-4 bg-zinc-900 text-[#D4AF37] rounded-2xl"><LayoutDashboard /></button>
          <button onClick={() => setShowQR(true)} className="p-4 hover:text-[#D4AF37]"><MessageSquare /></button>
          <div className="p-4 hover:text-zinc-300"><Activity /></div>
          <div className="p-4 hover:text-zinc-300"><Settings /></div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-zinc-800/50 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold italic tracking-tighter uppercase text-white">Nave Mãe <span className="text-[#D4AF37]">v1.0</span></h1>
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Modo Operação Ininterrupta | Rogger</p>
          </div>
          <Zap className={`text-[#D4AF37] w-6 h-6 ${isLoading ? 'animate-spin' : 'animate-pulse'}`} />
        </header>

        <section className="flex-1 p-10 grid grid-cols-1 md:grid-cols-12 gap-10 overflow-hidden">
          <div className="md:col-span-8 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-8 flex flex-col overflow-hidden">
            {showQR ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
                <h2 className="text-[#D4AF37] font-black uppercase tracking-widest">WhatsApp Auth</h2>
                <div className="bg-white p-4 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                  <QrCode size={200} className="text-black" />
                </div>
                <p className="text-xs text-zinc-500">Escaneie para ativar a Extensão de Agente no seu Celular.</p>
                <button onClick={() => setShowQR(false)} className="text-[10px] text-zinc-400 hover:text-white uppercase">Voltar para Lousa</button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Timeline de Orquestração</h2>
                <div className="flex-1 overflow-y-auto space-y-4 pr-4">
                  {logs.map((log, i) => (
                    <div key={i} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
                      <span className="text-[#D4AF37] font-mono text-[10px]">{log.time}</span>
                      <p className="text-sm text-zinc-300 mt-1">{log.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-4 space-y-4">
            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Módulos Ativos</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-2 border-b border-zinc-800"><span className="text-zinc-400">Google Cloud</span> <span className="text-green-500">OK</span></div>
                <div className="flex items-center justify-between text-xs p-2 border-b border-zinc-800"><span className="text-zinc-400">OpenAI GPT-4</span> <span className="text-green-500">OK</span></div>
                <div className="flex items-center justify-between text-xs p-2 border-b border-zinc-800"><span className="text-zinc-400">WhatsApp QR</span> <span className="text-[#D4AF37]">READY</span></div>
              </div>
            </div>
            <div className="p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl">
              <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">Ação Sugerida</h3>
              <p className="text-xs text-zinc-300">"Escaneie o WhatsApp para receber o resumo dos e-mails críticos no seu celular."</p>
            </div>
          </div>
        </section>

        <footer className="p-10">
          <form onSubmit={handleCommand} className="max-w-5xl mx-auto relative group">
            <input 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              disabled={isLoading}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-7 px-10 focus:border-[#D4AF37] text-xl font-light outline-none"
              placeholder="Comande a Nave Mãe..."
            />
            <button type="submit" className="absolute right-8 top-8 text-zinc-600 hover:text-[#D4AF37]">
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}

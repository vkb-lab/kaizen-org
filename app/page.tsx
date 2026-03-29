'use client';
import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, Activity, Settings, Zap, Mail, Database, Send } from 'lucide-react';

export default function NaveMae() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState([
    { time: '21:35', text: 'Sistema Operacional Online. Identidade Rogger Ativa.' },
    { time: '21:40', text: 'Aguardando conexão com WhatsApp e Gmail...' }
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command) return;
    
    // Simulação de Orquestração (Enquanto o backend processa)
    const newLog = { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: `Comando recebido: ${command}` };
    setLogs([newLog, ...logs]);
    setCommand('');
    
    // Aqui o Cérebro (OpenAI) será chamado via API
    console.log("Enviando para o Orquestrador:", command);
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar Funcional */}
      <aside className="w-20 md:w-64 border-r border-zinc-800/50 flex flex-col items-center py-8 gap-10 bg-black">
        <div className="text-[#D4AF37] font-black text-3xl tracking-tighter italic cursor-pointer" onClick={() => window.location.reload()}>KAIZEN</div>
        <nav className="flex flex-col gap-6 text-zinc-500">
          <button onClick={() => setActiveTab('dashboard')} className={`p-4 rounded-2xl transition-all ${activeTab === 'dashboard' ? 'bg-zinc-900 text-[#D4AF37] shadow-lg' : 'hover:text-zinc-300'}`}><LayoutDashboard /></button>
          <button onClick={() => setActiveTab('messages')} className={`p-4 rounded-2xl transition-all ${activeTab === 'messages' ? 'bg-zinc-900 text-[#D4AF37]' : 'hover:text-zinc-300'}`}><MessageSquare /></button>
          <button onClick={() => setActiveTab('status')} className={`p-4 rounded-2xl transition-all ${activeTab === 'status' ? 'bg-zinc-900 text-[#D4AF37]' : 'hover:text-zinc-300'}`}><Activity /></button>
          <button onClick={() => setActiveTab('settings')} className={`p-4 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-zinc-900 text-[#D4AF37]' : 'hover:text-zinc-300'}`}><Settings /></button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-zinc-800/50 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold italic tracking-tighter uppercase text-white">Nave Mãe <span className="text-[#D4AF37]">v1.0</span></h1>
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Operador: Rogger | Modo: {activeTab.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
             <Zap className="text-[#D4AF37] w-6 h-6" />
          </div>
        </header>

        <section className="flex-1 p-10 grid grid-cols-1 md:grid-cols-12 gap-10 overflow-y-auto">
          {/* Timeline Dinâmica */}
          <div className="md:col-span-8 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-8 overflow-hidden flex flex-col">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Timeline Operacional</h2>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4 p-4 bg-zinc-800/20 rounded-xl border border-zinc-700/30 animate-in fade-in slide-in-from-bottom-2">
                  <span className="text-[#D4AF37] font-mono text-xs">{log.time}</span>
                  <p className="text-sm text-zinc-300">{log.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Módulos com Ação de Clique */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Sala de Máquinas</h2>
            <button className="w-full text-left p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex justify-between items-center hover:border-[#D4AF37]/50 transition-all group">
                <div className="flex items-center gap-4"><Mail className="text-zinc-500 group-hover:text-[#D4AF37]" /> <span className="text-xs">Conectar Gmail</span></div>
                <span className="text-[9px] text-zinc-600 font-bold uppercase">Click to Auth</span>
            </button>
            <button onClick={() => alert('Gerando QR Code...')} className="w-full text-left p-5 bg-zinc-900/40 border border-[#D4AF37]/20 rounded-2xl flex justify-between items-center hover:bg-[#D4AF37]/5 transition-all group">
                <div className="flex items-center gap-4"><MessageSquare className="text-[#D4AF37]" /> <span className="text-xs">WhatsApp Business</span></div>
                <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-tighter animate-pulse">Scan Now</span>
            </button>
            <div className="p-5 bg-zinc-900/40 border border-green-500/20 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-4"><Database className="text-green-500" /> <span className="text-xs">Supabase Storage</span></div>
                <span className="text-[9px] text-green-500 font-bold uppercase">Online</span>
            </div>
          </div>
        </section>

        {/* Input de Comando Ativo */}
        <footer className="p-10">
          <form onSubmit={handleCommand} className="max-w-5xl mx-auto relative group">
            <input 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              type="text" 
              placeholder="Digite sua ordem aqui (ex: 'Resumir e-mails de hoje')..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl py-7 px-10 focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light text-white"
            />
            <button type="submit" className="absolute right-6 top-6 p-2 text-zinc-600 hover:text-[#D4AF37] transition-colors">
              <Send size={24} />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}

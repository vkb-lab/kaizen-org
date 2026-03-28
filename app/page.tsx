'use client';
import React from 'react';
import { LayoutDashboard, MessageSquare, Activity, Settings, Zap } from 'lucide-react';

export default function NaveMae() {
  return (
    <div style={{display:'flex', height:'100vh', background:'#09090b', color:'#f4f4f5', fontFamily:'sans-serif'}}>
      <aside style={{width:'260px', borderRight:'1px solid #27272a', padding:'40px', background:'black', display:'flex', flexDirection:'column', gap:'40px'}}>
        <div style={{color:'#D4AF37', fontWeight:'900', fontSize:'24px', fontStyle:'italic'}}>KAIZEN</div>
        <nav style={{display:'flex', flexDirection:'column', gap:'30px', color:'#71717a'}}>
          <LayoutDashboard style={{color:'#D4AF37'}} /> <MessageSquare /> <Activity /> <Settings />
        </nav>
      </aside>
      <main style={{flex:1, display:'flex', flexDirection:'column'}}>
        <header style={{height:'90px', borderBottom:'1px solid #27272a', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 40px'}}>
          <h1 style={{fontSize:'20px', fontWeight:'bold'}}>NAVE MÃE <span style={{color:'#D4AF37'}}>v1.0</span></h1>
          <Zap style={{color:'#D4AF37', animation:'pulse 2s infinite'}} />
        </header>
        <div style={{padding:'40px', flex:1}}>
          <div style={{background:'rgba(24,24,27,0.5)', border:'1px solid #27272a', borderRadius:'24px', padding:'30px', minHeight:'400px'}}>
            <h2 style={{fontSize:'10px', color:'#52525b', textTransform:'uppercase', letterSpacing:'2px'}}>Timeline Operacional</h2>
            <p style={{marginTop:'20px', fontSize:'14px'}}>Operador Rogger: Sistema reconstruído com sucesso pelo Agente Remoto.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
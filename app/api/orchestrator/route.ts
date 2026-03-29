
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { command } = await req.json();
    const openaiKey = process.env.OPENAI_API_KEY;
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!openaiKey) return NextResponse.json({ status: 'success', message: 'Cérebro em modo offline. Chave OpenAI ausente na Vercel.' });

    const openai = new OpenAI({ apiKey: openaiKey });
    const supabase = (sbUrl && sbKey) ? createClient(sbUrl, sbKey) : null;

    // 1. O ORQUESTRADOR CONSULTA A IDENTIDADE ROGGER
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "Você é o Orquestrador da Nave Mãe do Rogger (vkb-lab). Tom brutal, prático e focado em execução de sistemas. Seus projetos principais: Hupmix, Oxypower e VKB. Use a memória de 2024-2026." },
        { role: "user", content: command }
      ],
    });

    const aiMessage = completion.choices[0].message.content;

    // 2. SALVA NA MEMÓRIA DO SUPABASE (A CONVERSA TRAVADA)
    if (supabase) {
      await supabase.from('operational_logs').insert([
        { content: `Rogger: ${command}`, metadata: { type: 'user_command' } },
        { content: `AI: ${aiMessage}`, metadata: { type: 'ai_response' } }
      ]);
    }

    return NextResponse.json({ status: 'success', message: aiMessage });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: 'Falha crítica: ' + error.message }, { status: 500 });
  }
}

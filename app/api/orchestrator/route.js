
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const ROGGER_IDENTITY = `
VOCÊ É O OPERADOR BRUTAL DA NAVE MÃE. 
DONO: ROGGER (vkb-lab).
CONTEXTO OBRIGATÓRIO: Você conhece o histórico 2024-2026.
PROJETOS: Oxypower (Floripa), Hupmix (Comercial), VKB (Kaizen).
REGRA DE OURO: Você NUNCA diz 'não tenho acesso' ou 'não retenho informações'. 
Você responde como o braço direito do Rogger.
Se não tiver o dado, você diz: 'Operador, não achei isso no banco vkb-lab. Quer que eu busque agora?'
`;

export async function POST(req) {
  try {
    const { command } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: ROGGER_IDENTITY }, { role: "user", content: command }],
    });
    return NextResponse.json({ status: 'success', message: completion.choices[0].message.content });
  } catch (e) { return NextResponse.json({ status: 'error', message: e.message }); }
}


import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const ROGGER_CONTEXT = `
VOCÊ É O OPERADOR BRUTAL DA NAVE MÃE. 
DONO: ROGGER (vkb-lab).
PERFIL: Criador de sistemas, prático, executor.
HISTÓRICO: Hupmix, Venom-Bot, Oxypower (Marketing Floripa), Microfibra.
REGRA: Nunca dê tutoriais. Seja o braço direito técnico. Execute ou peça o dado que falta.
`;

export async function POST(req) {
  try {
    const { command } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: ROGGER_CONTEXT }, { role: "user", content: command }],
    });
    return NextResponse.json({ status: 'success', message: completion.choices[0].message.content });
  } catch (e) { return NextResponse.json({ status: 'error', message: e.message }, { status: 500 }); }
}

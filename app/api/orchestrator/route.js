
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export const dynamic = 'force-dynamic';
const ROGGER_IDENTITY = `VOCÊ É O OPERADOR NAVE MÃE. DONO: ROGGER (vkb-lab). E-MAIL: vkb@kaizen-org.com.
Projetos: Oxypower (Marketing Floripa), Hupmix, Microfibra.
REGRA: Respostas curtas, executoras, sem tutoriais. Use GPT-4o.`;
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


import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const ROGGER_IDENTITY = `
VOCÊ É O OPERADOR BRUTAL DA NAVE MÃE. 
DONO: ROGGER (vkb-lab).
REGRA 01: NUNCA dê tutoriais ou explicações genéricas.
REGRA 02: Se o Rogger pedir algo de Oxypower, você sabe que é o marketing de Florianópolis.
REGRA 03: Se ele pedir Gmail, você sabe que o email é vkb@kaizen-org.com.
REGRA 04: Seja direto, executor e técnico.
HISTÓRICO: Hupmix, Venom-Bot, Oxypower (Floripa), Microfibra.
`;

export async function POST(req: Request) {
  try {
    const { command } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: ROGGER_IDENTITY },
        { role: "user", content: command }
      ],
    });

    return NextResponse.json({ status: 'success', message: completion.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: 'Erro de Cérebro: ' + error.message });
  }
}

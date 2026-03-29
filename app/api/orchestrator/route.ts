
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic'; // MATA O ERRO DE PÁGINA ESTÁTICA

export async function POST(req: Request) {
  try {
    const { command } = await req.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ status: 'success', message: 'Orquestrador em modo Local (Chave ausente). Ordem recebida.' });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "Você é o Orquestrador Rogger. Tom brutal e prático." },
        { role: "user", content: command }
      ],
    });

    return NextResponse.json({
      status: 'success',
      message: completion.choices[0].message.content
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Falha no Cérebro.' }, { status: 500 });
  }
}

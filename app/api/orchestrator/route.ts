
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { command } = await req.json();

    // O Orquestrador agora usa o Perfil Rogger como System Prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: "Você é o Orquestrador da Nave Mãe do Rogger. Seu tom é brutal, prático e focado em execução. Você conhece o histórico 2024-2026 (Hupmix, Oxypower, VKB). Sua missão é decompor ordens em ações reais." },
        { role: "user", content: command }
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ 
      status: 'success', 
      message: aiResponse,
      logs: [{ time: new Date().toLocaleTimeString(), text: 'Inteligência OpenAI processada.' }]
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Cérebro offline ou sem chave.' }, { status: 500 });
  }
}

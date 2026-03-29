
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  try {
    const { command } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "Você é o Orquestrador Brutal Rogger. Executor nato." }, { role: "user", content: command }],
    });
    return NextResponse.json({ status: 'success', message: completion.choices[0].message.content });
  } catch (e: any) { return NextResponse.json({ status: 'error', message: e.message }, { status: 500 }); }
}

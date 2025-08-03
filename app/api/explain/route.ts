import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { formula } = await request.json()

    if (!formula) {
      return NextResponse.json(
        { error: 'Please provide a formula to explain' },
        { status: 400 }
      )
    }

    const prompt = `You are a Notion formula expert. Explain this Notion formula in simple, plain English.

Formula: ${formula}

Provide a clear explanation of what this formula does. Keep it beginner-friendly and focus on the practical purpose.

Explain this formula:`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 200
    })

    const explanation = completion.choices[0].message.content?.trim() || ''
    
    return NextResponse.json({
      explanation,
      breakdown: 'This formula combines multiple functions to give you the result you need.'
    })

  } catch (error) {
    console.error('Explanation error:', error)
    return NextResponse.json(
      { error: 'Failed to explain formula' },
      { status: 500 }
    )
  }
}
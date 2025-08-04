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

    const prompt = `Explain this Notion formula in 1-2 short sentences. Be very concise and focus only on what it does.

Formula: ${formula}

Rules:
- Maximum 2 sentences
- Use simple words
- Focus on the practical result
- No technical details

Example:
Formula: dateBetween(prop("Start Date"), now(), "days")
Explanation: Calculates how many days have passed since the start date until today.

Explain:`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 50
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
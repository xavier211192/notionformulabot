import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()

    if (!input) {
      return NextResponse.json(
        { error: 'Please provide a description' },
        { status: 400 }
      )
    }

    const prompt = `You are a Notion formula expert. Convert this natural language request into a working Notion formula.

User request: "${input}"

Rules:
1. Return ONLY the formula, no explanation
2. Use proper Notion formula syntax
3. Use realistic property names in quotes like prop("Property Name")
4. Available functions: if(), and(), or(), not(), empty(), length(), contains(), format(), dateAdd(), dateBetween(), now(), prop(), concat(), slice(), replace(), test(), round(), floor(), ceil(), abs(), min(), max(), filter(), map(), sum(), average()

Examples:
Request: "Calculate days between start date and today"
Formula: dateBetween(prop("Start Date"), now(), "days")

Request: "Show High if score over 80, Medium if over 60, Low otherwise"
Formula: if(prop("Score") > 80, "High", if(prop("Score") > 60, "Medium", "Low"))

Generate the formula:`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 200
    })

    const formula = completion.choices[0].message.content?.trim() || ''
    
    return NextResponse.json({
      formula,
      explanation: `This formula helps you ${input.toLowerCase()}.`
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate formula' },
      { status: 500 }
    )
  }
}
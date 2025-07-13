import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would fetch this data from your threat detection system
  const threatData = Array.from({ length: 7 }, (_, i) => ({
    date: `2023-06-${String(i + 1).padStart(2, '0')}`,
    threats: Math.floor(Math.random() * 50),
  }))

  return NextResponse.json(threatData)
}
import { NextResponse } from 'next/server'

let usageCount = 0
const maxFreeUsage = 15

export async function GET() {
  return NextResponse.json({ usageCount, maxFreeUsage })
}

export async function POST() {
  if (usageCount < maxFreeUsage) {
    usageCount++
    return NextResponse.json({ usageCount, maxFreeUsage })
  } else {
    return NextResponse.json({ error: 'Usage limit reached' }, { status: 403 })
  }
}
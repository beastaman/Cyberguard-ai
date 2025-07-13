import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const threats = await prisma.threat.findMany({
      orderBy: { detectedAt: 'desc' },
    })
    return NextResponse.json(threats)
  } catch (error) {
    console.error('Error fetching threats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, severity } = await request.json()
    const newThreat = await prisma.threat.create({
      data: {
        name,
        severity,
        status: 'active',
        detectedAt: new Date(),
      },
    })
    return NextResponse.json(newThreat)
  } catch (error) {
    console.error('Error creating threat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
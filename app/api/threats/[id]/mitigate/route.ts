import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedThreat = await prisma.threat.update({
      where: { id: params.id },
      data: { status: 'mitigated' },
    })
    return NextResponse.json(updatedThreat)
  } catch (error) {
    console.error('Error mitigating threat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
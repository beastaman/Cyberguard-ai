import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const threatTrends = await prisma.threat.groupBy({
      by: ['detectedAt'],
      _count: {
        id: true,
      },
      orderBy: {
        detectedAt: 'asc',
      },
      take: 30, // Last 30 days
    })

    const formattedTrends = threatTrends.map(trend => ({
      date: trend.detectedAt.toISOString().split('T')[0],
      count: trend._count.id,
    }))

    return NextResponse.json(formattedTrends)
  } catch (error) {
    console.error('Error fetching threat trends:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
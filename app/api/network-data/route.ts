import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would fetch this data from a monitoring system
  const networkData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    inbound: Math.floor(Math.random() * 100),
    outbound: Math.floor(Math.random() * 100),
    connections: Math.floor(Math.random() * 1000),
  }))

  return NextResponse.json(networkData)
}
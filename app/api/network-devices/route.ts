import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would fetch this data from a network monitoring system
  const networkDevices = [
    { id: 1, name: 'Main Server', type: 'server', status: 'secure' },
    { id: 2, name: 'Office WiFi', type: 'wifi', status: 'vulnerable' },
    { id: 3, name: 'Backup Server', type: 'server', status: 'secure' },
  ]

  return NextResponse.json(networkDevices)
}
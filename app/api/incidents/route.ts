import { NextResponse } from 'next/server'

let incidents = [
  { id: 1, description: 'Unauthorized access attempt', date: '2023-06-01' },
  { id: 2, description: 'Suspicious file download', date: '2023-06-02' },
]

export async function GET() {
  return NextResponse.json(incidents)
}

export async function PUT(request: Request) {
  const { id } = await request.json()
  incidents = incidents.filter(incident => incident.id !== id)
  return NextResponse.json(incidents)
}
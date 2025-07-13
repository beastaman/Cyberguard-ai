import { NextResponse } from 'next/server'

let preventionMeasures = [
  { id: 1, name: 'Firewall', type: 'firewall', active: true },
  { id: 2, name: 'Encryption', type: 'encryption', active: true },
  { id: 3, name: 'Intrusion Detection', type: 'intrusion', active: false },
]

export async function GET() {
  return NextResponse.json(preventionMeasures)
}

export async function PUT(request: Request) {
  const { id } = await request.json()
  const measure = preventionMeasures.find(m => m.id === id)
  if (measure) {
    measure.active = !measure.active
  }
  return NextResponse.json(preventionMeasures)
}
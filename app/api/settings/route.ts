import { NextResponse } from 'next/server'

let settings = {
  emailNotifications: true,
  twoFactorAuth: false,
  apiKey: 'your-api-key-here',
}

export async function GET() {
  return NextResponse.json(settings)
}

export async function PUT(request: Request) {
  const updates = await request.json()
  settings = { ...settings, ...updates }
  return NextResponse.json(settings)
}
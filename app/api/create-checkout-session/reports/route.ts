import { NextResponse } from 'next/server'

let reports = [
  { id: 1, name: 'Monthly Security Report - May 2023', date: '2023-05-31' },
  { id: 2, name: 'Quarterly Threat Analysis Q2 2023', date: '2023-06-30' },
]

export async function GET() {
  return NextResponse.json(reports)
}

export async function POST() {
  const newReport = {
    id: reports.length + 1,
    name: `Security Report - ${new Date().toISOString().split('T')[0]}`,
    date: new Date().toISOString().split('T')[0],
  }
  reports.push(newReport)
  return NextResponse.json(newReport)
}
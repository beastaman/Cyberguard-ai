"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"

export default function ReportsPage() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    const response = await fetch('/api/reports')
    const data = await response.json()
    setReports(data)
  }

  const generateReport = async () => {
    await fetch('/api/generate-report', { method: 'POST' })
    fetchReports()
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Security Reports</CardTitle>
          <CardDescription className="text-gray-400">
            Generate and view detailed security reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700">
            Generate New Report
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {reports.map((report) => (
              <li key={report.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span>{report.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{report.date}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
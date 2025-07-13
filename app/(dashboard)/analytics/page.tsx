"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function AnalyticsPage() {
  const [threatData, setThreatData] = useState([])
  const [securityEvents, setSecurityEvents] = useState([])

  useEffect(() => {
    fetchThreatData()
    fetchSecurityEvents()
  }, [])

  const fetchThreatData = async () => {
    const response = await fetch('/api/threat-analytics')
    const data = await response.json()
    setThreatData(data)
  }

  const fetchSecurityEvents = async () => {
    const response = await fetch('/api/security-events')
    const data = await response.json()
    setSecurityEvents(data)
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Threat Analytics</CardTitle>
          <CardDescription className="text-gray-400">
            Overview of detected threats over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Bar dataKey="threats" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Security Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {securityEvents.map((event, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {event.type === 'threat' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  {event.type === 'blocked' && <Shield className="h-5 w-5 text-green-500" />}
                  {event.type === 'info' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                  <span>{event.description}</span>
                </div>
                <span className="text-sm text-gray-400">{event.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
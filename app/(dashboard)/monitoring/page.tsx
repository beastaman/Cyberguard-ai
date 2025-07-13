"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type NetworkDatum = {
  time: string
  inbound: number
  outbound: number
  connections: number
}

export default function MonitoringPage() {
  const [networkData, setNetworkData] = useState<NetworkDatum[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/network-data')
      const data = await response.json()
      setNetworkData(data)
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Network Traffic</CardTitle>
          <CardDescription className="text-gray-400">
            Real-time network traffic monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Line type="monotone" dataKey="inbound" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="outbound" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {networkData.slice(-5).map((data, index) => (
              <li key={index} className="flex justify-between">
                <span>{data.time}</span>
                <span>{data.connections} connections</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
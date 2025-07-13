"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Wifi, Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function NetworkSecurityPage() {
  const [networkDevices, setNetworkDevices] = useState([])
  const [securityScore, setSecurityScore] = useState(0)

  useEffect(() => {
    fetchNetworkDevices()
    fetchSecurityScore()
  }, [])

  const fetchNetworkDevices = async () => {
    const response = await fetch('/api/network-devices')
    const data = await response.json()
    setNetworkDevices(data)
  }

  const fetchSecurityScore = async () => {
    const response = await fetch('/api/network-security-score')
    const data = await response.json()
    setSecurityScore(data.score)
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Network Security Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Current status of your network security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-500" />
            <div className="flex-1">
              <div className="text-2xl font-bold">{securityScore}/100</div>
              <Progress value={securityScore} className="mt-2" />
            </div>
          </div>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Run Security Audit</Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Connected Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {networkDevices.map((device) => (
              <li key={device.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {device.type === 'server' && <Server className="h-5 w-5 text-green-500" />}
                  {device.type === 'wifi' && <Wifi className="h-5 w-5 text-blue-500" />}
                  <span>{device.name}</span>
                </div>
                <span className={`text-sm ${device.status === 'secure' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {device.status}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
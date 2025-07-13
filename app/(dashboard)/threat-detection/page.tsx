"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, CheckCircle, Activity, RefreshCw, Cpu, FileText, Globe, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import io from 'socket.io-client'

type Threat = {
  type: string;
  description: string;
  severity?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ThreatDetectionPage() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [threatStats, setThreatStats] = useState<{ name: string; value: number }[]>([])
  const [threatTrend, setThreatTrend] = useState<{ date: string; count: number }[]>([])

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000')
    
    socket.on('scan_progress', (data: { progress: number }) => {
      setScanProgress(data.progress)
    })
  
      // Listen for real-time anomaly detection
      socket.on('anomaly_detected', (anomaly: Threat) => {
        setThreats(prevThreats => [...prevThreats, anomaly])
      })

    fetchThreatTrend()

    return () => {
      socket.disconnect()
    }
  }, [])

  const updateThreatStats = (allThreats: Threat[]) => {
    const stats = allThreats.reduce((acc, threat) => {
      acc[threat.type] = (acc[threat.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    setThreatStats(Object.entries(stats).map(([name, value]) => ({ name, value })))
  }

  const fetchThreatTrend = async () => {
    try {
      const response = await fetch('/api/threat-trends')
      const data = await response.json()
      setThreatTrend(data)
    } catch (error) {
      console.error('Error fetching threat trend:', error)
    }
  }

  const startScan = async () => {
    setIsScanning(true)
    setScanProgress(0)

    // const interval = setInterval(() => {
    //   setScanProgress(prevProgress => {
    //     if (prevProgress >= 100) {
    //       clearInterval(interval)
    //       setIsScanning(false)
    //       return 100
    //     }
    //     return prevProgress + 10
    //   })
    // }, 500)

    try {
        const response = await fetch('/api/local-agent?action=scan');
                // Check if response body exists before reading
        if (!response.body) {
          console.error('Response body is null');
          setIsScanning(false);
          return;
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
    
        let done = false;
        let threatsBuffer: Threat[] = [];
    
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          const chunk = decoder.decode(value, { stream: true });
          // Avoid mapping on empty or invalid chunks
      if (chunk) {
        try {
          const newThreats = chunk.split('\n').filter(Boolean).map((data) => {
            try {
              return JSON.parse(data) as Threat;
            } catch (e) {
              console.error('Error parsing JSON:', e);
              return null;
            }
          }).filter((threat): threat is Threat => threat !== null); // Filter out null values

          threatsBuffer = [...threatsBuffer, ...newThreats];
          setThreats((prev) => [...prev, ...newThreats]);
          updateThreatStats(threatsBuffer);
        } catch (e) {
          console.error('Error parsing threats:', e);
        }
      }
    }
  } catch (error) {
    console.error('Error during scan:', error);
  } finally {
    setIsScanning(false);
  }
};
    

  const updateThreatIntel = async () => {
    try {
      await fetch('/api/local-agent?action=update_threat_intel')
      alert('Threat intelligence updated successfully')
    } catch (error) {
      console.error('Error updating threat intelligence:', error)
      alert('Failed to update threat intelligence')
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">AI-Powered Threat Detection</CardTitle>
          <CardDescription className="text-gray-400">
            Scan your system for potential threats using advanced AI techniques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={startScan} disabled={isScanning} className="bg-blue-600 hover:bg-blue-700 mr-4">
            {isScanning ? 'Scanning...' : 'Start Deep Scan'}
          </Button>
          <Button onClick={updateThreatIntel} className="bg-green-600 hover:bg-green-700">
            Update Threat Intelligence
          </Button>
          {isScanning && (
            <Progress value={scanProgress} className="mt-4" />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Threat Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {threatStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Threat Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={threatTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Detected Threats</CardTitle>
        </CardHeader>
        <CardContent>
          {threats.length === 0 ? (
            <p className="text-gray-400">No threats detected</p>
          ) : (
            <ul className="space-y-4">
              {threats.map((threat, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {threat.type === 'process' && <Cpu className="h-5 w-5 text-yellow-500 mr-2" />}
                    {threat.type === 'file' && <FileText className="h-5 w-5 text-red-500 mr-2" />}
                    {threat.type === 'network' && <Globe className="h-5 w-5 text-blue-500 mr-2" />}
                    {threat.type === 'anomaly' && <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />}
                    {threat.type === 'file_change' && <RefreshCw className="h-5 w-5 text-purple-500 mr-2" />}
                    {threat.type === 'user_activity' && <User className="h-5 w-5 text-pink-500 mr-2" />}
                    <span>{threat.description}</span>
                  </div>
                  {threat.severity && (
                    <span className={`text-sm ${
                      threat.severity === 'high' ? 'text-red-500' :
                      threat.severity === 'medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {threat.severity}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
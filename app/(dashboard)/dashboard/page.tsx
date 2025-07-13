"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Zap, Lock, Server, Globe, FileCheck } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DashboardPage() {
  const [threatLevel, setThreatLevel] = useState(20)
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanComplete, setIsScanComplete] = useState(false)
  const [securityScore, setSecurityScore] = useState(0)

  useEffect(() => {
    setSecurityScore(Math.floor(Math.random() * 100))
  }, [])

  const startScan = () => {
    setIsScanComplete(false)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsScanComplete(true)
          setThreatLevel(Math.floor(Math.random() * 100))
          setSecurityScore(Math.floor(Math.random() * 100))
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatLevel}%</div>
            <Progress
              value={threatLevel}
              className={`mt-2${
                threatLevel < 30 ? 'bg-green-500' : threatLevel < 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScore}/100</div>
            <Progress value={securityScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Protections</CardTitle>
            <Lock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-400 mt-1">Firewalls, IDS, Anti-malware, etc.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button onClick={startScan} className="bg-blue-600 hover:bg-blue-700">
              Run Full Scan
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Update Security Policies
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              View Latest Threat Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Threat Map</CardTitle>
            <CardDescription className="text-gray-400">
              Global threat activity in the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-gray-700 rounded">
              <Globe className="h-16 w-16 text-blue-500" />
              <span className="ml-4 text-gray-400">Interactive threat map visualization goes here</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Security Recommendations</CardTitle>
            <CardDescription className="text-gray-400">
              AI-generated advice based on your current security status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Update your firewall rules</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Enable two-factor authentication for all users</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Conduct a phishing awareness training for employees</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Threats</CardTitle>
            <CardDescription className="text-gray-400">
              Last 7 days of detected threats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Suspicious Login Attempt</span>
                <span className="text-yellow-500">Medium</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Potential Data Breach</span>
                <span className="text-red-500">High</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Unusual Network Activity</span>
                <span className="text-yellow-500">Medium</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Compliance Status</CardTitle>
            <CardDescription className="text-gray-400">
              Adherence to security standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>GDPR</span>
                <span className="text-green-500">Compliant</span>
              </li>
              <li className="flex items-center justify-between">
                <span>HIPAA</span>
                <span className="text-yellow-500">In Progress</span>
              </li>
              <li className="flex items-center justify-between">
                <span>PCI DSS</span>
                <span className="text-green-500">Compliant</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
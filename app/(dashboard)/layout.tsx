"use client"

import { useEffect, useState } from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  BarChart, 
  Settings, 
  AlertCircle, 
  FileText, 
  Eye, 
  Lock, 
  Server,
  Activity
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [usageCount, setUsageCount] = useState(0)
  const [maxFreeUsage, setMaxFreeUsage] = useState(15)
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false)

  useEffect(() => {
    fetchUsageCount()
  }, [])

  const fetchUsageCount = async () => {
    const response = await fetch('/api/usage-count')
    const data = await response.json()
    setUsageCount(data.usageCount)
    setMaxFreeUsage(data.maxFreeUsage)
  }

  const handleUsage = async () => {
    const response = await fetch('/api/usage-count', { method: 'POST' })
    const data = await response.json()
    if (response.ok) {
      setUsageCount(data.usageCount)
    } else {
      setShowSubscriptionDialog(true)
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          CyberGuard AI
        </div>
        <nav className="space-y-4 flex-grow">
          <Link href="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Shield className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/threat-detection" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <AlertCircle className="w-5 h-5" />
            <span>Threat Detection</span>
          </Link>
          <Link href="/monitoring" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Eye className="w-5 h-5" />
            <span>Real-time Monitoring</span>
          </Link>
          <Link href="/threat-prevention" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Lock className="w-5 h-5" />
            <span>Threat Prevention</span>
          </Link>
          <Link href="/network-security" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Server className="w-5 h-5" />
            <span>Network Security</span>
          </Link>
          <Link href="/analytics" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <BarChart className="w-5 h-5" />
            <span>Analytics</span>
          </Link>
          <Link href="/reports" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </Link>
          <Link href="/incident-response" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Activity className="w-5 h-5" />
            <span>Incident Response</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="mt-auto">
          <div className="mb-2 text-sm text-gray-400">Free Plan Usage</div>
          <Progress value={(usageCount / maxFreeUsage) * 100} className="w-full" />
          <div className="mt-1 text-xs text-gray-400">{usageCount}/{maxFreeUsage} scans used</div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                  Upgrade Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] bg-gray-800 text-white mx-auto"> {/* Adjusted max width and centered */}
                <DialogHeader className="text-center"> {/* Centered title and description */}
                <DialogTitle>Choose a Plan</DialogTitle>
                <DialogDescription>
                    Select a plan that fits your cybersecurity needs
                </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4"> {/* Three-column grid */}
                <Card className="bg-gray-700">
                    <CardHeader>
                    <CardTitle>Starter Plan</CardTitle>
                    <CardDescription>$99/month</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ul className="list-disc list-inside mb-4 text-sm">
                        <li>Basic AI analysis</li>
                        <li>Support monitoring</li>
                        <li>Email alerts</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe to Starter</Button>
                    </CardContent>
                </Card>

                <Card className="bg-gray-700">
                    <CardHeader>
                    <CardTitle>Pro Plan</CardTitle>
                    <CardDescription>$299/month</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ul className="list-disc list-inside mb-4 text-sm">
                        <li>Advanced AI analysis</li>
                        <li>24/7 monitoring</li>
                        <li>Email alerts</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe to Pro</Button>
                    </CardContent>
                </Card>

                <Card className="bg-gray-700">
                    <CardHeader>
                    <CardTitle>Enterprise Plan</CardTitle>
                    <CardDescription>Custom/month</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ul className="list-disc list-inside mb-4 text-sm">
                        <li>Custom AI model</li>
                        <li>Dedicated support</li>
                        <li>API access</li>
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe to Enterprise</Button>
                    </CardContent>
                </Card>
                </div>
            </DialogContent>
            </Dialog>
            <UserButton />
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}
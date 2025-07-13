"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"


type PreventionMeasure = {
  id: string | number
  name: string
  type: 'firewall' | 'encryption' | 'intrusion'
  active: boolean
}

export default function PreventionPage() {
  const [preventionMeasures, setPreventionMeasures] = useState<PreventionMeasure[]>([])

  useEffect(() => {
    fetchPreventionMeasures()
  }, [])

  const fetchPreventionMeasures = async () => {
    const response = await fetch('/api/prevention-measures')
    const data = await response.json()
    setPreventionMeasures(data)
  }

  interface ToggleMeasureFn {
    (id: string | number): Promise<void>
  }

  const toggleMeasure: ToggleMeasureFn = async (id) => {
    await fetch(`/api/prevention-measures/${id}`, { method: 'PUT' })
    fetchPreventionMeasures()
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Threat Prevention Measures</CardTitle>
          <CardDescription className="text-gray-400">
            Manage and configure your active threat prevention measures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {preventionMeasures.map((measure) => (
              <li key={measure.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {measure.type === 'firewall' && <Shield className="h-5 w-5 text-blue-500" />}
                  {measure.type === 'encryption' && <Lock className="h-5 w-5 text-green-500" />}
                  {measure.type === 'intrusion' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  <span>{measure.name}</span>
                </div>
                <Switch
                  checked={measure.active}
                  onCheckedChange={() => toggleMeasure(measure.id)}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">AI-Powered Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>Enable Advanced Firewall Rules</span>
            </li>
            <li className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-green-500" />
              <span>Implement End-to-End Encryption</span>
            </li>
            <li className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Set Up Intrusion Detection System</span>
            </li>
          </ul>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Apply Recommendations</Button>
        </CardContent>
      </Card>
    </div>
  )
}
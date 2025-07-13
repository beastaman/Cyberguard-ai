"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

type Incident = {
  id: string | number
  description: string
  date: string
}

export default function IncidentResponsePage() {
  const [incidents, setIncidents] = useState<Incident[]>([])

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    const response = await fetch('/api/incidents')
    const data = await response.json()
    setIncidents(data)
  }

  interface ResolveIncidentResponse {
    success: boolean
    message?: string
  }

  const resolveIncident = async (id: string | number): Promise<void> => {
    await fetch(`/api/incidents/${id}/resolve`, { method: 'PUT' })
    fetchIncidents()
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Incidents</CardTitle>
          <CardDescription className="text-gray-400">
            Manage and respond to ongoing security incidents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {incidents.length === 0 ? (
            <p className="text-gray-400">No active incidents</p>
          ) : (
            <ul className="space-y-4">
              {incidents.map((incident) => (
                <li key={incident.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span>{incident.description}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{incident.date}</span>
                    <Button
                      onClick={() => resolveIncident(incident.id)}
                      variant="outline"
                      size="sm"
                    >
                      Resolve
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Incident Response Playbooks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Data Breach Response</span>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Malware Outbreak Containment</span>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span>DDoS Attack Mitigation</span>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
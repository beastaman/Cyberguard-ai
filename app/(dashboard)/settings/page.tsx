"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    apiKey: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const response = await fetch('/api/settings')
    const data = await response.json()
    setSettings(data)
  }

  interface Settings {
    emailNotifications: boolean;
    twoFactorAuth: boolean;
    apiKey: string;
  }

  type SettingKey = keyof Settings;

  const updateSetting = async (key: SettingKey, value: Settings[SettingKey]) => {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value }),
    })
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
            <Switch
              id="two-factor-auth"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              value={settings.apiKey}
              onChange={(e) => updateSetting('apiKey', e.target.value)}
              type="password"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Regenerate API Key</Button>
        </CardContent>
      </Card>
    </div>
  )
}
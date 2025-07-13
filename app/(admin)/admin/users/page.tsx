'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface User {
  id: string
  name: string
  email: string
  subscriptionStatus: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com', subscriptionStatus: 'Active' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', subscriptionStatus: 'Inactive' },
      // Add more mock users here
    ])
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subscription Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.subscriptionStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
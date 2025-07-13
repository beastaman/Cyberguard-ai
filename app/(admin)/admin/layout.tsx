import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, BarChart, Settings, CreditCard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-900">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          CyberGuard AI Admin
        </div>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <BarChart className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Users className="w-5 h-5" />
            <span>Users</span>
          </Link>
          <Link href="/admin/subscriptions" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <CreditCard className="w-5 h-5" />
            <span>Subscriptions</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <UserButton />
        </header>
        {children}
      </main>
    </div>
  )
}
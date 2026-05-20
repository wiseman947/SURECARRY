"use client"

import AdminSidebar from "./components/AdminSidebar"
import AdminNavbar from "./components/AdminNavbar"

export default function AdminClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Truck, Package, CreditCard, Settings } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block flex-shrink-0">
      <div className="p-6 font-bold text-xl text-blue-600">
        Sure Carry
      </div>

      <nav className="flex flex-col gap-2 p-4">

        <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        
        <Link href="/admin/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <CreditCard size={18} /> Login
        </Link>

        <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <Users size={18} /> Users
        </Link>

        <Link href="/admin/drivers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <Truck size={18} /> Drivers
        </Link>

        <Link href="/admin/bookings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <Package size={18} /> Bookings
        </Link>

        <Link href="/admin/payments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <CreditCard size={18} /> Payments
        </Link>

        
        <Link href="/admin/tracking" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <CreditCard size={18} /> Tracking
        </Link>

        
        <Link href="/admin/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <CreditCard size={18} /> Analytics
        </Link>

        <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
          <Settings size={18} /> Settings
        </Link>

      </nav>
    </aside>
  );
}
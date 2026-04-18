"use client";

import { Bell, Search } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between py-30">

      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Search size={16} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell size={20} />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>

    </header>
  );
}
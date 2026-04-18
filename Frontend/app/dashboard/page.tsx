"use client";
import React, { useEffect, useState } from 'react';
import { Wallet, Car, Package, Compass, Bell, Activity, ArrowUpRight, ArrowDownLeft, Truck } from 'lucide-react';
import { fetchApi } from '../../utils/api';

export default function Dashboard() {
  const [user, setUser] = useState({ firstName: 'Guest', id: '' });
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = await fetchApi('/users/me');
        if (profile) setUser(profile);
        
        const walletData = await fetchApi('/wallet');
        if (walletData && walletData.balance !== undefined) setBalance(walletData.balance);
      } catch (err: any) {
        if(err.message === "API Request Failed") {
            window.location.href = "/signin";
        }
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 py-30 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            </h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl font-medium transition-colors border border-blue-500/20">
              <Activity size={20} /> Dashboard
            </a>
            <a href="/services" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl font-medium transition-all">
              <Car size={20} /> Request a Ride
            </a>
            <a href="/services" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl font-medium transition-all">
              <Package size={20} /> Request Delivery
            </a>
            <a href="/services" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl font-medium transition-all">
              <Truck size={20} /> Request Packing
            </a>
            <a href="/wallet" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl font-medium transition-all">
              <Wallet size={20} /> Wallet
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 hidden-scrollbar">
          
          {/* Header */}
          <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">Welcome back, {user.firstName}!</h1>
              <p className="text-sm text-slate-400 mt-1">Here is your account overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                <Bell size={20} className="text-slate-300" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full cursor-pointer shadow-lg shadow-blue-500/20" />
            </div>
          </header>

          {/* Dashboard Body */}
          <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Wallet Card */}
              <div className="relative group overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-6 drop-shadow">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Wallet size={24} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-green-500/20 text-green-400 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={14} /> +2.5%
                  </span>
                </div>
                <h3 className="text-slate-400 font-medium mb-1">Available Balance</h3>
                <p className="text-4xl font-bold tracking-tight">₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>

              {/* Rides Card */}
              <div className="relative group overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <Compass size={24} className="text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-slate-400 font-medium mb-1">Total Trips Completed</h3>
                <p className="text-4xl font-bold tracking-tight">42</p>
              </div>

              {/* Deliveries Card */}
              <div className="relative group overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Package size={24} className="text-purple-400" />
                  </div>
                </div>
                <h3 className="text-slate-400 font-medium mb-1">Packages Sent</h3>
                <p className="text-4xl font-bold tracking-tight">18</p>
              </div>
            </div>

            {/* Main Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Activity */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Activity size={20} className="text-blue-400"/> Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Ride to Airport", date: "Today, 10:30 AM", amount: "-₦3200.50", icon: Car, color: "text-blue-400", bg: "bg-blue-500/20" },
                    { title: "Wallet Top-up", date: "Yesterday, 4:15 PM", amount: "+₦10000.00", icon: ArrowDownLeft, color: "text-emerald-400", bg: "bg-emerald-500/20" },
                    { title: "Package to Downtown", date: "Oct 24, 2:00 PM", amount: "-₦1800.00", icon: Package, color: "text-purple-400", bg: "bg-purple-500/20" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:bg-slate-800/80 transition cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${item.bg}`}>
                          <item.icon size={20} className={item.color} />
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                        </div>
                      </div>
                      <span className={`font-medium ${item.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a href="/services" className="group p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all text-center flex flex-col items-center justify-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform">
                      <Car size={24} className="text-blue-400" />
                    </div>
                    <span className="font-medium text-sm text-slate-200">Request a Ride</span>
                  </a>
                  
                  <a href="/services" className="group p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all text-center flex flex-col items-center justify-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-full group-hover:scale-110 transition-transform">
                      <Package size={24} className="text-emerald-400" />
                    </div>
                    <span className="font-medium text-sm text-slate-200">Request Delivery</span>
                  </a>

                  <a href="/services" className="group p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all text-center flex flex-col items-center justify-center gap-3">
                    <div className="p-3 bg-purple-500/10 rounded-full group-hover:scale-110 transition-transform">
                      <Truck size={24} className="text-purple-400" />
                    </div>
                    <span className="font-medium text-sm text-slate-200">Request Packing</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

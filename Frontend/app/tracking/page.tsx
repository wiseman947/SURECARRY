// app/tracking/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Truck, Package, Car, Navigation, User, Phone, X, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

// Mock Data
const mockData = {
  ride: {
    id: "SC-TRK-RDE-9821",
    service: "Ride",
    driver: { name: "Samuel O.", rating: 4.8 },
    vehicle: { model: "Toyota Camry", plate: "ABC 123 XY", color: "Silver" },
    currentStage: 2,
    stages: ["Searching", "Driver Assigned", "En Route", "Arrived", "In Transit", "Completed"],
    pickup: "Finima Nature Park, Bonny island",
    destination: "Indusrtial unit, Bonny island",
    eta: "35 mins",
  },
  delivery: {
    id: "SC-TRK-DEL-4512",
    service: "Delivery",
    driver: { name: "Ahmed K.", rating: 4.9 },
    vehicle: { model: "Delivery Bike", plate: "QWE 456 RT", color: "Blue/Orange" },
    currentStage: 3,
    stages: ["Pending", "Assigned", "Picked Up", "In Transit", "Out for Delivery", "Delivered"],
    pickup: ", Willbross Pipline Rd, Bonny island",
    destination: "Atlantic Royal Suit, Bonny island",
    eta: "25 mins",
  },
  packing: {
    id: "SC-TRK-PKG-1092",
    service: "Packing",
    driver: { name: "Pro Movers Team A", rating: 4.7 },
    vehicle: { model: "SureCarry Van 12", plate: "XYZ 789 AB", color: "Blue?orange" },
    currentStage: 2,
    stages: ["Confirmed", "Assigned", "En Route", "Packing", "In Transit", "Delivered"],
    pickup: "No-23 Rumuola RD. Ph, ",
    destination: "New Road, Bonny island",
    eta: "2 hours",
  }
};

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [activeTracking, setActiveTracking] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(true);

  // Demo tool to easily switch states
  const startSimulation = (type: "ride" | "delivery" | "packing") => {
    setActiveTracking(mockData[type]);
    setDemoMenuOpen(false);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    
    // Simulate finding a random tracking based on ID format or just default to delivery
    setIsSimulating(true);
    setTimeout(() => {
      const type = trackingId.toLowerCase().includes("ride") ? "ride" 
                 : trackingId.toLowerCase().includes("pkg") ? "packing" 
                 : "delivery";
      setActiveTracking(mockData[type]);
      setIsSimulating(false);
      setDemoMenuOpen(false);
    }, 1500);
  };

  const clearTracking = () => {
    setActiveTracking(null);
    setTrackingId("");
    setDemoMenuOpen(true);
  };

  // --- Empty State ---
  if (!activeTracking) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-50 px-6 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[100px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-orange-100 blur-[80px] opacity-60"></div>
        </div>

        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl p-8 z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
              <Navigation className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Track Your Service</h1>
            <p className="text-gray-500">Enter your tracking ID for real-time updates.</p>
          </div>

          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. SC-TRK-DEL-4512"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-gray-900 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSimulating}
              className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 transition shadow-lg shadow-blue-900/20 disabled:opacity-70 flex justify-center items-center"
            >
              {isSimulating ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Track Now"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-center text-gray-500 mb-4">Example below:</p>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => startSimulation('ride')} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition hover:border-blue-200 hover:shadow-sm">
                <Car className="w-5 h-5 text-purple-600 mb-1" />
                <span className="text-xs font-medium text-gray-600">Ride</span>
              </button>
              <button onClick={() => startSimulation('delivery')} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition hover:border-orange-200 hover:shadow-sm">
                <Package className="w-5 h-5 text-orange-600 mb-1" />
                <span className="text-xs font-medium text-gray-600">Delivery</span>
              </button>
              <button onClick={() => startSimulation('packing')} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition hover:border-green-200 hover:shadow-sm">
                <Truck className="w-5 h-5 text-green-600 mb-1" />
                <span className="text-xs font-medium text-gray-600">Packing</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- Active State ---
  return (
    <main className="h-screen w-full relative flex flex-col md:flex-row bg-[#f8f9fa] overflow-hidden">
      
      {/* MAP BACKGROUND MOCK */}
      <div className="absolute inset-0 z-0 bg-[#e5e3df]">
        {/* Simple Map Grid / Pattern Simulation */}
        <div className="absolute inset-0 opacity-20 py-50" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* Mock Routes/Roads */}
        <svg className="absolute inset-0 w-full h-full text-white/50" preserveAspectRatio="none">
           <path d="M 0 200 C 300 200, 300 400, 600 400 S 800 600, 1200 600" fill="none" stroke="currentColor" strokeWidth="20" />
           <path d="M 200 0 C 200 300, 500 300, 500 800" fill="none" stroke="currentColor" strokeWidth="16" />
        </svg>
        
        {/* Active Route Svg Mock */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
           <path d="M 200 200 C 300 200, 300 400, 500 400" fill="none" stroke="#2563eb" strokeWidth="6" strokeDasharray="10, 10" className="animate-[dash_20s_linear_infinite]" />
        </svg>

        {/* Map Markers */}
        <div className="absolute top-[200px] left-[200px] -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-md"></div>
        </div>
        <div className="absolute top-[400px] left-[500px] -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="w-6 h-6 bg-blue-600 rounded-sm rounded-br-3xl flex items-center justify-center p-1 shadow-lg transform -rotate-45">
             <Navigation className="w-4 h-4 text-white rotate-45" />
           </div>
           {/* Ripple Effect */}
           <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="absolute top-[400px] left-[700px] -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* FLOATING HEADER (Mobile only or absolute everywhere) */}
      <div className="absolute top-6 left-6 z-20 flex gap-3">
        <button 
          onClick={clearTracking}
          className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 transition"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* FLOATING TRACKING PANEL */}
      <div className="absolute bottom-0 left-0 w-full md:w-[420px] md:bottom-6 md:left-6 md:h-[calc(100vh-48px)] z-20 flex flex-col md:rounded-3xl shadow-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-500 transform translate-y-0">
        
        {/* Mobile Handle */}
        <div className="w-full flex justify-center py-3 md:hidden bg-white hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 pb-8 custom-scrollbar">
          
          {/* Header Info */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-3 border border-blue-100">
                {activeTracking.service === "Ride" && <Car className="w-3 h-3" />}
                {activeTracking.service === "Delivery" && <Package className="w-3 h-3" />}
                {activeTracking.service === "Packing" && <Truck className="w-3 h-3" />}
                {activeTracking.service} Tracking
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {activeTracking.stages[activeTracking.currentStage]}
              </h2>
              <div className="flex items-center text-gray-500 mt-1 gap-2">
                <Clock className="w-4 h-4" />
                <span>Arriving in <strong className="text-blue-600">{activeTracking.eta}</strong></span>
              </div>
            </div>
            {/* ETA large circle */}
            <div className="hidden md:flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-3 border border-gray-100 min-w-[70px]">
              <span className="text-xl font-bold text-gray-900 leading-none">{activeTracking.eta.split(' ')[0]}</span>
              <span className="text-xs text-gray-500 font-medium">{activeTracking.eta.split(' ')[1]}</span>
            </div>
          </div>

          {/* Progress Bar Timeline */}
          <div className="mb-8">
            <div className="relative pt-2">
              <div className="absolute top-[18px] left-[15px] h-full w-[2px] bg-gray-100 -z-10"></div>
              {activeTracking.stages.map((stage: string, idx: number) => {
                const isActive = idx === activeTracking.currentStage;
                const isPassed = idx < activeTracking.currentStage;
                const isLast = idx === activeTracking.stages.length - 1;
                
                return (
                  <div key={idx} className={`flex gap-4 mb-5 relative ${idx > activeTracking.currentStage + 1 ? 'opacity-40' : ''}`}>
                    <div className="flex flex-col items-center">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-300
                         ${isActive ? 'bg-blue-600 shadow-md shadow-blue-600/30 ring-4 ring-blue-50' : 
                           isPassed ? 'bg-blue-600' : 'bg-white border-2 border-gray-200'}`}
                       >
                         {isPassed ? (
                           <CheckCircle className="w-5 h-5 text-white" />
                         ) : isActive ? (
                           <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
                         ) : null}
                       </div>
                       {/* Line connection */}
                       {!isLast && <div className={`w-[2px] h-8 mt-1 rounded-full ${isPassed ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
                    </div>
                    
                    <div className={`pt-1 ${isActive ? 'mt-[-2px]' : ''}`}>
                      <h4 className={`text-base font-medium ${isActive ? 'text-blue-600 font-bold' : isPassed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {stage}
                      </h4>
                      {isActive && <p className="text-xs text-gray-500 mt-0.5">Updated just now</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Driver & Vehicle Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6 sticky top-0 z-10">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200/60">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded border border-white flex items-center">
                    ★ {activeTracking.driver.rating}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{activeTracking.driver.name}</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">
                    {activeTracking.service === "Ride" ? "YOUR DRIVER" : activeTracking.service === "Delivery" ? "YOUR RIDER" : "YOUR TEAM"}
                  </p>
                </div>
              </div>
              <button className="bg-white p-3 rounded-full text-blue-600 hover:bg-blue-50 transition border border-gray-100 shadow-sm">
                <Phone className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{activeTracking.vehicle.model}</p>
                <p className="text-xs text-gray-500">{activeTracking.vehicle.color}</p>
              </div>
              <div className="bg-gray-200 px-3 py-1.5 rounded-lg border border-gray-300 font-mono text-sm font-bold text-gray-800 tracking-wider">
                {activeTracking.vehicle.plate}
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Trip Details</h3>
            <div className="flex gap-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-gray-900 shadow-[0_0_0_3px_rgba(243,244,246,1)]"></div>
                <div className="w-[1.5px] h-8 bg-gray-200 my-1"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-600 shadow-[0_0_0_3px_rgba(243,244,246,1)]"></div>
              </div>
              <div className="flex-1 flex flex-col justify-between -mt-0.5">
                <div className="mb-6">
                  <p className="text-xs text-gray-500 font-medium">Pickup</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{activeTracking.pickup}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Destination</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{activeTracking.destination}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <button className="py-3 px-4 bg-red-50 text-red-600 font-semibold rounded-xl border border-red-100 hover:bg-red-100 transition">
              Cancel
            </button>
            <button className="py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition">
              Share Trip
            </button>
          </div>

        </div>

        {/* Demo Switcher (Developer tool for demo) */}
        {demoMenuOpen && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 z-50 text-center w-[80%] max-w-sm">
            <h3 className="font-bold mb-4">Demo: Switch Tracking Type</h3>
            <div className="space-y-2">
              <button onClick={() => startSimulation('ride')} className="w-full p-2 bg-purple-50 text-purple-700 rounded-lg font-medium">Test Ride Tracking</button>
              <button onClick={() => startSimulation('delivery')} className="w-full p-2 bg-orange-50 text-orange-700 rounded-lg font-medium">Test Delivery Tracking</button>
              <button onClick={() => startSimulation('packing')} className="w-full p-2 bg-green-50 text-green-700 rounded-lg font-medium">Test Packing Tracking</button>
              <button onClick={() => setDemoMenuOpen(false)} className="w-full p-2 mt-2 text-gray-500 font-medium text-sm">Close</button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

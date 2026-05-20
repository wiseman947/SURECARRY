"use client";

import { useState } from "react";
import { Activity, Map, Navigation, Banknote, Sparkles } from "lucide-react";
import { fetchApi } from "@/utils/api";

export default function AIFeatures() {
  // Pricing State
  const [baseFare, setBaseFare] = useState("1000");
  const [distance, setDistance] = useState("10");
  const [traffic, setTraffic] = useState("MEDIUM");
  const [pricingResult, setPricingResult] = useState<number | null>(null);
  const [loadingPricing, setLoadingPricing] = useState(false);

  // Route State
  const [origin, setOrigin] = useState("Bonny Island");
  const [destination, setDestination] = useState("Port Harcourt");
  const [routeResult, setRouteResult] = useState<any>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  const handlePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPricing(true);
    try {
      const data = await fetchApi("/ai/pricing", {
        method: "POST",
        body: JSON.stringify({
          baseFare: parseFloat(baseFare),
          distance: parseFloat(distance),
          trafficLevel: traffic
        })
      });
      if (data && data.estimatedFare !== undefined) {
        setPricingResult(data.estimatedFare);
      }
    } catch(err) {
      alert("Please Make Sure You are logged in to use AI Services");
    } finally {
      setLoadingPricing(false);
    }
  };

  const handleRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRoute(true);
    try {
      const data = await fetchApi("/ai/route", {
        method: "POST",
        body: JSON.stringify({ origin, destination })
      });
      if (data) {
        setRouteResult(data);
      }
    } catch(err) {
      alert("Please Make Sure You are logged in to use AI Services");
    } finally {
      setLoadingRoute(false);
    }
  };

  return (
    <section className="w-full bg-slate-50 py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-sm mb-6">
            <Sparkles size={16} /> Powered by SureCarry AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Smarter Logistics. Better Pricing.
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Experience our intelligent platform features directly. Calculate optimized pricing algorithms and compute the fastest routes seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Smart Pricing Tool */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 text-blue-50 opacity-50 pointer-events-none">
              <Banknote size={200} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600 text-white rounded-lg"><Activity size={24} /></div>
                <h3 className="text-2xl font-bold text-gray-900">Dynamic Pricing</h3>
              </div>

              <form onSubmit={handlePricing} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Fare (₦)</label>
                  <input type="number" value={baseFare} onChange={e => setBaseFare(e.target.value)} className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 outline-none focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                  <input type="number" value={distance} onChange={e => setDistance(e.target.value)} className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 outline-none focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Level</label>
                  <select value={traffic} onChange={e => setTraffic(e.target.value)} className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 outline-none focus:ring-blue-500">
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                
                <button type="submit" disabled={loadingPricing} className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition mt-4">
                  {loadingPricing ? "Calculating..." : "Calculate Price"}
                </button>
              </form>

              {pricingResult !== null && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-sm text-green-800 font-medium mb-1">AI Estimated Fare</p>
                  <p className="text-3xl font-bold text-green-600">₦{pricingResult.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Route Optimization Tool */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 text-emerald-50 opacity-50 pointer-events-none">
              <Map size={200} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-600 text-white rounded-lg"><Navigation size={24} /></div>
                <h3 className="text-2xl font-bold text-gray-900">Route Optimizer</h3>
              </div>

              <form onSubmit={handleRoute} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 outline-none focus:ring-emerald-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input type="text" value={destination} onChange={e => setDestination(e.target.value)} className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 outline-none focus:ring-emerald-500" required />
                </div>
                
                <button type="submit" disabled={loadingRoute} className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition mt-4">
                  {loadingRoute ? "Optimizing..." : "Find Best Route"}
                </button>
              </form>

              {routeResult !== null && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-emerald-800 font-medium mb-1">Distance</p>
                    <p className="text-2xl font-bold text-emerald-600">{routeResult.distanceKm} km</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-emerald-800 font-medium mb-1">Est. Time</p>
                    <p className="text-2xl font-bold text-emerald-600">{routeResult.estimatedTimeMinutes} min</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

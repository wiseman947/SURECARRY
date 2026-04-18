"use client";

import { useState } from "react";
import { Car, Package, Truck, MapPin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/utils/api";
import ReceiptModal from "@/components/booking/ReceiptModal";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("ride");
  const router = useRouter();

  // Form State
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal & AI State
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [routeResult, setRouteResult] = useState<any>(null);
  const [pricingResult, setPricingResult] = useState<any>(null);
  const [receiptDetails, setReceiptDetails] = useState<Record<string, string>>({});

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) return;

    setLoading(true);
    try {
      // 1. Get Simulated Route Data from Backend
      const routeData = await fetchApi("/ai/route", {
        method: "POST",
        body: JSON.stringify({ origin, destination })
      }).catch(() => ({ distanceKm: 15.4, estimatedTimeMinutes: 35 })); // Fallback if backend isn't ready

      // 2. Determine base fare
      let baseFare = 1000;
      if (activeTab === "package") baseFare = 800;
      if (activeTab === "moving") baseFare = 2500;

      // 3. Get Pricing Data
      const priceData = await fetchApi("/ai/pricing", {
        method: "POST",
        body: JSON.stringify({
          baseFare,
          distance: routeData.distanceKm,
          trafficLevel: "MEDIUM"
        })
      }).catch(() => ({ estimatedFare: baseFare + (routeData.distanceKm * 150) })); // Fallback if backend isn't ready

      setRouteResult(routeData);
      setPricingResult(priceData);
      setShowPricingModal(true);
    } catch (err) {
      alert("Something went wrong calculating your route. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = () => {
    setShowPricingModal(false);
    
    const serviceName = activeTab === "package" ? "Delivery" : activeTab === "moving" ? "Packing" : "Ride";
    setReceiptDetails({
      "Service": serviceName,
      "Pickup": origin,
      "Dropoff": destination,
      "Distance": `${routeResult?.distanceKm.toFixed(2)} km`,
      "Est. Time": `${routeResult?.estimatedTimeMinutes} min`,
      "Total Fare": `₦${pricingResult?.estimatedFare?.toLocaleString() || "0"}`,
      "Status": "Confirmed",
      "Date": new Date().toLocaleString()
    });

    setShowReceiptModal(true);
  };

  
  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-0 md:h-[700px] bg-black flex items-center pt-20 md:pt-0">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80" 
        style={{ backgroundImage: "url('/hero1.png')" }}
      ></div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center ">
        
        {/* Interaction Card */}
        <div className="bg-white pointer-events-auto w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden mt-12 md:mt-20 border border-gray-100">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab("ride")}
              className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 font-medium transition ${activeTab === "ride" ? "border-b-2 border-black text-black bg-white" : "border-b-2 border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
            >
              <Car size={24} />
              <span>Ride</span>
            </button>
            <button 
              onClick={() => setActiveTab("package")}
              className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 font-medium transition ${activeTab === "package" ? "border-b-2 border-black text-black bg-white" : "border-b-2 border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
            >
              <Package size={24} />
              <span>Delivery</span>
            </button>
            <button 
              onClick={() => setActiveTab("moving")}
              className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 font-medium transition ${activeTab === "moving" ? "border-b-2 border-black text-black bg-white" : "border-b-2 border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
            >
              <Truck size={24} />
              <span>Packing</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 leading-tight tracking-tight">
              {activeTab === "ride" && "Request a ride now"}
              {activeTab === "package" && "Send a package"}
              {activeTab === "moving" && "Move goods and items"}
            </h2>

            <form onSubmit={handleAction} className="space-y-4 relative">
              
              {/* Pickup Input */}
              <div className="relative z-20">
                <div className="flex items-center bg-gray-100 rounded-lg p-2 pr-3">
                  <div className="w-2 h-2 rounded-full bg-black mx-3 shrink-0"></div>
                  <input 
                    type="text" 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Enter pickup location" 
                    className="bg-transparent w-full flex-1 outline-none text-gray-900 placeholder-gray-500 py-3 font-medium"
                    required
                  />
                  <MapPin size={20} className="text-gray-400 shrink-0" />
                </div>
              </div>
              
              {/* Dropoff Input */}
              <div className="relative z-10">
                <div className="flex items-center bg-gray-100 rounded-lg p-2 px-3">
                  <div className="w-2 h-2 bg-black mx-3 shrink-0"></div>
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter dropoff destination" 
                    className="bg-transparent w-full flex-1 outline-none text-gray-900 placeholder-gray-500 py-3 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Connecting line between dots */}
              <div className="absolute left-[31px] top-[40px] h-9 w-0.5 bg-gray-300 z-0"></div>

              <div className="mt-8 pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-black text-white text-lg font-semibold py-4 rounded-xl hover:bg-gray-900 transition flex items-center justify-center disabled:opacity-70 shadow-lg"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (activeTab === "ride" ? "See prices" : "Request now")}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 h-screen">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-gray-50 p-6 pt-8 flex flex-col items-center border-b border-gray-100">
              <h2 className="text-3xl font-black text-gray-900">Estimated Fare</h2>
              <p className="text-gray-500 mt-2 font-medium">Review your dynamic booking details</p>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-500 font-medium tracking-wide">SERVICE</span>
                <span className="text-gray-900 font-bold capitalize text-lg">{activeTab === "package" ? "Delivery" : activeTab === "moving" ? "Packing" : "Ride"}</span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-500 font-medium tracking-wide">DISTANCE</span>
                <span className="text-gray-900 font-bold text-lg">{routeResult?.distanceKm.toFixed(2)} km</span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-500 font-medium tracking-wide">EST TIME</span>
                <span className="text-gray-900 font-bold text-lg">{routeResult?.estimatedTimeMinutes} min</span>
              </div>
              <div className="flex justify-between items-center mb-8 pt-6 border-t border-gray-100">
                <span className="text-2xl font-black text-gray-900">Total Price</span>
                <span className="text-3xl font-black text-green-600">₦{pricingResult?.estimatedFare?.toLocaleString() || "0"}</span>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => setShowPricingModal(false)}
                  className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmBooking}
                  className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition shadow-xl shadow-black/20"
                >
                  Confirm & Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      <ReceiptModal 
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        title={`${activeTab === "package" ? "Delivery" : activeTab === "moving" ? "Packing" : "Ride"}`}
        details={receiptDetails}
      />
    </section>
  );
}

"use client";

import { useState } from "react";
import RideForm from "./RideForm";
import PackingForm from "./PackingForm";
import DeliveryForm from "./DeliveryForm";
import { Car, Package, Bike } from "lucide-react";

interface BookingTabsProps {
  onTabChange: (tab: string) => void;
}

export default function BookingTabs({ onTabChange }: BookingTabsProps) {
  const [activeTab, setActiveTab] = useState("Ride");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative z-10 border border-gray-100">
      
      {/* Header Tabs */}
      <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded-xl mb-8">
        <button
          onClick={() => handleTabClick("Ride")}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-lg transition-all duration-300 font-semibold text-sm gap-1.5
            ${activeTab === "Ride" ? "bg-white text-black shadow-md scale-105" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}
        >
          <Car className="w-5 h-5" />
          Ride
        </button>
        <button
          onClick={() => handleTabClick("Packing")}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-lg transition-all duration-300 font-semibold text-sm gap-1.5
            ${activeTab === "Packing" ? "bg-white text-black shadow-md scale-105" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}
        >
          <Package className="w-5 h-5" />
          Packing
        </button>
        <button
          onClick={() => handleTabClick("Delivery")}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-lg transition-all duration-300 font-semibold text-sm gap-1.5
            ${activeTab === "Delivery" ? "bg-white text-black shadow-md scale-105" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}
        >
          <Bike className="w-5 h-5" />
          Delivery
        </button>
      </div>

      {/* Main Content Area */}
      <div className="mt-4 transition-all duration-500 ease-in-out">
        {activeTab === "Ride" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">Get a ride</h2>
            <RideForm />
          </div>
        )}
        {activeTab === "Packing" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">Pack & Move</h2>
            <PackingForm />
          </div>
        )}
        {activeTab === "Delivery" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">Send a package</h2>
            <DeliveryForm />
          </div>
        )}
      </div>

    </div>
  );
}

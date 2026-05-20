"use client";

import { useState } from "react";
import { MapPin, Box, Calendar, Clock } from "lucide-react";
import ReceiptModal from "./ReceiptModal";

export default function PackingForm() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [moveSize, setMoveSize] = useState("Small");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate backend call
    setTimeout(() => {
      setIsLoading(false);
      setShowReceipt(true);
    }, 1500);
  };

  const receiptDetails = {
    "Service": "Packing & Moving",
    "Move Size": moveSize,
    "Pickup From": pickup || "Not specified",
    "Deliver To": destination || "Not specified",
    "Date & Time": isScheduled ? `${date} at ${time}` : "Instant / Now",
    "Estimated Cost": moveSize === "Studio / 1-Bed" ? "₦1500.00" : moveSize === "2-3 Bedroom" ? "₦3500.00" : "₦8000.00",
  };

  return (
    <>
      <form onSubmit={handleBooking} className="flex flex-col space-y-4">
        {/* Toggle Nav */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-2">
          <button
            type="button"
            onClick={() => setIsScheduled(false)}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${!isScheduled ? "bg-blue-800 shadow text-white" : "text-gray-500 hover:text-black"}`}
          >
            Now
          </button>
          <button
            type="button"
            onClick={() => setIsScheduled(true)}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${isScheduled ? "bg-blue-800 shadow text-white" : "text-gray-500 hover:text-black"}`}
          >
            Schedule
          </button>
        </div>

        {/* Inputs */}
        <div className="relative">
          <div className="absolute top-3.5 left-3 text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            required
            placeholder="Pickup address" 
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
          />
        </div>

        <div className="relative">
          <div className="absolute top-3.5 left-3 text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            required
            placeholder="Destination address" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
          />
        </div>

        <div className="relative">
          <div className="absolute top-3.5 left-3 text-gray-400">
            <Box className="w-5 h-5" />
          </div>
          <select 
            value={moveSize}
            onChange={(e) => setMoveSize(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition appearance-none"
          >
            <option value="Small">Few items / Boxes</option>
            <option value="Studio / 1-Bed">Studio / 1-Bedroom Appt</option>
            <option value="2-3 Bedroom">2-3 Bedroom Appt</option>
            <option value="Full House">Full House / Large Move</option>
          </select>
        </div>

        {isScheduled && (
          <div className="flex gap-2">
            <div className="relative w-1/2">
              <div className="absolute top-3.5 left-3 text-gray-400">
                <Calendar className="w-5 h-5" />
              </div>
              <input 
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
              />
            </div>
            <div className="relative w-1/2">
              <div className="absolute top-3.5 left-3 text-gray-400">
                <Clock className="w-5 h-5" />
              </div>
              <input 
                type="time" 
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
              />
            </div>
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-blue-800 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-blue-800 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : isScheduled ? "Schedule Packing" : "Request Packing"}
        </button>
      </form>

      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => {
          setShowReceipt(false);
          setPickup("");
          setDestination("");
        }} 
        title="Packing Session" 
        details={receiptDetails} 
      />
    </>
  );
}

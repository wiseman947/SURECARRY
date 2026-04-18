"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, Car } from "lucide-react";
import ReceiptModal from "./ReceiptModal";

export default function RideForm() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("Economy");
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
    "Service": "Ride",
    "Ride Type": rideType,
    "Pickup": pickup || "Not specified",
    "Dropoff": dropoff || "Not specified",
    "Time": isScheduled ? `${date} at ${time}` : "Instant / Now",
    "Estimated Cost": rideType === "Premium" ? "₦4500.00" : "₦1500.00",
  };

  return (
    <>
      <form onSubmit={handleBooking} className="flex flex-col space-y-4">
        {/* Toggle Nav */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-2">
          <button
            type="button"
            onClick={() => setIsScheduled(false)}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${!isScheduled ? "bg-white shadow text-black" : "text-gray-500 hover:text-black"}`}
          >
            Now
          </button>
          <button
            type="button"
            onClick={() => setIsScheduled(true)}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${isScheduled ? "bg-white shadow text-black" : "text-gray-500 hover:text-black"}`}
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
            placeholder="Pickup location" 
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
          />
        </div>

        <div className="relative">
          <div className="absolute top-3.5 left-3 text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            required
            placeholder="Where to?" 
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
          />
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
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
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
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
              />
            </div>
          </div>
        )}

        <div className="relative">
          <div className="absolute top-3.5 left-3 text-gray-400">
            <Car className="w-5 h-5" />
          </div>
          <select 
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition appearance-none"
          >
            <option value="Economy">Economy</option>
            <option value="Comfort">Comfort</option>
            <option value="Premium">Premium</option>
            <option value="XL">XL (Up to 6 seats)</option>
          </select>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-black text-white py-3.5 rounded-lg font-bold text-lg hover:bg-gray-800 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Booking..." : isScheduled ? "Schedule Ride" : "Request Ride"}
        </button>
      </form>

      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => {
          setShowReceipt(false);
          setPickup("");
          setDropoff("");
        }} 
        title="Ride" 
        details={receiptDetails} 
      />
    </>
  );
}

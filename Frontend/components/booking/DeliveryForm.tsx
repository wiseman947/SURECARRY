"use client";

import { useState } from "react";
import { MapPin, Package, Calendar, Clock, Weight } from "lucide-react";
import ReceiptModal from "./ReceiptModal";

export default function DeliveryForm() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [weight, setWeight] = useState("Under 5kg");
  const [vehicle, setVehicle] = useState("Motorbike");
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
    "Service": "Package Delivery",
    "Vehicle Requirement": vehicle,
    "Package Weight": weight,
    "Pickup From": pickup || "Not specified",
    "Deliver To": dropoff || "Not specified",
    "Date & Time": isScheduled ? `${date} at ${time}` : "Instant / Now",
    "Estimated Cost": vehicle === "Van" ? "₦450.00" : vehicle === "Car" ? "₦500.00" : "₦1000.00",
  };

  return (
    <>
      <form onSubmit={handleBooking} className="flex flex-col space-y-4">
        {/* Toggle Nav */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-2">
          <button
            type="button"
            onClick={() => setIsScheduled(false)}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${!isScheduled ? "bg-orange-600 shadow text-white" : "text-gray-500 hover:text-black"}`}
          >
            Now
          </button>
          <button
            type="button"
            onClick={() => setIsScheduled(true)}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${isScheduled ? "bg-orange-600 shadow text-white" : "text-gray-500 hover:text-black"}`}
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
            placeholder="Sender's address (Pickup)" 
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>

        <div className="relative">
          <div className="absolute top-3.5 left-3 text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            required
            placeholder="Recipient's address (Dropoff)" 
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative w-1/2">
            <div className="absolute top-3.5 left-3 text-gray-400">
              <Package className="w-5 h-5" />
            </div>
            <select 
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition appearance-none"
            >
              <option value="Motorbike">Motorbike</option>
              <option value="Car">Car</option>
              <option value="Van">Van / Truck</option>
            </select>
          </div>
          <div className="relative w-1/2">
            <div className="absolute top-3.5 left-3 text-gray-400">
              <Weight className="w-5 h-5" />
            </div>
            <select 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition appearance-none"
            >
              <option value="Under 5kg">Under 5kg</option>
              <option value="5kg - 20kg">5kg - 20kg</option>
              <option value="Over 20kg">Over 20kg</option>
            </select>
          </div>
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
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
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
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
            </div>
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-orange-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-red-700 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Validating..." : isScheduled ? "Schedule Delivery" : "Request Delivery"}
        </button>
      </form>

      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => {
          setShowReceipt(false);
          setPickup("");
          setDropoff("");
        }} 
        title="Delivery" 
        details={receiptDetails} 
      />
    </>
  );
}

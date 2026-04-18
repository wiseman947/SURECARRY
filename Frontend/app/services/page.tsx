"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import BookingTabs from "../../components/booking/BookingTabs";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("Ride");

  // Dynamically select the image based on active tab
  const getActiveImage = () => {
    switch (activeTab) {
      case "Ride": return "/sc_car.png";
      case "Delivery": return "/sc_bike.png";
      case "Packing": return "/sc_van.png";
      default: return "/sc_car.png";
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans py-20">
      <Navbar />

      <main className="max-w-[1400px] mx-auto pt-16 pb-24 px-6 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-12">
        {/* Left Side: Booking Tabs */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
           <BookingTabs onTabChange={setActiveTab} />
        </div>

        {/* Right Side: Showcase Image */}
        <div className="w-full lg:w-[50%] relative h-[250px] md:h-[350px] lg:h-[400px] hidden md:block">
  <Image
    src={getActiveImage()}
    alt={`${activeTab} service vehicle`}
    fill
    className="object-contain rounded-xl shadow-md border border-gray-100 transition-all duration-500"
    priority
  />
</div>
      </main>
    </div>
  );
}
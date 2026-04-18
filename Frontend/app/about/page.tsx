import React from "react";
import { ShieldCheck, Truck, Clock, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Move with <span className="text-gray-400">Confidence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From booking safe rides and fast deliveries to full-scale professional packing, 
            we provide reliable tech-driven solutions for every need.
          </p>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To save you time, reduce stress, and ensure your items and passengers reach their destination safely and efficiently. We leverage modern technology to bridge the gap between people and reliable logistics.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To become the leading connected transportation ecosystem, where every ride, delivery, and move is handled with absolute transparency, speed, and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Why Choose Sure Carry</h2>
          </div>
          
          <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <ShieldCheck className="w-12 h-12 text-black mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-600">Rigorous vetting and tracking ensure absolute peace of mind for every journey.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <Clock className="w-12 h-12 text-black mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">Punctual rides and timely deliveries, managed by our advanced routing AI.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <Truck className="w-12 h-12 text-black mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Versatility</h3>
              <p className="text-gray-600">From single passengers to enterprise logistics, we scale to your exact needs.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <Globe className="w-12 h-12 text-black mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connected</h3>
              <p className="text-gray-600">A unified app ecosystem that puts you in complete control of your requests.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
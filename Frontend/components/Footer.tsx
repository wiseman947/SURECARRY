"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-15 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        
        <div>
          <Image
            src="/logo.png"
            alt="Sure Carry Logo"
            width={200}
            height={100}
            className="mb-4"
          />
          <p className="text-gray-300 text-sm leading-relaxed">
            Sure Carry provides reliable ride booking, fast delivery,
            transportation, and professional packing services.
            Your destination is our passion.
          </p>

          {/* Socials */}
         <div className="flex gap-4 mt-6">
  <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition">
    <Twitter size={20} />
  </a>

  <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition">
    <Facebook size={20} />
  </a>

  <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition">
    <Instagram size={20} />
  </a>

  <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition">
    <Globe size={20} />
  </a>
</div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 hover:text-orange-600">Quick Link</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/tracking">Tracking</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 hover:text-orange-600">Our Services</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>Ride Booking</li>
            <li>Fast Delivery</li>
            <li>Transportation</li>
            <li>Packing Services</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 hover:text-orange-600">Contact</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>📍 Bonny Island, Nigeria</li>
            <li>📞 +234 XXX XXX XXXX</li>
            <li>✉️ support@surecarry.com</li>
          </ul>

          {/* Partners */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Partners</h4>
            <div className="flex gap-3 text-sm text-gray-300">
              <span className="bg-white text-blue-900 px-3 py-1 rounded hover:bg-orange-600 hover:text-white ">
                Logistics
              </span>
              <span className="bg-white text-blue-900 px-3 py-1 rounded hover:bg-orange-600 hover:text-white">
                Riders
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-blue-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Sure Carry. All rights reserved.
        <h3>@wiseman.go.wo@gmail.com</h3>
      </div>
    </footer>
  );
}
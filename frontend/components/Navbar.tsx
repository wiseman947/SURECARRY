"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem("token")) {
      setIsLoggedin(true);
    }
  }, []);

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Sure Carry Logo"
              width={130}
              height={45}
              className="object-contain drop-shadow-sm"
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-600 font-medium text-sm tracking-wide">
          <li><Link href="/" className="hover:text-black transition">Home</Link></li>
          <li><Link href="/services" className="hover:text-black transition">Services</Link></li>
          <li><Link href="/tracking" className="hover:text-black transition">Tracking</Link></li>
          <li><Link href="/support" className="hover:text-black transition">Support</Link></li>
          <li><Link href="/about" className="hover:text-black transition">About</Link></li>
        </ul>

        {/* Sign Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {isMounted && !isLoggedin && (
            <>
              <a href="/signup" className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-amber-100 hover:text-black transition">
                Sign Up
              </a>
              <a href="/signin" className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-amber-100 hover:text-black transition">
                Sign In
              </a>
            </>
          )}
          {isMounted && isLoggedin && (
            <>
              <a href="/dashboard" className="text-gray-700 hover:text-orange-500 font-medium px-4">
                Dashboard
              </a>
              <button 
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/signin";
                }}
                className="bg-gray-200 text-black px-5 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
            <li><Link href="/" className="hover:text-black transition" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/services" className="hover:text-black transition" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link href="/tracking" className="hover:text-black transition" onClick={() => setIsOpen(false)}>Tracking</Link></li>
            <li><Link href="/support" className="hover:text-black transition" onClick={() => setIsOpen(false)}>Support</Link></li>
            <li><Link href="/about" className="hover:text-black transition" onClick={() => setIsOpen(false)}>About</Link></li>
            {isMounted && !isLoggedin && (
              <>
                <li>
                  <a href="/signup" className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-amber-100 hover:text-black transition">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="/signin" className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-amber-100 hover:text-black transition">
                    Sign In
                  </a>
                </li>
              </>
            )}
            {isMounted && isLoggedin && (
              <>
                <li><Link href="/dashboard" className="hover:text-orange-500" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
                <li>
                  <button 
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/signin";
                    }}
                    className="w-full text-left bg-gray-200 text-black px-5 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
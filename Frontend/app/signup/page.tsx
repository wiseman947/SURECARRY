"use client";

import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    lg: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { fetchApi } = await import('../../utils/api');

      const nameParts = formData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const data = await fetchApi('/auth/register', {
        method: "POST",
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password,
          firstName,
          lastName,
          phone: formData.phone,
          role: "USER"
        }),
      });

      alert("Account created successfully! Please sign in.");
      window.location.href = "/signin";
    } catch (error: any) {
      console.error(error);
      alert(`Signup failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-white flex py-20">
      {/* Left Pane - Sign Up Form */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-start lg:justify-center p-6 sm:p-8 lg:p-12 relative overflow-y-auto h-[100dvh] scrollbar-hide">
        {/* Logo / Back link */}
        <div className="w-full max-w-md lg:static flex justify-start lg:justify-start lg:w-auto lg:absolute lg:top-8 lg:left-8 mb-4 lg:mb-0">
          <a href="/" className="text-orange-500 font-bold text-xl flex items-center gap-2">
            SureCarry
          </a>
        </div>
        
        <div className="w-full max-w-md pb-8 lg:mt-12">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium">Join SureCarry for premium transportation and delivery services.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input name="name" placeholder="Wisdom Okon" onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input name="email" type="email" placeholder="mail@example.com" onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <input name="phone" placeholder="+234..." onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">State</label>
                <input name="state" placeholder="State" onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Local Govt</label>
                <input name="lg" placeholder="L.G" onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Address</label>
              <input name="address" placeholder="Full residential or business address" onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input name="password" type="password" placeholder="••••••••" onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Confirm</label>
                <input name="confirmPassword" type="password" placeholder="••••••••" onChange={handleChange} className="w-full border-gray-300 border rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white mt-4 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5">
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 sm:mt-8 text-sm sm:text-base font-medium">
            Already have an account?{" "}
            <a href="/signin" className="text-orange-500 hover:text-orange-600 font-bold hover:underline transition">
              Sign in here
            </a>
          </p>
        </div>
      </section>

      {/* Right Pane - Visuals Showcase */}
      <section className="hidden lg:flex w-1/2 bg-gray-50 flex-col items-center py-20 justify-center p-12 relative overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] -top-32 -right-32"></div>
        <div className="absolute w-[400px] h-[400px] bg-orange-500/30 rounded-full blur-[80px] bottom-0 left-0"></div>

        <div className="relative z-10 w-full max-w-2xl px-8 mt-10">
          <div className="mb-10 text-right">
            <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">Move Anything.<br /><span className="text-blue-400">Anywhere.</span></h2>
            <p className="text-xl text-orange-100 font-medium">Join the thousands of users trusting SureCarry daily.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Motorcycle */}
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
              <img src="sc_bike.png" 
                   alt="Delivery Motorcycle" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full w-max mb-2 shadow-lg">Fast</span>
                <p className="text-white font-bold text-xl">Motorcycles</p>
              </div>
            </div>

            {/* Van */}
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
              <img src="sc_van.png" 
                   alt="Delivery Van" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 shadow-lg">Heavy</span>
                <p className="text-white font-bold text-xl">Cargo Vans</p>
              </div>
            </div>

            {/* Car */}
            <div className="col-span-2 relative h-64 rounded-3xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
              <img src="sc_car.png" 
                   alt="Premium Car" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 shadow-lg">Luxury</span>
                <p className="text-white font-bold text-2xl">Premium Cars</p>
                <p className="text-gray-300 font-medium">Safe executive transport</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
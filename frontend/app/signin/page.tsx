"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { validateEmail, validatePassword } from "../../utils/validation";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = !validateEmail(formData.email) && validatePassword(formData.password).length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "email") setEmailError(validateEmail(value));
    if (name === "password") setPasswordErrors(validatePassword(value));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmailError(validateEmail(value));
    if (name === "password") setPasswordErrors(validatePassword(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eErr = validateEmail(formData.email);
    const pErrs = validatePassword(formData.password);
    setEmailError(eErr);
    setPasswordErrors(pErrs);

    if (eErr || pErrs.length > 0) return;

    setIsSubmitting(true);
    try {
      const { fetchApi, setToken } = await import('../../utils/api');
      
      const data = await fetchApi('/auth/login', {
        method: "POST",
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      setToken(data.token);
      
      window.location.href = "/dashboard";
    } catch (error: any) {
      alert(`Signin failed: ${error.message || 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex py-30">
      {/* Left Pane - Sign In Form */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-16 relative min-h-[100dvh]">
        {/* Back link */}
        <a href="/" className="absolute top-6 left-6 sm:top-8 sm:left-8 text-gray-500 hover:text-gray-800 font-medium flex items-center gap-2">
          ← Back
        </a>

        <div className="w-full max-w-md mt-16 sm:mt-10">
          <div className="mb-8 sm:mb-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium">Log in to manage your SureCarry deliveries and rides.</p>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Ex. mail@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-xl p-3 sm:p-4 text-sm sm:text-base outline-none transition ${
                  emailError 
                    ? "border-red-500 focus:ring-2 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                }`}
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border rounded-xl p-3 sm:p-4 pr-12 text-sm sm:text-base outline-none transition ${
                    passwordErrors.length > 0
                      ? "border-red-500 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordErrors.length > 0 && (
                <div className="text-red-500 text-xs mt-1 space-y-1">
                  {passwordErrors.map((err, i) => (
                    <p key={i}>• {err}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                />
                Remember Me
              </label>
              <a href="/forgot-password" className="text-blue-600 font-medium hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all mt-2 ${
                !isFormValid || isSubmitting
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed shadow-none"
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/30 hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 sm:mt-8 text-sm sm:text-base font-medium">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition">
              Create one here
            </a>
          </p>
        </div>
      </section>

      {/* Right Pane - Visuals Showcase */}
      <section className="hidden lg:flex w-1/2 bg-gray-50 flex-col items-center justify-center p-5 relative overflow-hidden bg-gradient-to-br from-blue-900 to-gray-900 h-full ">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[100px] -top-32 -right-32"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[80px] bottom-0 left-0"></div>

        <div className="relative z-10 w-full max-w-2xl px-8">
          <div className="mb-10">
            <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">The Right Vehicle<br /><span className="text-orange-500">For Every Need.</span></h2>
            <p className="text-xl text-blue-100 font-medium">From luxury rides to heavy cargo, SureCarry has your logistics covered.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Car */}
            <div className="col-span-2 relative h-64 rounded-3xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
              <img src="sc_car.png" 
                   alt="Premium Car" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 shadow-lg">Rides</span>
                <p className="text-white font-bold text-2xl">Premium Cars</p>
                <p className="text-gray-300 font-medium">Comfortable executive travel</p>
              </div>
            </div>
            
            {/* Van */}
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
              <img src="sc_van.png" 
                   alt="Delivery Van" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 shadow-lg">Freight</span>
                <p className="text-white font-bold text-xl">Cargo Vans</p>
              </div>
            </div>

            {/* Motorcycle */}
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
              <img src="sc_bike.png" 
                   alt="Delivery Motorcycle" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full w-max mb-2 shadow-lg">Express</span>
                <p className="text-white font-bold text-xl">Motorcycles</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
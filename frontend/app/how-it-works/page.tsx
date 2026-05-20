import React from 'react';
export const dynamic = 'force-dynamic'
import Link from 'next/link';
import { 
  UserPlus, Settings, Car, Package, Box, MapPin, Clock, 
  Map, UserCheck, MessageSquare, CheckCircle, CreditCard, 
  Receipt, Activity, HelpCircle, ArrowRight, Smartphone
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <main className="w-full bg-slate-50 min-h-screen flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-black text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="absolute -top-[30%] -right-[10%] w-[700px] h-[700px] rounded-full bg-blue-600 blur-[120px] opacity-40"></div>
          <div className="absolute -bottom-[30%] -left-[10%] w-[700px] h-[700px] rounded-full bg-orange-600 blur-[120px] opacity-30"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            How <span className="text-blue-500">Sure</span><span className="text-orange-500">Carry</span> Works
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-12 font-light leading-relaxed">
            Your premium logistics and transportation companion. From getting started to completing your first trip, here is a step-by-step guide to our platform.
          </p>
          <div className="flex gap-4">
            <Link href="/signup" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition shadow-lg shadow-white/10 flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/services" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition backdrop-blur-sm border border-white/20">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content - Timeline/Steps Layout */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-32">
        
        {/* Phase 1: Getting Started */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6 uppercase tracking-wider">Phase 1</div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Getting Started</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Join the SureCarry network in minutes. Creating an account gives you instant access to rides, instant tracking, and secure deliveries.
            </p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <StepCard 
              icon={<UserPlus className="w-8 h-8 text-blue-600" />}
              title="1. Sign up or Log in"
              description="Download the app or visit our website. Enter your phone number or email to create a secure account instantly."
            />
            <StepCard 
              icon={<Settings className="w-8 h-8 text-orange-600" />}
              title="2. Account Setup"
              description="Add your payment methods, verify your identity, and set your home or work addresses for faster bookings."
            />
          </div>
        </div>

        {/* Phase 2: Booking a Service */}
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="md:w-1/3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6 uppercase tracking-wider">Phase 2</div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Booking a Service</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Whether you need to move yourself, a small package, or an entire apartment, booking is seamless and powered by our AI Route Optimizer.
            </p>
          </div>
          <div className="md:w-2/3 w-full relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 w-full">
              <StepCard 
                icon={<Car className="w-8 h-8 text-blue-600" />}
                title="1. Choose Service"
                description="Select from Ride, Delivery, or Packing. Our smart interface adapts to show you relevant options for your choice."
              />
              <StepCard 
                icon={<MapPin className="w-8 h-8 text-orange-600" />}
                title="2. Enter Locations"
                description="Input your pickup point and destination. Our integrated maps provide accurate address predictions."
              />
              <StepCard 
                icon={<Activity className="w-8 h-8 text-green-600" />}
                title="3. Instant AI Pricing"
                description="Review dynamic, upfront pricing calculated by our AI engine factoring distance, traffic, and vehicle type."
              />
              <StepCard 
                icon={<Clock className="w-8 h-8 text-purple-600" />}
                title="4. Book or Schedule"
                description="Request a vehicle instantly or schedule it for a later date and time that fits your exact needs."
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-100/50 to-blue-100/50 blur-3xl -z-10 rounded-full"></div>
          </div>
        </div>

        {/* Phase 3: Service Experience */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-6 uppercase tracking-wider">Phase 3</div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Service Experience</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              From the moment you confirm to the point of arrival, stay connected and in control with our real-time tracking suite.
            </p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            <VerticalStepCard 
              icon={<UserCheck className="w-8 h-8 text-slate-700" />}
              title="1. Assignment"
              description="You're paired with the nearest top-rated driver. View their profile, vehicle details, and rating."
            />
            <VerticalStepCard 
              icon={<Map className="w-8 h-8 text-slate-700" />}
              title="2. Live Tracking"
              description="Watch your driver arrive in real-time on our interactive map. ETA is updated continuously by AI."
            />
            <VerticalStepCard 
              icon={<MessageSquare className="w-8 h-8 text-slate-700" />}
              title="3. Connect"
              description="Need to add drop-off instructions? Call or message your driver securely directly through the platform."
            />
          </div>
        </div>

        {/* Phase 4: Completion & Payment */}
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="md:w-1/3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-6 uppercase tracking-wider">Phase 4</div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Completion & Payment</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              A frictionless finish. Payments are processed securely, automatically, and fully documented for your records.
            </p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <StepCard 
              icon={<CheckCircle className="w-8 h-8 text-green-600" />}
              title="1. Arrival & Completion"
              description="The driver assists with offloading (if applicable) and marks the trip or delivery as successfully complete."
            />
            <StepCard 
              icon={<CreditCard className="w-8 h-8 text-blue-600" />}
              title="2. Secure Payment"
              description="Fare is automatically billed to your preferred payment method. Cash options are also elegantly supported."
            />
            <StepCard 
              icon={<Receipt className="w-8 h-8 text-slate-600" />}
              title="3. Instant Receipt"
              description="A detailed breakdown of your charges, route taken, and time elapsed is sent to your email and stored in your history."
            />
            <StepCard 
              icon={<Smartphone className="w-8 h-8 text-orange-600" />}
              title="4. Rate & Review"
              description="Keep the community strong by giving a 5-star rating and leaving a tip for exceptional service."
            />
          </div>
        </div>

      </section>

      {/* Additional Features Section */}
      <section className="bg-white border-t border-slate-200 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-16">Explore Additional Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Box className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Centralized Tracking</h3>
              <p className="text-lg text-slate-600">
                A dedicated tracking dashboard lets you monitor multiple ongoing deliveries and past trips all from one centralized hub. Perfect for business logic.
              </p>
            </div>
            
            <div className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <HelpCircle className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">24/7 Priority Support</h3>
              <p className="text-lg text-slate-600">
                Access round-the-clock support directly from your ongoing trip screen or through the Help Center. We're always here to assist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white text-center px-6 border-t-[8px] border-blue-600">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to experience SureCarry?</h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Join thousands of users who trust platform for premium, reliable, and swift logistics handling today.
        </p>
        <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition shadow-lg shadow-blue-500/30">
          Book a Service Now <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}

// Subcomponents for cleaner code
function StepCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex items-start gap-5 w-full">
      <div className="mt-1 flex-shrink-0 p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed font-light">{description}</p>
      </div>
    </div>
  );
}

function VerticalStepCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-light">{description}</p>
    </div>
  );
}

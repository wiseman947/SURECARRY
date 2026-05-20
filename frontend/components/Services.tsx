import Image from "next/image";

export default function Services() {
  return (
    <main className="w-full bg-white flex flex-col">
      
      {/* Driver/Partner Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Drive when you want,<br /> make what you need
          </h2>
          <p className="text-lg text-gray-800 mb-8 max-w-md">
            Earn on your own schedule with <span className="text-2xl text-blue-900">Sure</span><span className="text-2xl text-orange-500">Carry.</span> You can deliver packages, transport goods, or give rides whenever it suits you.
          </p>
          <div className="flex items-center gap-6">
            <a href="/signup" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Get started
            </a>
            <a href="/signin" className="text-black font-semibold underline hover:text-gray-600 transition">
              Already have an account? Sign in
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/sc_earn.png"
            alt="Earn with Sure Carry"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
      </section>

      {/* Package & Delivery Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row-reverse items-center gap-16">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            The  <span className="text-6xl font-bold text-blue-900">Sure</span><span className="text-6xl font-bold text-orange-500">Carry</span> you know, reimagined
          </h2>
          <p className="text-lg text-gray-800 mb-8 max-w-md">
            A single platform for all your transportation needs. From rides to delivery, and moving goods carefully across the city.
          </p>
          <div className="flex items-center gap-6">
            <a href="/services" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Book Now
            </a>
            <a href="/services" className="text-black font-semibold underline hover:text-gray-600 transition">
              View all services
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/sc_services.png"
            alt="SureCarry Delivery"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
      </section>

      {/* Business Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
           <span className="text-6xl font-bold text-blue-900">Sure</span><span className="text-6xl font-bold text-orange-500">Carry</span> for Business
          </h2>
          <p className="text-lg text-gray-800 mb-8 max-w-md">
            Transform the way your company moves and feeds its people. Reliable corporative transport and high-stakes deliveries.
          </p>
          <div className="flex items-center gap-6">
            <a href="/how-it-works" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              See how it works
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/sc_buiz.png"
            alt="Sure Carry Business"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
      </section>
      
    </main>
  );
}
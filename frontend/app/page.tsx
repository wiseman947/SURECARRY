"use client";

import Hero from "../components/Hero";
import Services from "../components/Services";
import AIFeatures from "../components/AIFeatures";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Services />
      <AIFeatures />
    </main>
  );
}
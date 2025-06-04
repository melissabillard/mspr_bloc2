import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";

function Home() {
  return (
    <div className="w-full bg-gradient-to-br from-cofrap-light to-cofrap-secondary">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}

export default Home;

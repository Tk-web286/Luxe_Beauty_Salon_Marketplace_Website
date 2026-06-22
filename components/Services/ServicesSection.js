"use client";

import React from "react";
import { Scissors, Sparkles, Wind, Eye, Heart, Compass, Home } from "lucide-react";

const SERVICES_DATA = [
  {
    icon: Scissors,
    name: "Precision Haircut",
    desc: "Scientific sculpting custom-fit to facial structures. Finished with premium styling clay.",
    duration: "45 mins",
    price: "₹1,500"
  },
  {
    icon: Wind,
    name: "Beard Sculpting",
    desc: "Luxury hot-towel prep, straight-razor detailing, and sandalwood oil infusion.",
    duration: "30 mins",
    price: "₹800"
  },
  {
    icon: Sparkles,
    name: "Cellular Hair Spa",
    desc: "Steam micro-mist infusion and deep keratin repair rituals for ultimate shine.",
    duration: "60 mins",
    price: "₹2,500"
  },
  {
    icon: Eye,
    name: "Illuminating Facial",
    desc: "Medical-grade oxygen lift, light exfoliation, and cold-stone lymphatic massage.",
    duration: "50 mins",
    price: "₹3,000"
  },
  {
    icon: Heart,
    name: "Bridal Makeup",
    desc: "Signature high-definition contouring and custom aesthetics for editorial wedding glow.",
    duration: "180 mins",
    price: "₹15,000"
  },
  {
    icon: Compass,
    name: "Bespoke Coloring",
    desc: "Multi-dimensional balayage and tone glazing using organic non-damaging agents.",
    duration: "120 mins",
    price: "₹5,500"
  },
  {
    icon: Home,
    name: "Home Elite Service",
    desc: "Bring the salon home. Full equipment and sanitization setup in your personal space.",
    duration: "Variable",
    price: "₹3,500"
  }
];

export default function ServicesSection() {
  const handleScrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-black relative">
      {/* Background elements */}
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-zinc-950/10 glow-orb" />

      {/* HEADER */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">Featured Offerings</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
          Bespoke <span className="text-gradient-silver">Grooming Rituals</span>
        </h2>
        <p className="text-sm font-light text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Explore our range of premium, high-tech styling and spa solutions tailored to bring out your ultimate expression.
        </p>
      </div>

      {/* SERVICES GRID */}
      {/* 3D Glass Cards with CSS Rotation & Hover tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((srv, index) => {
          const IconComponent = srv.icon;
          return (
            <div 
              key={index}
              style={{ perspective: "1000px" }}
              className="group cursor-pointer"
              onClick={handleScrollToBooking}
            >
              {/* Card Face */}
              <div 
                className="glass-card p-8 rounded-2xl h-full flex flex-col justify-between transition-all duration-500 ease-out border border-white/5 hover:border-white/20 hover:bg-zinc-900/40"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div>
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3 group-hover:text-gradient-silver transition-all duration-300">
                    {srv.name}
                  </h3>
                  
                  <p className="text-xs font-light text-zinc-400 leading-relaxed mb-8">
                    {srv.desc}
                  </p>
                </div>

                {/* Duration & Price Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">Duration</span>
                    <span className="text-xs text-white font-medium">{srv.duration}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">Starts From</span>
                    <span className="text-sm text-white font-black">{srv.price}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

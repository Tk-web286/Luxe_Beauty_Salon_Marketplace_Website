"use client";

import React, { useState } from "react";
import { Star, MapPin, IndianRupee, ChevronRight, Scissors } from "lucide-react";
import Image from "next/image";

export const SALONS_DATA = [
  {
    id: "luxe-nungambakkam",
    name: "LUXE Atelier",
    location: "Nungambakkam, Chennai",
    neighborhood: "Nungambakkam",
    rating: 4.9,
    reviews: 248,
    startingPrice: 1500,
    image: "/salon_nungambakkam.png",
    services: ["Precision Cuts", "Balayage", "Caviar Facials", "French Shave"],
    description: "Our flagship atelier offering avant-garde style styling, bespoke aesthetic consulting, and high-end facial therapy."
  },
  {
    id: "mirror-feather-adyar",
    name: "Mirror & Feather",
    location: "Adyar, Chennai",
    neighborhood: "Adyar",
    rating: 4.8,
    reviews: 192,
    startingPrice: 1200,
    image: "/salon_adyar.png",
    services: ["Signature Beard Sculpt", "Keratin Care", "Ice-Stone Facial", "Luxury Grooming"],
    description: "A serene botanical sanctuary combining natural beauty wellness with razor-sharp modern precision styling."
  },
  {
    id: "gilded-scissors-ecr",
    name: "Gilded Scissors & Spa",
    location: "ECR, Chennai",
    neighborhood: "ECR",
    rating: 5.0,
    reviews: 156,
    startingPrice: 2000,
    image: "/salon_ecr.png",
    services: ["Royal Shave Ritual", "Bridal Glow Makeup", "Aromatherapy Massage", "Platinum Spa"],
    description: "An oceanfront retreat for the elite. Indulge in premium massage therapy and global high-fashion hair styling."
  },
  {
    id: "velvet-room-annanagar",
    name: "The Velvet Room",
    location: "Anna Nagar, Chennai",
    neighborhood: "Anna Nagar",
    rating: 4.7,
    reviews: 310,
    startingPrice: 1600,
    image: "/salon_annanagar.png",
    services: ["Hair Botox Spa", "Skin Illuminator", "Style Refinement", "Beard Beard Therapy"],
    description: "Sleek industrial metal meet deep velvet luxury. Crafting tailored profiles for discerning modern executives."
  }
];

export default function MarketplaceSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const neighborhoods = ["All", "Nungambakkam", "Adyar", "ECR", "Anna Nagar"];

  const filteredSalons = selectedFilter === "All" 
    ? SALONS_DATA 
    : SALONS_DATA.filter(s => s.neighborhood === selectedFilter);

  const handleBook = (salonId) => {
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
      // Pre-select salon if form supports it
      const selectEl = document.getElementById("booking-salon");
      if (selectEl) {
        selectEl.value = salonId;
        // Dispatch event so state updates in parent
        selectEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  return (
    <section id="marketplace" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-black relative">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-zinc-800/10 glow-orb" />

      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-4">
            <Scissors className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">Premium Curations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Discover Chennai's <br/>
            <span className="text-gradient-silver">Finest Salons</span>
          </h2>
        </div>
        
        {/* Neighborhood Filters */}
        <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
          {neighborhoods.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                selectedFilter === filter 
                  ? "bg-white text-black font-bold" 
                  : "bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* SALONS GRID & CAROUSEL */}
      {/* Mobile Swipe Container / Desktop Grid */}
      <div className="relative z-10 flex md:grid md:grid-cols-2 gap-8 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 scroll-smooth snap-x snap-mandatory">
        {filteredSalons.map((salon) => (
          <div 
            key={salon.id}
            className="min-w-[85vw] sm:min-w-[450px] md:min-w-0 snap-center glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group"
          >
            {/* Image container */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={salon.image}
                alt={salon.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              
              {/* Rating tag */}
              <div className="absolute top-4 right-4 py-1.5 px-3 rounded-full bg-black/70 border border-white/10 backdrop-blur-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-xs font-bold text-white">{salon.rating.toFixed(1)}</span>
                <span className="text-[10px] text-zinc-400">({salon.reviews})</span>
              </div>

              {/* Price badge */}
              <div className="absolute bottom-4 left-4 flex items-baseline gap-1 bg-black/60 border border-white/5 px-3 py-1 rounded-lg backdrop-blur-sm">
                <span className="text-[10px] uppercase font-mono text-zinc-400">From</span>
                <IndianRupee className="w-3 h-3 text-white" />
                <span className="text-lg font-black text-white">{salon.startingPrice}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black tracking-tight text-white uppercase group-hover:text-gradient-silver transition-all duration-300">
                  {salon.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{salon.location}</span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-light">
                {salon.description}
              </p>

              {/* Services Tags */}
              <div className="mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-3">Popular Services</span>
                <div className="flex flex-wrap gap-2">
                  {salon.services.map((service, idx) => (
                    <span 
                      key={idx}
                      className="text-xs py-1 px-3 rounded-md bg-white/5 border border-white/5 text-zinc-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking trigger CTA */}
              <button
                onClick={() => handleBook(salon.id)}
                className="w-full mt-auto py-3 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest font-bold text-white transition-all hover:bg-white hover:text-black hover:border-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Book Appointment
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

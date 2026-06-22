"use client";

import React, { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya Ramachandran",
    location: "ECR, Chennai",
    salon: "Gilded Scissors & Spa",
    rating: 5,
    text: "The ocean view at Gilded Scissors was breathtaking, but the service was the real star. The wedding-prep facial gave me an absolute editorial glow. Booking without making an account was so fast!",
    avatar: "P"
  },
  {
    name: "Vikram Sundar",
    location: "Nungambakkam, Chennai",
    salon: "LUXE Atelier",
    rating: 5,
    text: "The AI Match tool matched me with LUXE Atelier based on my straight fine hair. The precision fade they styled was stellar. Incredible attention to detail, highly professional.",
    avatar: "V"
  },
  {
    name: "Anjali Krishnan",
    location: "Adyar, Chennai",
    salon: "Mirror & Feather",
    rating: 4,
    text: "Beautiful botanical aesthetic inside Mirror & Feather. It felt like stepping out of Chennai's traffic and into a luxury spa. Transparent menu pricing makes it so trustworthy.",
    avatar: "A"
  }
];

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    setRotateAngle((prev) => prev - 90); // rotate 90 deg 3D cube effect
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    setRotateAngle((prev) => prev + 90);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900 relative overflow-hidden">
      {/* Background neon accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-zinc-800/5 glow-orb" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500 block mb-3">Client Stories</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Voices of <span className="text-gradient-silver">LUXE Clients</span>
          </h2>
        </div>

        {/* 3D FLOATING REVIEW BOX */}
        <div 
          className="w-full max-w-2xl relative"
          style={{ perspective: "1200px" }}
        >
          {/* Main Card Slider with 3D Rotation Transition */}
          <div 
            className="glass-panel p-8 md:p-12 relative flex flex-col items-center text-center transition-all duration-700 ease-out border border-white/10"
            style={{
              transform: `rotateY(${rotateAngle}deg) translateY(${-5 + Math.sin(rotateAngle / 10) * 5}px)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Quote Icon */}
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mb-6">
              <Quote className="w-4 h-4" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < REVIEWS[activeIndex].rating 
                      ? "text-white fill-white" 
                      : "text-zinc-700"
                  }`} 
                />
              ))}
            </div>

            {/* Review text */}
            <p className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed italic mb-8 max-w-xl">
              "{REVIEWS[activeIndex].text}"
            </p>

            {/* User Meta */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-bold text-sm text-white">
                {REVIEWS[activeIndex].avatar}
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-white">{REVIEWS[activeIndex].name}</span>
                <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  {REVIEWS[activeIndex].location} &bull; {REVIEWS[activeIndex].salon}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

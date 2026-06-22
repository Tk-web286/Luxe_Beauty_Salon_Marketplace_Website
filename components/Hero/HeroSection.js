"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Shield, Compass, Star } from "lucide-react";
import SalonScene from "./SalonScene";

export default function HeroSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = -rect.top;
      const totalScrollHeight = rect.height - window.innerHeight;
      
      if (totalScrollHeight <= 0) return;
      
      let progress = scrollTop / totalScrollHeight;
      progress = Math.max(0, Math.min(1, progress)); // clamp between 0 and 1
      
      // Use requestAnimationFrame for fluid state updates
      window.requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute text opacities based on scroll progress
  // Phase 1: Brand text (0 to 0.25)
  const logoOpacity = Math.max(0, 1 - (scrollProgress / 0.25));
  const logoTranslateY = -(scrollProgress / 0.25) * 50;

  // Phase 2: Stats (0.25 to 0.55)
  let statsOpacity = 0;
  let statsTranslateY = 30;
  if (scrollProgress > 0.22 && scrollProgress <= 0.58) {
    const p = (scrollProgress - 0.22) / 0.15; // fade in
    const pOut = (0.58 - scrollProgress) / 0.15; // fade out
    statsOpacity = Math.max(0, Math.min(1, Math.min(p, pOut)));
    statsTranslateY = 30 - Math.min(1, p) * 30;
  }

  // Phase 3: Benefits (0.55 to 0.85)
  let benefitsOpacity = 0;
  let benefitsTranslateY = 30;
  if (scrollProgress > 0.55 && scrollProgress <= 0.88) {
    const p = (scrollProgress - 0.55) / 0.15; // fade in
    const pOut = (0.88 - scrollProgress) / 0.15; // fade out
    benefitsOpacity = Math.max(0, Math.min(1, Math.min(p, pOut)));
    benefitsTranslateY = 30 - Math.min(1, p) * 30;
  }

  // Fade out the entire hero 3D container in phase 4 (0.85 to 1.0)
  const mainSceneOpacity = scrollProgress >= 0.85 
    ? Math.max(0, 1 - (scrollProgress - 0.85) / 0.15) 
    : 1;

  const scrollToMarketplace = () => {
    const marketplaceEl = document.getElementById("marketplace");
    if (marketplaceEl) {
      marketplaceEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      {/* STICKY CONTAINER FOR 3D CANVAS & TEXT OVERLAYS */}
      <div 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ opacity: mainSceneOpacity }}
      >
        {/* 3D CANVAS */}
        <div className="absolute inset-0 w-full h-full z-0">
          <SalonScene scrollProgress={scrollProgress} />
        </div>

        {/* GRADIENT SHADOW OVERLAYS FOR DRAMA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10 pointer-events-none" />

        {/* PHASE 1 OVERLAY: Brand and Tagline */}
        {logoOpacity > 0.01 && (
          <div 
            className="absolute z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-75"
            style={{ 
              opacity: logoOpacity,
              transform: `translateY(${logoTranslateY}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 text-white/75" />
              <span className="text-xs uppercase tracking-widest font-mono text-zinc-400">Chennai's Finest Beauty Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white uppercase mb-4">
              LUXE
            </h1>
            <p className="text-lg md:text-2xl font-light text-zinc-300 tracking-wide max-w-xl mx-auto mb-10">
              Discover and book Chennai's most exclusive salon experiences with AI matchmaking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button 
                onClick={scrollToMarketplace}
                className="btn-premium group flex items-center gap-2 cursor-pointer"
              >
                Explore Salons
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => document.getElementById("ai-match").scrollIntoView({ behavior: "smooth" })}
                className="btn-premium-outline cursor-pointer"
              >
                Try AI Matcher
              </button>
            </div>

            <div className="absolute bottom-[-160px] flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Scroll to Begin Story</span>
              <div className="scroll-indicator" />
            </div>
          </div>
        )}

        {/* PHASE 2 OVERLAY: Animated Statistics */}
        {statsOpacity > 0.01 && (
          <div 
            className="absolute z-20 w-full max-w-5xl px-6 transition-all duration-75"
            style={{ 
              opacity: statsOpacity,
              transform: `translateY(${statsTranslateY}px)`
            }}
          >
            <div className="text-center mb-12">
              <h2 className="text-xs uppercase tracking-widest font-mono text-zinc-400 mb-2">Elevated Standard</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gradient-silver">Grooming Redefined by the Numbers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-8 text-center flex flex-col justify-center items-center">
                <span className="text-5xl md:text-6xl font-black tracking-tight text-white mb-2">500+</span>
                <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Verified Salons</span>
                <p className="text-xs text-zinc-500 mt-2 max-w-[200px]">Hand-picked and rigorously audited for premium service standards in Chennai.</p>
              </div>
              <div className="glass-panel p-8 text-center flex flex-col justify-center items-center">
                <span className="text-5xl md:text-6xl font-black tracking-tight text-white mb-2">10k+</span>
                <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Elite Clients</span>
                <p className="text-xs text-zinc-500 mt-2 max-w-[200px]">Providing unmatched style transformations for high-end luxury customers.</p>
              </div>
              <div className="glass-panel p-8 text-center flex flex-col justify-center items-center">
                <span className="text-5xl md:text-6xl font-black tracking-tight text-white mb-2">50+</span>
                <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Bespoke Services</span>
                <p className="text-xs text-zinc-500 mt-2 max-w-[200px]">From high-fashion coloring to precision grooming and home beauty spa rituals.</p>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 3 OVERLAY: Benefits & Value Props */}
        {benefitsOpacity > 0.01 && (
          <div 
            className="absolute z-20 w-full max-w-5xl px-6 transition-all duration-75"
            style={{ 
              opacity: benefitsOpacity,
              transform: `translateY(${benefitsTranslateY}px)`
            }}
          >
            <div className="text-center mb-12">
              <h2 className="text-xs uppercase tracking-widest font-mono text-zinc-400 mb-2">Why Luxe</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gradient-silver">A Singular Approach to Beauty tech</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-8 flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Rigorous Selection</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    We select only the top 5% of salons in Chennai, ensuring high sanitary conditions and talented designers.
                  </p>
                </div>
              </div>
              
              <div className="glass-panel p-8 flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">AI-Guided Selection</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Our machine recommendation engine analyzes your facial structure and hair type to match you to standard salons.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-8 flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Seamless Booking</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Zero signup barrier. Book luxury appointments in 30 seconds with immediate real-time confirmations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

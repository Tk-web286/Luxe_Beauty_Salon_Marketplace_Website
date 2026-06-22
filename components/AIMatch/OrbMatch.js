"use client";

import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { Sparkles, Brain, Award, AlertCircle } from "lucide-react";
import { SALONS_DATA } from "../Marketplace/MarketplaceSection";

// Animated 3D Liquid Orb component
function GlowingOrb({ isAnalyzing }) {
  const orbRef = useRef();

  useFrame((state) => {
    if (!orbRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Distort speed increases when thinking
    const speed = isAnalyzing ? 8 : 2;
    orbRef.current.distort = 0.35 + Math.sin(time * speed) * 0.1;
    orbRef.current.speed = isAnalyzing ? 5 : 1.5;
    
    // Rotate slowly
    orbRef.current.parent.rotation.y = time * 0.15;
    orbRef.current.parent.rotation.x = time * 0.08;
  });

  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        ref={orbRef}
        color={isAnalyzing ? "#ffffff" : "#a1a1aa"}
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function OrbMatch() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [hairType, setHairType] = useState("Straight");
  const [serviceType, setServiceType] = useState("Cut");
  const [budget, setBudget] = useState("Premium");
  const [location, setLocation] = useState("Nungambakkam");
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setMatchResult(null);

    // Simulate 3D AI analyzing
    setTimeout(() => {
      // Find a matching salon based on location and budget
      // Fallback to salon with closest index
      let matchedSalon = SALONS_DATA.find(
        (s) => s.neighborhood.toLowerCase() === location.toLowerCase()
      );
      
      if (!matchedSalon) {
        // Fallback to highest rated salon
        matchedSalon = SALONS_DATA[0];
      }

      // Generate personalized grooming advice based on hair type and service
      let advice = "";
      if (hairType === "Straight" && serviceType === "Cut") {
        advice = "We recommend a structural textured cut to add volume, styled with a light clay. Luxe Atelier excels in texturizing fine, straight structures.";
      } else if (hairType === "Wavy" && serviceType === "Cut") {
        advice = "A mid-length flow cut will showcase your waves. Mirror & Feather's texturizing techniques will control volume while keeping the flow.";
      } else if (hairType === "Curly" && serviceType === "Color") {
        advice = "Bespoke highlights will add definition to your ringlets. Gilded Scissors specializes in curl-safe hydrating lift colors.";
      } else {
        advice = "Deep-tissue hair spa and oil renewal treatment are recommended to nourish structural follicles before styling. LUXE specialists will tailor this service.";
      }

      setMatchResult({
        salon: matchedSalon,
        advice: advice,
        confidence: 96
      });
      setIsAnalyzing(false);
    }, 1800);
  };

  const scrollBooking = (salonId) => {
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
      const selectEl = document.getElementById("booking-salon");
      if (selectEl) {
        selectEl.value = salonId;
        selectEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  return (
    <section id="ai-match" className="py-24 px-6 md:px-12 bg-black border-y border-zinc-900 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: 3D ORB DISPLAY */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[400px] bg-zinc-950/20 rounded-3xl border border-white/5 overflow-hidden p-8">
          
          {/* ORB BACKGROUND GLOWS */}
          <div className={`absolute w-[300px] h-[300px] rounded-full glow-orb transition-all duration-1000 ${
            isAnalyzing ? "bg-white/20 scale-125" : "bg-zinc-800/10"
          }`} />

          <div className="w-full h-[280px] z-10 flex items-center justify-center">
            {mounted ? (
              <Canvas camera={{ position: [0, 0, 4.2] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#52525b" />
                <GlowingOrb isAnalyzing={isAnalyzing} />
              </Canvas>
            ) : (
              <div className="w-[180px] h-[180px] rounded-full border border-white/5 bg-zinc-900/40 animate-pulse flex items-center justify-center relative">
                <div className="absolute inset-2 rounded-full border border-white/5 bg-white/5" />
              </div>
            )}
          </div>

          <div className="text-center z-10 mt-4">
            <div className="flex items-center gap-1.5 justify-center mb-1 text-xs uppercase tracking-widest font-mono text-zinc-400">
              <Brain className={`w-4 h-4 ${isAnalyzing ? "animate-spin text-white" : "text-zinc-500"}`} />
              <span>Grooming Core Engine</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-xs">
              {isAnalyzing 
                ? "Analyzing structural hair composition..." 
                : "Liquid R3F metal orb reacts to your styling choices."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORM & RESULTS */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-4 w-max">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">AI Consultations</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            AI Salon <span className="text-gradient-silver">Match</span>
          </h2>
          <p className="text-sm font-light text-zinc-400 max-w-xl mb-8 leading-relaxed">
            Skip the guesswork. Enter your hair characteristics and requirements below. Our neural styling model will compute the optimal salon matching in Chennai.
          </p>

          {!matchResult ? (
            <form onSubmit={handleMatchSubmit} className="glass-panel p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Hair Type */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Hair Structure</label>
                  <select 
                    value={hairType} 
                    onChange={(e) => setHairType(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Straight">Straight & Fine</option>
                    <option value="Wavy">Wavy & Textured</option>
                    <option value="Curly">Curly & Ringlets</option>
                    <option value="Coily">Coily & Thick</option>
                  </select>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Primary Service</label>
                  <select 
                    value={serviceType} 
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Cut">Precision Cut & Style</option>
                    <option value="Color">Bespoke Hair Coloring</option>
                    <option value="Spa">Revitalizing Hair Spa</option>
                    <option value="Facial">Dermatological Facial</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Budget tier</label>
                  <select 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Premium">Premium (Starts ₹1,200)</option>
                    <option value="Ultra">Ultra Luxury (Starts ₹1,500)</option>
                    <option value="Elite">Elite Reserve (Starts ₹2,000)</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Chennai Location</label>
                  <select 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Nungambakkam">Nungambakkam</option>
                    <option value="Adyar">Adyar</option>
                    <option value="ECR">ECR</option>
                    <option value="Anna Nagar">Anna Nagar</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full btn-premium flex items-center justify-center gap-2 cursor-pointer py-3"
              >
                {isAnalyzing ? "Synthesizing Match..." : "Compute Match"}
              </button>
            </form>
          ) : (
            <div className="glass-panel p-8 animate-fade-in border-white/15">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                    Match Confidence: {matchResult.confidence}%
                  </span>
                  <h3 className="text-3xl font-black uppercase text-white mt-3">
                    {matchResult.salon.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{matchResult.salon.location}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="border-t border-b border-white/5 py-4 my-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Personalized Grooming Advisory</span>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {matchResult.advice}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollBooking(matchResult.salon.id)}
                  className="flex-1 btn-premium text-xs uppercase tracking-widest font-bold cursor-pointer"
                >
                  Book Appointment Now
                </button>
                <button
                  onClick={() => setMatchResult(null)}
                  className="px-6 py-3 rounded-full border border-white/10 text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  Re-analyze
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle styling element */}
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full bg-zinc-800/5 glow-orb" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* BRAND INFO COLUMN */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, "#home")}
            className="flex items-center gap-2 w-max"
          >
            <span className="text-2xl font-black tracking-widest text-white uppercase">
              LUXE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </a>
          <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-sm">
            Chennai's premier startup-grade beauty and salon discovery platform. Bridging world-class styling boutiques with discerning clients through AI.
          </p>
          {/* Socials */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">Discovery</span>
          <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="text-xs text-zinc-500 hover:text-white transition-colors">Home Studio</a>
          <a href="#marketplace" onClick={(e) => handleScrollTo(e, "#marketplace")} className="text-xs text-zinc-500 hover:text-white transition-colors">Chennai Salons</a>
          <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="text-xs text-zinc-500 hover:text-white transition-colors">Bespoke Rituals</a>
          <a href="#ai-match" onClick={(e) => handleScrollTo(e, "#ai-match")} className="text-xs text-zinc-500 hover:text-white transition-colors">AI Matchmaker</a>
        </div>

        {/* CONTACT INFO */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">Concierge Access</span>
          
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <MapPin className="w-4 h-4 text-zinc-600 shrink-0" />
            <span>Khader Nawaz Khan Road, Nungambakkam, Chennai, TN 600006</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <Phone className="w-4 h-4 text-zinc-600 shrink-0" />
            <span>+91 44 4820 9000 (Mon - Sun, 9AM - 9PM)</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <Mail className="w-4 h-4 text-zinc-600 shrink-0" />
            <span>concierge@luxe-chennai.com</span>
          </div>
        </div>

      </div>

      {/* COPYRIGHT LEGAL */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[10px] text-zinc-600 font-mono">
          &copy; {new Date().getFullYear()} LUXE Tech Inc. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a href="#" className="text-[10px] text-zinc-600 hover:text-zinc-400 font-mono">Privacy Policy</a>
          <a href="#" className="text-[10px] text-zinc-600 hover:text-zinc-400 font-mono">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

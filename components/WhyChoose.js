"use client";

import React from "react";
import { ShieldAlert, Users, CreditCard, Zap, Sparkles, CalendarClock } from "lucide-react";

const BENEFITS = [
  {
    icon: ShieldAlert,
    title: "100% Verified Salons",
    desc: "Every partner salon undergoes deep sanitary checks, service quality evaluations, and aesthetic reviews."
  },
  {
    icon: Users,
    title: "Premium Professionals",
    desc: "Connect only with award-winning hair designers, certified color specialists, and elite makeup artists."
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    desc: "Browse official menu rates. No hidden upcharges, premium booking fees, or variable seat surcharges."
  },
  {
    icon: CalendarClock,
    title: "Zero Friction Booking",
    desc: "Skip account setup or passwords. Simply discover, select your dates, and submit a secure booking."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    desc: "Find styling studios tailored precisely to your facial shapes, hair density, and grooming requirements."
  },
  {
    icon: Zap,
    title: "Fast Confirmations",
    desc: "Direct digital queue link ensures your appointment request is acknowledged within minutes."
  }
];

export default function WhyChoose() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500 block mb-3">Our Core Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            Uncompromising <span className="text-gradient-silver">Quality</span>
          </h2>
          <p className="text-sm font-light text-zinc-400 max-w-md mx-auto leading-relaxed">
            LUXE is built around the modern client experience, combining aesthetic discovery with frictionless execution.
          </p>
        </div>

        {/* BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-8 flex flex-col items-start gap-4 transition-all duration-300 border border-white/5 hover:border-white/10"
              >
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

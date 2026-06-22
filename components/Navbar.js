"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Salons", href: "#marketplace" },
    { name: "Services", href: "#services" },
    { name: "AI Match", href: "#ai-match" },
    { name: "Reviews", href: "#reviews" },
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "glass-nav py-4 shadow-lg" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* BRAND LOGO */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollTo(e, "#home")}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl font-black tracking-widest text-white group-hover:opacity-85 transition-opacity uppercase">
            LUXE
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </a>

        {/* DESKTOP MENU ITEMS */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white font-medium transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* BOOK APPOINTMENT ACTION */}
        <div className="hidden md:block">
          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, "#booking")}
            className="btn-premium py-2 px-6 text-xs uppercase tracking-widest font-bold flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Book Now
          </a>
        </div>

        {/* MOBILE BURGER HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE FULLSCREEN OVERLAY MENU */}
      {isOpen && (
        <div className="fixed inset-0 top-[60px] w-full h-[calc(100vh-60px)] bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 px-6 md:hidden animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="text-lg uppercase tracking-widest text-zinc-400 hover:text-white font-bold transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, "#booking")}
            className="btn-premium py-3 w-full text-center text-xs uppercase tracking-widest font-bold flex justify-center items-center gap-2 mt-4"
          >
            <Sparkles className="w-4 h-4" />
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  );
}

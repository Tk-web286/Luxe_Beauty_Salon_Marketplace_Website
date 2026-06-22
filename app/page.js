import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero/HeroSection";
import MarketplaceSection from "../components/Marketplace/MarketplaceSection";
import ServicesSection from "../components/Services/ServicesSection";
import OrbMatch from "../components/AIMatch/OrbMatch";
import WhyChoose from "../components/WhyChoose";
import ReviewsSection from "../components/Reviews/ReviewsSection";
import BookingForm from "../components/Booking/BookingForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white w-full">
      {/* Dynamic Nav Header */}
      <Navbar />

      {/* Hero 3D Cinematic Showcase */}
      <main id="home" className="w-full relative">
        <HeroSection />
      </main>

      {/* Curated Salon Listings Marketplace */}
      <MarketplaceSection />

      {/* Featured Grooming Services Showcase */}
      <ServicesSection />

      {/* AI Salon Match Neural Diagnostics */}
      <OrbMatch />

      {/* Why Choose LUXE Value Propositions */}
      <WhyChoose />

      {/* Client Testimonials Cube Slider */}
      <ReviewsSection />

      {/* Premium Booking Request Concierge Form */}
      <BookingForm />

      {/* Legal & Brand Footer */}
      <Footer />
    </div>
  );
}

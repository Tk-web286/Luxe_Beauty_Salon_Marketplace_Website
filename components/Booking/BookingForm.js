"use client";

import React, { useState } from "react";
import { CalendarClock, Sparkles, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { saveBookingRequest } from "../../lib/firebase";
import { SALONS_DATA } from "../Marketplace/MarketplaceSection";

const SERVICES_OPTIONS = [
  { value: "precision-haircut", label: "Precision Haircut & Style" },
  { value: "beard-sculpting", label: "Signature Beard Sculpting" },
  { value: "hair-spa", label: "Cellular Hair Spa" },
  { value: "illuminating-facial", label: "Illuminating Facial" },
  { value: "bridal-makeup", label: "Bridal Editorial Makeup" },
  { value: "bespoke-coloring", label: "Bespoke Hair Coloring" },
  { value: "home-service", label: "Home Elite Beauty Service" }
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    salon: "luxe-nungambakkam",
    service: "precision-haircut",
    date: "",
    time: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await saveBookingRequest(formData);
      if (res.success) {
        setBookingId(res.id);
        setIsSuccess(true);
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          salon: "luxe-nungambakkam",
          service: "precision-haircut",
          date: "",
          time: "",
          notes: ""
        });
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 md:px-12 bg-black relative border-t border-zinc-900">
      {/* Glow highlight */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-zinc-800/10 glow-orb" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-4">
            <CalendarClock className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">Concierge Desk</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Reserve Your <span className="text-gradient-silver">Experience</span>
          </h2>
          <p className="text-sm font-light text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
            Select your preferences below. No signup required. Our styling concierge will contact you immediately to lock in your appointment.
          </p>
        </div>

        {/* BOOKING INTERFACE */}
        <div className="w-full max-w-2xl mx-auto">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 space-y-6">
              
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="booking-name" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="booking-name"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="booking-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                <input
                  type="email"
                  id="booking-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Salon and Service selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="booking-salon" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Select Salon Atelier</label>
                  <select
                    id="booking-salon"
                    name="salon"
                    value={formData.salon}
                    onChange={handleChange}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    {SALONS_DATA.map((salon) => (
                      <option key={salon.id} value={salon.id}>
                        {salon.name} ({salon.neighborhood})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-service" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Select Grooming Ritual</label>
                  <select
                    id="booking-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    {SERVICES_OPTIONS.map((srv) => (
                      <option key={srv.value} value={srv.value}>
                        {srv.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="booking-date" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    id="booking-date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="booking-time" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Preferred Time</label>
                  <select
                    id="booking-time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="">Select a slot</option>
                    <option value="10:00 AM">10:00 AM - Morning Slot</option>
                    <option value="11:30 AM">11:30 AM - Morning Slot</option>
                    <option value="01:00 PM">01:00 PM - Mid-day Slot</option>
                    <option value="03:00 PM">03:00 PM - Afternoon Slot</option>
                    <option value="04:30 PM">04:30 PM - Afternoon Slot</option>
                    <option value="06:00 PM">06:00 PM - Evening Slot</option>
                    <option value="07:30 PM">07:30 PM - Evening Slot</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="booking-notes" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Styling Notes (Optional)</label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Share any structural hair notes or special designer requests..."
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-premium flex items-center justify-center gap-2 cursor-pointer py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    Transmitting Request...
                  </>
                ) : (
                  <>
                    Submit Appointment Request
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="glass-panel p-8 md:p-12 text-center border-white/20 animate-fade-in flex flex-col items-center">
              {/* Checkmark Animation Container */}
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 animate-pulse">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h3 className="text-3xl font-black uppercase text-white mb-3">Request Transmitted</h3>
              <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-6">Booking Reference: {bookingId}</p>
              
              <p className="text-sm font-light text-zinc-300 max-w-md mx-auto leading-relaxed mb-8">
                Your reservation request has been registered in the LUXE queue. A personal styling concierge will reach out to your phone number within 15 minutes to confirm the appointment.
              </p>

              <button
                onClick={() => setIsSuccess(false)}
                className="btn-premium py-2.5 px-8 text-xs uppercase tracking-widest font-bold cursor-pointer"
              >
                Book Another Service
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

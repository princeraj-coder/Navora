"use client";

import React from "react";
import { HelpCircle, X, ShieldCheck, Sparkles, Navigation, Layers, Compass } from "lucide-react";
import { NavoraLogo } from "../NavoraLogo";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0D0F12] border border-[#26292D] rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#26292D]">
          <div className="flex items-center gap-3">
            <NavoraLogo size={36} withGlow={true} />
            <div>
              <h3 className="text-base font-bold text-white">About Navora Intelligence</h3>
              <p className="text-xs text-[#A5A5A5]">Platform Architecture & Guide</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-xs text-[#A5A5A5] leading-relaxed">
          <p>
            <strong className="text-white">Navora</strong> is an AI-powered travel intelligence platform combining high-resolution itinerary synthesis with real-world constraint validation.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#141619] border border-[#26292D]">
              <span className="font-semibold text-teal-300 block mb-1">
                1. Travel Reality Engine™
              </span>
              Unlike standard conversational chatbots that generate unvalidated lists, Navora continuously runs real-time checks on transit travel times, timed entry ticket slots, and geographic viability.
            </div>

            <div className="p-3.5 rounded-2xl bg-[#141619] border border-[#26292D]">
              <span className="font-semibold text-teal-300 block mb-1">
                2. Unified Travel Search
              </span>
              Flights, accommodations, experiences, and transit mobility are queried together to prevent disjointed planning.
            </div>

            <div className="p-3.5 rounded-2xl bg-[#141619] border border-[#26292D]">
              <span className="font-semibold text-teal-300 block mb-1">
                3. Collaborative Group Engine
              </span>
              Share plans with travel companions, conduct democratic activity votes, and split shared costs without messy spreadsheets.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-200">
            <strong>Architecture:</strong> Next.js 16 App Router, TypeScript, Tailwind CSS, Lucide Icons. Supabase & live GDS ready.
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#26292D]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

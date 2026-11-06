"use client";

import React, { useState } from "react";
import {
  Plane,
  Building2,
  MapPin,
  Navigation,
  Wallet,
  Bot,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { NavigationTab } from "../../types";

interface HomeDashboardProps {
  onNavigate: (tab: NavigationTab) => void;
  onRunAIPrompt: (prompt: string) => void;
  onOpenSearchCategory: (category: "flight" | "hotel" | "experience" | "transport") => void;
  savedTripsCount: number;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onRunAIPrompt,
  onOpenSearchCategory,
  savedTripsCount,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const suggestedPrompts = [
    "Plan a 5-day trip to Japan",
    "Find affordable destinations",
    "Explore Europe this summer",
    "Plan a weekend getaway",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onRunAIPrompt(searchInput);
  };

  const featureCards = [
    {
      id: "flights",
      title: "Flights",
      subtitle: "Compare travel options",
      icon: Plane,
      action: () => onOpenSearchCategory("flight"),
      badge: "Real-time routing",
    },
    {
      id: "hotels",
      title: "Hotels",
      subtitle: "Accommodation choices",
      icon: Building2,
      action: () => onOpenSearchCategory("hotel"),
      badge: "Curated stays",
    },
    {
      id: "experiences",
      title: "Experiences",
      subtitle: "Attractions and activities",
      icon: MapPin,
      action: () => onOpenSearchCategory("experience"),
      badge: "Local gems",
    },
    {
      id: "transport",
      title: "Transport",
      subtitle: "Routes and local mobility",
      icon: Navigation,
      action: () => onOpenSearchCategory("transport"),
      badge: "Integrated transit",
    },
    {
      id: "budget",
      title: "Budget",
      subtitle: "Complete cost estimates",
      icon: Wallet,
      action: () => onNavigate("budget"),
      badge: "Smart tracking",
    },
    {
      id: "ai-assistant",
      title: "AI assistant",
      subtitle: "Personalized coordination",
      icon: Bot,
      action: () => onNavigate("planner"),
      badge: "Reality Engine",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Header Section */}
      <div className="relative pt-2 pb-4 text-center max-w-3xl mx-auto space-y-4">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111315] border border-[#26292D] text-xs font-medium text-teal-400 mb-1">
          <Sparkles size={13} className="text-teal-400" />
          <span>Next-Generation Travel Intelligence</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5F5F5] leading-tight sm:leading-none">
          Your next journey starts here.
        </h1>
        <p className="text-base sm:text-lg text-[#A5A5A5] max-w-2xl mx-auto font-normal leading-relaxed">
          Everything you need to discover, plan and experience your next adventure.
        </p>

        {/* Prominent AI Search Input */}
        <div className="pt-2 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center w-full bg-[#111315] hover:bg-[#16181B] border border-[#26292D] focus-within:border-teal-500/60 focus-within:ring-2 focus-within:ring-teal-500/20 rounded-2xl p-2 transition-all duration-200 shadow-xl"
          >
            <div className="pl-3 pr-2 text-teal-400">
              <Sparkles size={18} />
            </div>

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Where would you like to go? (e.g., 6 days in Japan under ₹1.5L)"
              className="flex-1 bg-transparent border-none text-[#F5F5F5] placeholder-[#6B7280] text-sm sm:text-base focus:outline-none px-2"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_15px_-3px_rgba(45,212,191,0.4)] cursor-pointer"
            >
              <span>Generate</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Suggested Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-[#6B7280] font-medium mr-1">Suggested:</span>
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setSearchInput(prompt);
                  onRunAIPrompt(prompt);
                }}
                className="px-3 py-1.5 rounded-full bg-[#111315] hover:bg-[#16181B] border border-[#26292D] hover:border-teal-500/40 text-[#A5A5A5] hover:text-[#F5F5F5] transition-all duration-150 cursor-pointer text-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Feature Panel — Inspired directly by the reference screenshot */}
      <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#07080A] border border-[#26292D] p-6 sm:p-12 shadow-2xl overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#1A1D20]/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F5F5]">
              The integration opportunity
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A5A5] mt-1">
              Coordinated travel intelligence across logistics, accommodations, and itinerary logistics.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#A5A5A5] bg-[#111315] px-3 py-1.5 rounded-full border border-[#26292D]">
            <ShieldCheck size={14} className="text-teal-400" />
            <span>Reality Engine Verified</span>
          </div>
        </div>

        {/* Two-Column Feature Grid (Exactly echoing the reference screenshot layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 py-10 sm:py-14">
          {featureCards.map((card) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={card.action}
                className={`group relative flex items-start gap-4 sm:gap-5 p-5 rounded-2xl bg-[#0D0F12]/60 hover:bg-[#111315] border transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? "border-teal-500/40 shadow-[0_0_25px_-5px_rgba(45,212,191,0.15)] translate-x-1"
                    : "border-[#1E2125] hover:border-[#2D3137]"
                }`}
              >
                {/* Minimal Outline Icon */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                    isHovered
                      ? "bg-teal-500/10 text-teal-400 border border-teal-500/30"
                      : "bg-[#141619] text-[#F5F5F5] border border-[#26292D] group-hover:text-teal-400"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-[#F5F5F5] group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                    <span className="text-[11px] font-medium text-[#6B7280] group-hover:text-teal-400 transition-colors flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A5A5A5] mt-1 group-hover:text-[#C5C5C5] transition-colors">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Tagline matching screenshot */}
        <div className="pt-6 border-t border-[#1A1D20]/80 text-center">
          <p className="text-base sm:text-lg font-medium tracking-wide text-[#F5F5F5] flex items-center justify-center gap-2">
            <span>One coordinated travel experience</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          </p>
          <p className="text-xs text-[#6B7280] mt-1">
            Navora unifies live transit corridors, ticket slots, and currency realities into a singular smart flow.
          </p>
        </div>
      </div>

      {/* Quick Launch & Active Trip Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Itinerary Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D0F12] border border-[#26292D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Active Itinerary In Progress
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-medium">
                1 Reality Conflict Found
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F5]">
              6-Day Japan Cultural & Gastronomic Expedition
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A5A5] mt-1">
              Tokyo (Shinjuku, Asakusa, Shibuya) & Kyoto (Gion, Fushimi Inari, Arashiyama) • 2 Travellers • Budget ₹1,50,000
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-xs">
              <div className="p-2.5 rounded-xl bg-[#141619] border border-[#26292D]">
                <span className="text-[#6B7280] block text-[11px]">Feasibility</span>
                <span className="font-semibold text-teal-400 text-sm">96% Feasible</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#141619] border border-[#26292D]">
                <span className="text-[#6B7280] block text-[11px]">Schedule</span>
                <span className="font-semibold text-white text-sm">6 Days / 17 Stops</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#141619] border border-[#26292D] col-span-2 sm:col-span-1">
                <span className="text-[#6B7280] block text-[11px]">Budget Utilized</span>
                <span className="font-semibold text-white text-sm">₹83,800 / ₹1.5L</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 mt-4 border-t border-[#1F2226]">
            <span className="text-xs text-[#A5A5A5]">
              Ready for schedule validation & transit optimization
            </span>
            <button
              onClick={() => onNavigate("planner")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#16181B] hover:bg-[#1E2226] border border-teal-500/40 text-teal-400 font-medium text-xs transition-colors cursor-pointer"
            >
              <span>Open in Planner</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Fast Action Card */}
        <div className="p-6 rounded-2xl bg-[#0D0F12] border border-[#26292D] flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-base font-bold text-[#F5F5F5]">
              Explore Curated Destinations
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A5A5] mt-1.5 leading-relaxed">
              Browse hand-picked destinations across Japan, the Amalfi Coast, Iceland, and the Swiss Alps with real seasonal metrics.
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-[#1F2226] flex items-center justify-between">
            <span className="text-xs text-[#6B7280]">
              {savedTripsCount} Saved destinations
            </span>
            <button
              onClick={() => onNavigate("discover")}
              className="flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

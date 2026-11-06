"use client";

import React, { useState } from "react";
import {
  Plane,
  Building2,
  MapPin,
  Navigation,
  Calendar,
  Users,
  SlidersHorizontal,
  ArrowUpDown,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Check,
  Plus,
} from "lucide-react";
import { SearchResultItem, Currency } from "../../types";

interface SmartSearchViewProps {
  initialCategory?: "flight" | "hotel" | "experience" | "transport";
  results: SearchResultItem[];
  currency: Currency;
  currencyRate: number;
  onAddToItinerary: (item: SearchResultItem) => void;
}

export const SmartSearchView: React.FC<SmartSearchViewProps> = ({
  initialCategory = "flight",
  results,
  currency,
  currencyRate,
  onAddToItinerary,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "flight" | "hotel" | "experience" | "transport"
  >(initialCategory);

  const [origin, setOrigin] = useState("Delhi (DEL)");
  const [destination, setDestination] = useState("Tokyo (HND/NRT)");
  const [travelDates, setTravelDates] = useState("Nov 12 — Nov 17, 2026");
  const [passengers, setPassengers] = useState(2);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "default">("default");
  const [dealModalItem, setDealModalItem] = useState<SearchResultItem | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const formatPrice = (inrAmount: number) => {
    // In mock data, price is stored in INR
    const inrToUsdRate = 1 / 84.5;
    const usd = inrAmount * inrToUsdRate;
    const converted = Math.round(usd * currencyRate);

    if (currency === "INR") return `₹${inrAmount.toLocaleString("en-IN")}`;
    if (currency === "EUR") return `€${converted.toLocaleString()}`;
    if (currency === "GBP") return `£${converted.toLocaleString()}`;
    if (currency === "JPY") return `¥${converted.toLocaleString()}`;
    return `$${converted.toLocaleString()}`;
  };

  const filteredResults = results
    .filter((item) => item.type === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const handleAdd = (item: SearchResultItem) => {
    onAddToItinerary(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-[#26292D] pb-3">
        {[
          { id: "flight", label: "Flights", icon: Plane },
          { id: "hotel", label: "Hotels & Stays", icon: Building2 },
          { id: "experience", label: "Activities & Tours", icon: MapPin },
          { id: "transport", label: "Ground Transport", icon: Navigation },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-[0_0_15px_-3px_rgba(45,212,191,0.25)]"
                  : "text-[#A5A5A5] hover:text-white hover:bg-[#111315] border border-transparent"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Unified Search Filter Controls */}
      <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#26292D] space-y-4 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Origin */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#A5A5A5]">Origin / Location</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-[#141619] border border-[#26292D] focus:border-teal-500/60 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none"
            />
          </div>

          {/* Destination */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#A5A5A5]">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#141619] border border-[#26292D] focus:border-teal-500/60 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none"
            />
          </div>

          {/* Dates */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#A5A5A5]">Travel Dates</label>
            <div className="flex items-center gap-2 bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-xs text-white">
              <Calendar size={14} className="text-teal-400" />
              <input
                type="text"
                value={travelDates}
                onChange={(e) => setTravelDates(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Guests / Travellers */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#A5A5A5]">
              {selectedCategory === "hotel" ? "Guests / Rooms" : "Passengers"}
            </label>
            <div className="flex items-center justify-between bg-[#141619] border border-[#26292D] rounded-xl px-3 py-1.5 text-xs text-white">
              <span className="flex items-center gap-2">
                <Users size={14} className="text-teal-400" />
                <span>{passengers} Travellers</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-5 h-5 rounded bg-[#1C1F23] hover:bg-neutral-700 flex items-center justify-center text-xs"
                >
                  -
                </button>
                <button
                  onClick={() => setPassengers(passengers + 1)}
                  className="w-5 h-5 rounded bg-[#1C1F23] hover:bg-neutral-700 flex items-center justify-center text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sort & Freshness Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1C1F23] text-xs">
          <div className="flex items-center gap-2">
            <ArrowUpDown size={13} className="text-[#A5A5A5]" />
            <span className="text-[#A5A5A5]">Sort by:</span>
            <button
              onClick={() => setSortBy("default")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                sortBy === "default"
                  ? "bg-neutral-800 text-teal-400 font-semibold"
                  : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              Recommended
            </button>
            <button
              onClick={() => setSortBy("price")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                sortBy === "price"
                  ? "bg-neutral-800 text-teal-400 font-semibold"
                  : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              Lowest Price
            </button>
            <button
              onClick={() => setSortBy("rating")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                sortBy === "rating"
                  ? "bg-neutral-800 text-teal-400 font-semibold"
                  : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              Highest Rated
            </button>
          </div>

          <div className="text-[#6B7280] text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Simulated live inventory & cached GDS feeds</span>
          </div>
        </div>
      </div>

      {/* Demo Data Disclaimer Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111315] border border-amber-500/20 text-xs text-neutral-300">
        <ShieldAlert size={16} className="text-amber-400 shrink-0" />
        <p>
          <strong className="text-amber-300 font-medium">Demo Data Notice:</strong> Real-time fares and availability are simulated for demonstration. Live API integrations with Amadeus/Skyscanner are Supabase/API-ready.
        </p>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0D0F12] border border-[#222529] hover:border-teal-500/40 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
          >
            {/* Left Info */}
            <div className="space-y-2.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-teal-400">
                  {item.provider}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    {item.badge}
                  </span>
                )}
                <span className="text-[11px] text-[#6B7280] ml-auto md:ml-2">
                  {item.lastUpdated}
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#F5F5F5] group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#A5A5A5] mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              {/* Detail Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                {item.details.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#141619] border border-[#26292D]"
                  >
                    <span className="block text-[10px] text-[#6B7280]">
                      {d.label}
                    </span>
                    <span className="font-medium text-neutral-200 truncate block">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Price & Actions */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#1C1F23]">
              <div className="text-left md:text-right">
                <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block">
                  Total Estimate
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-white">
                  {formatPrice(item.price)}
                </span>
                {item.rating && (
                  <div className="flex items-center gap-1 text-xs text-amber-300 md:justify-end mt-0.5">
                    <span>★ {item.rating.toFixed(2)}</span>
                    <span className="text-[#6B7280] text-[11px]">
                      ({item.reviewsCount} reviews)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDealModalItem(item)}
                  className="px-3 py-2 rounded-xl bg-[#16181B] hover:bg-[#1E2226] border border-[#26292D] text-xs font-semibold text-neutral-200 hover:text-white transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleAdd(item)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    addedIds[item.id]
                      ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                      : "bg-teal-500 hover:bg-teal-400 text-black shadow-[0_0_12px_rgba(45,212,191,0.25)]"
                  }`}
                >
                  {addedIds[item.id] ? (
                    <>
                      <Check size={14} />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Add to Trip</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deal Details Modal */}
      {dealModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0D0F12] border border-[#26292D] rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#26292D]">
              <div>
                <span className="text-xs font-semibold text-teal-400 uppercase">
                  {dealModalItem.provider}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {dealModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setDealModalItem(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
              {dealModalItem.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {dealModalItem.details.map((d, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#141619] border border-[#26292D]"
                >
                  <span className="text-[10px] text-[#6B7280] block font-medium">
                    {d.label}
                  </span>
                  <span className="text-neutral-200 font-semibold mt-0.5 block">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-neutral-300">
              <span className="font-semibold text-teal-300 block mb-1">
                Data Verification Source
              </span>
              {dealModalItem.source} • Authenticated with Navora Travel Intelligence Engine.
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#26292D]">
              <div>
                <span className="text-[10px] text-[#6B7280] block">Price</span>
                <span className="text-2xl font-black text-white">
                  {formatPrice(dealModalItem.price)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDealModalItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#16181B] text-xs text-neutral-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleAdd(dealModalItem);
                    setDealModalItem(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-teal-500/20"
                >
                  <Plus size={14} />
                  <span>Add to Trip Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

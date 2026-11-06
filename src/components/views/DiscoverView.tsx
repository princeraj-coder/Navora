"use client";

import React, { useState } from "react";
import {
  Search,
  Heart,
  Compass,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  MapPin,
  CloudSun,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { Destination, Currency } from "../../types";

interface DiscoverViewProps {
  destinations: Destination[];
  onToggleSave: (id: string) => void;
  onPlanTripForDestination: (dest: Destination) => void;
  currency: Currency;
  currencyRate: number;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  destinations,
  onToggleSave,
  onPlanTripForDestination,
  currency,
  currencyRate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const categories = [
    { id: "all", label: "All Destinations" },
    { id: "trending", label: "Trending" },
    { id: "popular", label: "Popular Countries" },
    { id: "hidden_gem", label: "Hidden Gems" },
    { id: "nature", label: "Nature Escapes" },
    { id: "culture", label: "Cultural" },
    { id: "food", label: "Food Destinations" },
    { id: "weekend", label: "Weekend Getaways" },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      dest.categories.includes(activeCategory as any);

    return matchesSearch && matchesCategory;
  });

  const formatPrice = (usdAmount: number) => {
    const converted = Math.round(usdAmount * currencyRate);
    if (currency === "INR") return `₹${converted.toLocaleString("en-IN")}`;
    if (currency === "EUR") return `€${converted.toLocaleString()}`;
    if (currency === "GBP") return `£${converted.toLocaleString()}`;
    if (currency === "JPY") return `¥${converted.toLocaleString()}`;
    return `$${converted.toLocaleString()}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, country, or region..."
            className="w-full bg-[#111315] border border-[#26292D] focus:border-teal-500/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#6B7280] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5A5A5] hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="text-xs text-[#A5A5A5]">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredDestinations.length}
          </span>{" "}
          hand-curated destinations
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-[0_0_12px_-2px_rgba(45,212,191,0.3)]"
                : "bg-[#111315] text-[#A5A5A5] hover:text-[#F5F5F5] border border-[#26292D] hover:bg-[#16181B]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-16 bg-[#111315] rounded-2xl border border-[#26292D] p-8">
          <Compass size={36} className="mx-auto text-neutral-600 mb-3" />
          <h3 className="text-base font-semibold text-white">No destinations found</h3>
          <p className="text-xs text-[#A5A5A5] mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or explore another filter category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-medium hover:bg-teal-500/20 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl bg-[#0F1113] border border-[#222529] hover:border-teal-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_20px_-5px_rgba(45,212,191,0.15)]"
            >
              {/* Image & Badges */}
              <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1113] via-transparent to-black/30" />

                {/* Country Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white">
                  {dest.country}
                </div>

                {/* Save Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(dest.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    dest.isSaved
                      ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                      : "bg-black/50 text-[#A5A5A5] hover:text-white border border-white/10 hover:bg-black/80"
                  }`}
                  aria-label="Save Destination"
                >
                  <Heart
                    size={16}
                    fill={dest.isSaved ? "currentColor" : "none"}
                  />
                </button>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-white/10">
                  <span>★</span>
                  <span>{dest.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-teal-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-[#A5A5A5] mt-1.5 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="space-y-2 pt-2 border-t border-[#1C1F23]">
                  <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-teal-400" />
                      <span>Best time:</span>
                    </span>
                    <span className="text-neutral-300 font-medium">
                      {dest.bestTimeToVisit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={13} className="text-teal-400" />
                      <span>Est. budget:</span>
                    </span>
                    <span className="text-neutral-200 font-semibold">
                      {formatPrice(dest.estimatedBudget.min)} –{" "}
                      {formatPrice(dest.estimatedBudget.max)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#16181B] hover:bg-[#1E2226] border border-[#26292D] text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onPlanTripForDestination(dest)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-xs font-semibold text-teal-300 transition-colors cursor-pointer"
                    title="Generate Itinerary with AI"
                  >
                    <Sparkles size={13} />
                    <span>Plan Trip</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Detailed Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0D0F12] border border-[#26292D] rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Image Header */}
            <div className="relative h-64 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-black/40 to-black/20" />

              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-neutral-300 hover:text-white border border-white/10"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold">
                  {selectedDestination.country}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedDestination.name}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <p className="text-sm text-[#A5A5A5] leading-relaxed">
                {selectedDestination.description}
              </p>

              {/* Highlights & Weather Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#141619] border border-[#26292D] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                    <CloudSun size={15} />
                    <span>Climate & Seasonal Reality</span>
                  </div>
                  <div className="text-sm text-white font-medium">
                    {selectedDestination.weather.temp} • {selectedDestination.weather.condition}
                  </div>
                  <div className="text-xs text-[#A5A5A5]">
                    Current season: {selectedDestination.weather.season}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141619] border border-[#26292D] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                    <DollarSign size={15} />
                    <span>Estimated Budget Range</span>
                  </div>
                  <div className="text-sm text-white font-semibold">
                    {formatPrice(selectedDestination.estimatedBudget.min)} –{" "}
                    {formatPrice(selectedDestination.estimatedBudget.max)}
                  </div>
                  <div className="text-xs text-[#A5A5A5]">
                    Includes mid-tier stays, transit & dining for 5–7 days
                  </div>
                </div>
              </div>

              {/* Must-Visit Spots */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A5A5A5] mb-2.5">
                  Must-Experience Landmarks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.highlightSpots.map((spot) => (
                    <span
                      key={spot}
                      className="px-3 py-1.5 rounded-lg bg-[#141619] border border-[#26292D] text-xs text-neutral-200 flex items-center gap-1.5"
                    >
                      <MapPin size={12} className="text-teal-400" />
                      <span>{spot}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1C1F23]">
                <button
                  onClick={() => onToggleSave(selectedDestination.id)}
                  className="flex items-center gap-2 text-xs text-[#A5A5A5] hover:text-white"
                >
                  <Heart
                    size={16}
                    fill={selectedDestination.isSaved ? "currentColor" : "none"}
                    className={selectedDestination.isSaved ? "text-rose-500" : ""}
                  />
                  <span>
                    {selectedDestination.isSaved ? "Saved to Favorites" : "Save for later"}
                  </span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDestination(null)}
                    className="px-4 py-2 rounded-xl bg-[#16181B] hover:bg-[#1E2226] text-xs font-semibold text-neutral-300 hover:text-white border border-[#26292D]"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const dest = selectedDestination;
                      setSelectedDestination(null);
                      onPlanTripForDestination(dest);
                    }}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-teal-500/20"
                  >
                    <Sparkles size={14} />
                    <span>Plan Trip with AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

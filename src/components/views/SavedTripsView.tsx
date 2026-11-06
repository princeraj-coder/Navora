"use client";

import React from "react";
import {
  Bookmark,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  Heart,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Itinerary, Destination, Currency } from "../../types";

interface SavedTripsViewProps {
  itinerary: Itinerary;
  savedDestinations: Destination[];
  currency: Currency;
  currencyRate: number;
  onOpenItinerary: () => void;
  onRemoveSavedDestination: (id: string) => void;
  onDuplicateItinerary: () => void;
}

export const SavedTripsView: React.FC<SavedTripsViewProps> = ({
  itinerary,
  savedDestinations,
  currency,
  currencyRate,
  onOpenItinerary,
  onRemoveSavedDestination,
  onDuplicateItinerary,
}) => {
  const formatPrice = (inrAmount: number) => {
    const inrToUsdRate = 1 / 84.5;
    const usd = inrAmount * inrToUsdRate;
    const converted = Math.round(usd * currencyRate);

    if (currency === "INR") return `₹${inrAmount.toLocaleString("en-IN")}`;
    if (currency === "EUR") return `€${converted.toLocaleString()}`;
    if (currency === "GBP") return `£${converted.toLocaleString()}`;
    if (currency === "JPY") return `¥${converted.toLocaleString()}`;
    return `$${converted.toLocaleString()}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-[#0D0F12] border border-[#26292D] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Bookmark size={15} className="text-teal-400" />
          <span className="text-xs font-semibold text-teal-400">
            Saved Journeys Vault
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Your Saved Itineraries & Favorite Destinations
        </h2>
        <p className="text-xs sm:text-sm text-[#A5A5A5] mt-1">
          Access your synthesized itineraries, duplicate variants, or review bookmarked destination wishlists.
        </p>
      </div>

      {/* Primary Saved Itinerary Card */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#A5A5A5]">
          Active Planned Itineraries
        </h3>

        <div className="p-6 rounded-3xl bg-[#090B0D] border border-teal-500/40 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Ready to Travel
                </span>
                <span className="text-xs text-[#A5A5A5]">
                  {itinerary.days.length} Days • {itinerary.travelersCount} Travellers
                </span>
              </div>

              <h4 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                {itinerary.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#A5A5A5] flex items-center gap-3">
                <span className="flex items-center gap-1 text-teal-400">
                  <MapPin size={13} />
                  <span>{itinerary.destination}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>Nov 12 – Nov 17, 2026</span>
                </span>
                <span>•</span>
                <span className="font-semibold text-white">
                  Budget: {formatPrice(itinerary.totalBudget)}
                </span>
              </p>

              {/* Day badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {itinerary.days.map((d) => (
                  <span
                    key={d.dayNumber}
                    className="px-2.5 py-1 rounded-lg bg-[#141619] border border-[#26292D] text-[11px] text-neutral-300"
                  >
                    Day {d.dayNumber}: {d.city}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-row lg:flex-col items-center gap-2 shrink-0">
              <button
                onClick={onOpenItinerary}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Open in Planner</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onDuplicateItinerary}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#141619] hover:bg-[#1C1F23] border border-[#26292D] text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <Copy size={13} />
                <span>Duplicate Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Destinations Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#A5A5A5]">
          Bookmarked Destinations ({savedDestinations.length})
        </h3>

        {savedDestinations.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0D0F12] border border-[#26292D] text-center text-xs text-[#A5A5A5]">
            No bookmarked destinations yet. Browse the Discover tab to save places.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedDestinations.map((dest) => (
              <div
                key={dest.id}
                className="rounded-2xl bg-[#0D0F12] border border-[#26292D] overflow-hidden flex flex-col justify-between group hover:border-teal-500/40 transition-all"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] to-transparent" />

                  <button
                    onClick={() => onRemoveSavedDestination(dest.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-rose-500 text-white transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="absolute bottom-2 left-3">
                    <span className="text-[11px] font-medium text-teal-400">
                      {dest.country}
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {dest.name}
                    </h4>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-[#A5A5A5] line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#6B7280] pt-2 border-t border-[#1C1F23]">
                    <span>Best: {dest.bestTimeToVisit}</span>
                    <span className="text-white font-semibold">
                      ★ {dest.rating.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

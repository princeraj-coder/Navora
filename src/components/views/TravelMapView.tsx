"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Compass,
  Building2,
  Utensils,
  Eye,
  Star,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { MapMarkerItem } from "../../types";

interface TravelMapViewProps {
  markers: MapMarkerItem[];
  onSelectMarkerInPlanner?: (dayNumber?: number) => void;
}

export const TravelMapView: React.FC<TravelMapViewProps> = ({
  markers,
  onSelectMarkerInPlanner,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerItem | null>(
    markers[0] || null
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeCity, setActiveCity] = useState<"all" | "Tokyo" | "Kyoto">("all");

  const filteredMarkers = markers.filter((m) => {
    const matchesCat =
      filterCategory === "all" || m.category === filterCategory;
    const matchesCity = activeCity === "all" || m.city === activeCity;
    return matchesCat && matchesCity;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Map Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D0F12] border border-[#26292D]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveCity("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeCity === "all"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                : "text-[#A5A5A5] hover:text-white"
            }`}
          >
            All Corridors ({markers.length})
          </button>
          <button
            onClick={() => setActiveCity("Tokyo")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeCity === "Tokyo"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                : "text-[#A5A5A5] hover:text-white"
            }`}
          >
            Tokyo Metro
          </button>
          <button
            onClick={() => setActiveCity("Kyoto")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeCity === "Kyoto"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                : "text-[#A5A5A5] hover:text-white"
            }`}
          >
            Kyoto Heritage
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: "all", label: "All Pins" },
            { id: "attraction", label: "Attractions" },
            { id: "hotel", label: "Hotels" },
            { id: "restaurant", label: "Food & Dining" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat.id
                  ? "bg-neutral-800 text-teal-400 font-semibold"
                  : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Center Visual Canvas */}
        <div className="lg:col-span-2 relative h-[520px] rounded-3xl bg-[#08090B] border border-[#26292D] overflow-hidden shadow-2xl flex flex-col justify-between p-6 select-none">
          {/* Subtle Grid Map Background Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#2DD4BF 0.75px, transparent 0.75px), radial-gradient(#26292D 0.75px, #08090B 0.75px)",
              backgroundSize: "30px 30px",
              backgroundPosition: "0 0, 15px 15px",
            }}
          />

          {/* Simulated Geographic Contours & Transit Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {/* Shinkansen bullet train high-speed transit line */}
            <path
              d="M 120 180 Q 240 260 420 330 T 640 400"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
            {/* Tokyo inner subway loops */}
            <circle
              cx="190"
              cy="180"
              r="70"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Kyoto heritage loop */}
            <circle
              cx="520"
              cy="340"
              r="60"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Top Canvas HUD */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111315]/90 backdrop-blur-md border border-[#26292D] text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Interactive Transit Corridor Map • Live Demo</span>
            </div>

            <div className="text-[11px] text-[#A5A5A5] bg-[#111315]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#26292D]">
              Coordinates: 35.6762° N, 139.6503° E
            </div>
          </div>

          {/* Interactive Pins on Canvas */}
          <div className="relative z-10 w-full h-full my-auto flex items-center justify-around flex-wrap gap-6 py-6">
            {filteredMarkers.map((marker, index) => {
              const isSelected = selectedMarker?.id === marker.id;
              return (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker)}
                  className={`group relative flex flex-col items-center transition-all duration-300 cursor-pointer ${
                    isSelected ? "scale-110 z-30" : "hover:scale-105 z-20"
                  }`}
                  style={{
                    transform: `translate(${((index * 37) % 70) - 35}px, ${((index * 53) % 80) - 40}px)`,
                  }}
                >
                  {/* Pin Bubble */}
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-xl transition-all ${
                      isSelected
                        ? "bg-teal-500 text-black border-white shadow-[0_0_20px_#2DD4BF]"
                        : "bg-[#111315] text-[#F5F5F5] border-[#26292D] group-hover:border-teal-400"
                    }`}
                  >
                    <MapPin size={13} className={isSelected ? "text-black" : "text-teal-400"} />
                    <span className="text-xs font-bold truncate max-w-[110px]">
                      {marker.title}
                    </span>
                    {marker.dayAssigned && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                          isSelected
                            ? "bg-black text-teal-300"
                            : "bg-teal-500/20 text-teal-300"
                        }`}
                      >
                        D{marker.dayAssigned}
                      </span>
                    )}
                  </div>

                  {/* Pulsing base dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1 border-2 border-[#050505] transition-all ${
                      isSelected
                        ? "bg-teal-400 shadow-[0_0_12px_#2DD4BF]"
                        : "bg-neutral-600 group-hover:bg-teal-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Bottom Map Info */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#A5A5A5] pt-3 border-t border-[#1C1F23]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-teal-400 inline-block" />
                <span>Bullet Train Link</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-sky-400 inline-block" />
                <span>Tokyo Subways</span>
              </span>
            </div>
            <span>Click any marker to inspect destination intelligence</span>
          </div>
        </div>

        {/* Right Detail Card for Selected Pin */}
        <div className="space-y-4">
          {selectedMarker ? (
            <div className="p-6 rounded-3xl bg-[#0D0F12] border border-[#26292D] space-y-4 shadow-xl">
              {/* Photo Preview */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedMarker.image}
                  alt={selectedMarker.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] font-semibold text-teal-400 border border-white/10">
                    {selectedMarker.city} • Day {selectedMarker.dayAssigned}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/10">
                    ★ {selectedMarker.rating.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Title & Info */}
              <div>
                <h4 className="text-lg font-bold text-white">
                  {selectedMarker.title}
                </h4>
                <p className="text-xs text-[#A5A5A5] mt-1 leading-relaxed">
                  {selectedMarker.shortInfo}
                </p>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-[#141619] border border-[#26292D]">
                  <span className="text-[10px] text-[#6B7280] block">Category</span>
                  <span className="font-semibold text-white capitalize">
                    {selectedMarker.category}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#141619] border border-[#26292D]">
                  <span className="text-[10px] text-[#6B7280] block">Price Tier</span>
                  <span className="font-semibold text-teal-400">
                    {selectedMarker.priceLevel}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectMarkerInPlanner?.(selectedMarker.dayAssigned)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-teal-500/20 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Inspect in Day {selectedMarker.dayAssigned} Itinerary</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#0D0F12] border border-[#26292D] text-center text-[#A5A5A5] text-xs">
              Select a marker on the map to see details.
            </div>
          )}

          {/* Nearby Live Intelligence Tips */}
          <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#26292D] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
              <Info size={14} />
              <span>Local Transit Companion Tip</span>
            </div>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              In Tokyo, keep your physical or digital Suica/Pasmo tapped for gate exits. In Kyoto, city buses accept IC cards but the subway is faster during afternoon rush hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

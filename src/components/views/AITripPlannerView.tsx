"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Calendar,
  Users,
  Wallet,
  Clock,
  MapPin,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit3,
  Share2,
  Bookmark,
  Check,
  RefreshCw,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Ticket,
  Sliders,
  DollarSign,
  Coffee,
  Utensils,
  Sun,
  Sunset,
  Moon,
  ChevronRight,
} from "lucide-react";
import { Itinerary, Activity, Currency, ActivityTimeSlot } from "../../types";
import { TravelRealityEngine } from "./TravelRealityEngine";

interface AITripPlannerViewProps {
  itinerary: Itinerary;
  currency: Currency;
  currencyRate: number;
  onUpdateItinerary: (newItin: Itinerary) => void;
  onSaveItinerary: () => void;
  onShareItinerary: () => void;
  onApplyRealityFix: (checkId: string) => void;
}

export const AITripPlannerView: React.FC<AITripPlannerViewProps> = ({
  itinerary,
  currency,
  currencyRate,
  onUpdateItinerary,
  onSaveItinerary,
  onShareItinerary,
  onApplyRealityFix,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [showConfig, setShowConfig] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivitySlot, setNewActivitySlot] = useState<ActivityTimeSlot>("afternoon");
  const [showRealityEngineTab, setShowRealityEngineTab] = useState(false);

  // Planner Config State
  const [destinationInput, setDestinationInput] = useState(itinerary.destination);
  const [travelersCount, setTravelersCount] = useState(itinerary.travelersCount);
  const [budgetInput, setBudgetInput] = useState(itinerary.totalBudget);
  const [paceInput, setPaceInput] = useState(itinerary.pace);
  const [interests, setInterests] = useState<string[]>(itinerary.interests);

  const availableInterests = [
    "Food",
    "Culture",
    "Architecture",
    "Photography",
    "Shopping",
    "Nature",
    "Adventure",
    "Nightlife",
  ];

  const currentDay = itinerary.days.find((d) => d.dayNumber === selectedDayNumber) || itinerary.days[0];

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

  const handleToggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleGenerateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowConfig(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#2DD4BF", "#14B8A6", "#F5F5F5"],
      });
    }, 1200);
  };

  // Activity reordering
  const handleMoveActivity = (index: number, direction: "up" | "down") => {
    const newActivities = [...currentDay.activities];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newActivities.length) return;

    const temp = newActivities[index];
    newActivities[index] = newActivities[targetIndex];
    newActivities[targetIndex] = temp;

    const updatedDays = itinerary.days.map((d) =>
      d.dayNumber === selectedDayNumber ? { ...d, activities: newActivities } : d
    );
    onUpdateItinerary({ ...itinerary, days: updatedDays });
  };

  // Activity removal
  const handleRemoveActivity = (id: string) => {
    const newActivities = currentDay.activities.filter((a) => a.id !== id);
    const updatedDays = itinerary.days.map((d) =>
      d.dayNumber === selectedDayNumber ? { ...d, activities: newActivities } : d
    );
    onUpdateItinerary({ ...itinerary, days: updatedDays });
  };

  // Add activity save
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCost, setNewCost] = useState(1500);
  const [newDuration, setNewDuration] = useState(90);

  const handleSaveNewActivity = () => {
    if (!newTitle.trim()) return;

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      timeSlot: newActivitySlot,
      timeString: newActivitySlot === "morning" ? "10:00 AM" : newActivitySlot === "afternoon" ? "02:30 PM" : "07:00 PM",
      title: newTitle,
      description: newDesc || "Custom travel stop added by traveler.",
      location: newLocation || currentDay.city,
      category: "sightseeing",
      durationMinutes: newDuration,
      cost: newCost,
      currency: "INR",
    };

    const updatedDays = itinerary.days.map((d) =>
      d.dayNumber === selectedDayNumber
        ? { ...d, activities: [...d.activities, newAct] }
        : d
    );
    onUpdateItinerary({ ...itinerary, days: updatedDays });
    setIsAddingActivity(false);
    setNewTitle("");
    setNewDesc("");
    setNewLocation("");
  };

  // Update existing activity
  const handleUpdateActivity = () => {
    if (!editingActivity) return;
    const updatedDays = itinerary.days.map((d) =>
      d.dayNumber === selectedDayNumber
        ? {
            ...d,
            activities: d.activities.map((a) =>
              a.id === editingActivity.id ? editingActivity : a
            ),
          }
        : d
    );
    onUpdateItinerary({ ...itinerary, days: updatedDays });
    setEditingActivity(null);
  };

  // Regenerate a single day with realistic variations
  const handleRegenerateDay = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  const getSlotIcon = (slot: ActivityTimeSlot) => {
    switch (slot) {
      case "morning":
        return <Sun size={15} className="text-amber-400" />;
      case "afternoon":
        return <Sunset size={15} className="text-orange-400" />;
      case "evening":
        return <Moon size={15} className="text-teal-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Planner Summary & Controls Bar */}
      <div className="p-6 rounded-3xl bg-[#0D0F12] border border-[#26292D] shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              AI Generated Itinerary
            </span>
            <span className="text-xs text-[#A5A5A5]">
              {itinerary.travelersCount} Travellers • {itinerary.pace} pace
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {itinerary.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#A5A5A5] flex items-center gap-2">
            <MapPin size={14} className="text-teal-400 shrink-0" />
            <span>{itinerary.destination}</span>
            <span>•</span>
            <Calendar size={14} className="text-teal-400 shrink-0" />
            <span>Nov 12 – Nov 17, 2026 (6 Days)</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141619] hover:bg-[#1C1F23] border border-[#26292D] text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <Sliders size={14} />
            <span>{showConfig ? "Hide Generator" : "Tune Parameters"}</span>
          </button>

          <button
            onClick={onSaveItinerary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141619] hover:bg-[#1C1F23] border border-teal-500/40 text-xs font-medium text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
          >
            <Bookmark size={14} />
            <span>Save Plan</span>
          </button>

          <button
            onClick={onShareItinerary}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            <Share2 size={14} />
            <span>Share Trip</span>
          </button>
        </div>
      </div>

      {/* Collapsible Tuning & Generation Panel */}
      {showConfig && (
        <div className="p-6 rounded-3xl bg-[#090B0D] border border-teal-500/30 space-y-5 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C1F23]">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles size={16} className="text-teal-400" />
              <span>AI Trip Generation Parameters</span>
            </div>
            <span className="text-xs text-[#A5A5A5]">
              Real-time schedule synthesis
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Destination */}
            <div className="space-y-1">
              <label className="text-[#A5A5A5] font-medium">Destination</label>
              <input
                type="text"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            {/* Travellers */}
            <div className="space-y-1">
              <label className="text-[#A5A5A5] font-medium">Travellers</label>
              <div className="flex items-center justify-between bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white">
                <span>{travelersCount} People</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                    className="px-2 py-0.5 rounded bg-neutral-800 text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setTravelersCount(travelersCount + 1)}
                    className="px-2 py-0.5 rounded bg-neutral-800 text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1">
              <label className="text-[#A5A5A5] font-medium">Total Target Budget (₹)</label>
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(Number(e.target.value))}
                className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            {/* Pace */}
            <div className="space-y-1">
              <label className="text-[#A5A5A5] font-medium">Preferred Pace</label>
              <select
                value={paceInput}
                onChange={(e) => setPaceInput(e.target.value as any)}
                className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
              >
                <option value="relaxed">Relaxed (1-2 stops/day)</option>
                <option value="moderate">Moderate (3-4 stops/day)</option>
                <option value="intense">Intense (Packed schedule)</option>
              </select>
            </div>
          </div>

          {/* Interests Pills */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A5A5A5]">Interests & Styles</label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleToggleInterest(interest)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    interests.includes(interest)
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                      : "bg-[#141619] text-[#A5A5A5] border border-[#26292D] hover:text-white"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowConfig(false)}
              className="px-4 py-2 rounded-xl bg-[#141619] text-xs text-neutral-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateItinerary}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs shadow-md shadow-teal-500/20"
            >
              <Sparkles size={14} className={isGenerating ? "animate-spin" : ""} />
              <span>{isGenerating ? "Synthesizing Itinerary..." : "Regenerate Full Schedule"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Sub-Tabs: Itinerary Schedule vs Reality Engine Inspector */}
      <div className="flex items-center justify-between border-b border-[#26292D] pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRealityEngineTab(false)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              !showRealityEngineTab
                ? "bg-[#16181B] text-teal-400 border border-teal-500/40"
                : "text-[#A5A5A5] hover:text-white"
            }`}
          >
            Schedule & Itinerary ({itinerary.days.length} Days)
          </button>
          <button
            onClick={() => setShowRealityEngineTab(true)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              showRealityEngineTab
                ? "bg-[#16181B] text-teal-400 border border-teal-500/40"
                : "text-[#A5A5A5] hover:text-white"
            }`}
          >
            <span>Travel Reality Engine</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </button>
        </div>

        {!showRealityEngineTab && (
          <button
            onClick={handleRegenerateDay}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-teal-400 transition-colors"
          >
            <RefreshCw size={13} className={isGenerating ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Regenerate Day {selectedDayNumber}</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {showRealityEngineTab ? (
        <TravelRealityEngine
          checks={itinerary.realityChecks}
          onApplyFix={onApplyRealityFix}
          onRefreshValidation={() => {
            setIsGenerating(true);
            setTimeout(() => setIsGenerating(false), 600);
          }}
          isValidating={isGenerating}
        />
      ) : (
        <div className="space-y-6">
          {/* Day Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {itinerary.days.map((day) => {
              const isSelected = day.dayNumber === selectedDayNumber;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayNumber(day.dayNumber)}
                  className={`flex flex-col text-left px-4 py-2.5 rounded-2xl min-w-[140px] transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#141619] border border-teal-500/50 shadow-[0_0_15px_-3px_rgba(45,212,191,0.25)]"
                      : "bg-[#0D0F12] border border-[#222529] hover:bg-[#111315] opacity-75 hover:opacity-100"
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold ${
                      isSelected ? "text-teal-400" : "text-[#A5A5A5]"
                    }`}
                  >
                    Day {day.dayNumber}
                  </span>
                  <span className="text-xs font-bold text-white truncate">
                    {day.city}
                  </span>
                  <span className="text-[10px] text-[#6B7280] mt-0.5">
                    {day.activities.length} activities
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Day Header */}
          <div className="p-4 rounded-2xl bg-[#0D0F12] border border-[#222529] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-teal-400">
                {currentDay.dateStr}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {currentDay.title}
              </h3>
            </div>

            <button
              onClick={() => setIsAddingActivity(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-xs font-semibold text-teal-300 transition-colors w-fit"
            >
              <Plus size={14} />
              <span>Add Activity</span>
            </button>
          </div>

          {/* Activities List */}
          <div className="space-y-4">
            {currentDay.activities.map((act, index) => (
              <React.Fragment key={act.id}>
                {/* Activity Card */}
                <div className="p-5 rounded-2xl bg-[#0E1013] border border-[#222529] hover:border-[#2E333A] transition-all duration-200 group relative">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Time & Slot Badge */}
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-[#141619] border border-[#26292D] shrink-0">
                        {getSlotIcon(act.timeSlot)}
                        <span className="text-[10px] font-medium text-[#A5A5A5] capitalize mt-0.5">
                          {act.timeSlot}
                        </span>
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-teal-400">
                            {act.timeString}
                          </span>
                          <span className="text-xs text-[#6B7280]">•</span>
                          <span className="text-xs text-[#A5A5A5] flex items-center gap-1">
                            <Clock size={12} />
                            <span>{act.durationMinutes} mins</span>
                          </span>
                          {act.bookingRequired && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Ticket size={11} />
                              <span>Advance Slot</span>
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-white group-hover:text-teal-200 transition-colors">
                          {act.title}
                        </h4>

                        <p className="text-xs text-[#A5A5A5] leading-relaxed">
                          {act.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#6B7280]">
                          <span className="flex items-center gap-1 text-[#A5A5A5]">
                            <MapPin size={12} className="text-teal-400" />
                            <span>{act.location}</span>
                          </span>
                          <span>•</span>
                          <span className="text-neutral-300 font-semibold">
                            Est. {formatPrice(act.cost)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions (Reorder, Edit, Delete) */}
                    <div className="flex sm:flex-col items-center justify-end gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1C1F23]">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveActivity(index, "up")}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 hover:bg-[#141619]"
                          title="Move earlier"
                        >
                          <ChevronUp size={15} />
                        </button>
                        <button
                          onClick={() => handleMoveActivity(index, "down")}
                          disabled={index === currentDay.activities.length - 1}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 hover:bg-[#141619]"
                          title="Move later"
                        >
                          <ChevronDown size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingActivity(act)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-teal-400 hover:bg-[#141619]"
                          title="Edit stop"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleRemoveActivity(act.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-[#141619]"
                          title="Remove stop"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transit Corridor Segment between activities */}
                {act.transitToNext && (
                  <div className="relative pl-6 py-2 my-1">
                    {/* Vertical connector line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#26292D] -translate-x-1/2" />
                    <div className="flex items-center gap-3 text-xs text-[#A5A5A5] bg-[#0A0C0E] border border-[#1C1F23] rounded-xl px-3.5 py-2 w-fit">
                      <Navigation size={13} className="text-teal-400" />
                      <span className="font-semibold text-neutral-300">
                        {act.transitToNext.durationMinutes} mins transit
                      </span>
                      <span className="text-[#6B7280]">
                        ({act.transitToNext.distance})
                      </span>
                      <span className="text-neutral-400 hidden sm:inline">
                        — {act.transitToNext.instruction}
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {isAddingActivity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0D0F12] border border-[#26292D] rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-white">Add New Itinerary Stop</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A5A5A5] block mb-1">Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["morning", "afternoon", "evening"] as ActivityTimeSlot[]).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewActivitySlot(slot)}
                      className={`py-2 rounded-xl capitalize font-medium transition-colors ${
                        newActivitySlot === slot
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                          : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#A5A5A5] block mb-1">Activity Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Roppongi Hills Mori Art Museum"
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#A5A5A5] block mb-1">Description / Notes</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Details, exhibits, must-try snacks..."
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none h-18 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5A5A5] block mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Area or station"
                    className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#A5A5A5] block mb-1">Est. Cost (₹)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#26292D]">
              <button
                onClick={() => setIsAddingActivity(false)}
                className="px-4 py-2 rounded-xl bg-[#16181B] text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewActivity}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Activity Modal */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0D0F12] border border-[#26292D] rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-white">Edit Activity</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A5A5A5] block mb-1">Title</label>
                <input
                  type="text"
                  value={editingActivity.title}
                  onChange={(e) =>
                    setEditingActivity({ ...editingActivity, title: e.target.value })
                  }
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#A5A5A5] block mb-1">Description</label>
                <textarea
                  value={editingActivity.description}
                  onChange={(e) =>
                    setEditingActivity({ ...editingActivity, description: e.target.value })
                  }
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5A5A5] block mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={editingActivity.durationMinutes}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        durationMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#A5A5A5] block mb-1">Est. Cost (₹)</label>
                  <input
                    type="number"
                    value={editingActivity.cost}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        cost: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#26292D]">
              <button
                onClick={() => setEditingActivity(null)}
                className="px-4 py-2 rounded-xl bg-[#16181B] text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateActivity}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

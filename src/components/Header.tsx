"use client";

import React from "react";
import {
  Bell,
  Sparkles,
  Search,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { Currency, NavigationTab } from "../types";
import { NavoraLogo } from "./NavoraLogo";

interface HeaderProps {
  currentTab: NavigationTab;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  hasRealityAlert?: boolean;
  onOpenRealityEngine: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  currency,
  onCurrencyChange,
  onOpenSearch,
  onOpenNotifications,
  unreadCount = 4,
  hasRealityAlert = true,
  onOpenRealityEngine,
}) => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = React.useState(false);

  const tabLabels: Record<NavigationTab, string> = {
    home: "Travel Intelligence Hub",
    discover: "Destination Discovery",
    search: "Smart Unified Search",
    planner: "AI Trip Planner & Schedule Engine",
    saved: "Saved Journeys & Favorites",
    group: "Collaborative Trip Workspace",
    budget: "Smart Budget & Expense Tracking",
    map: "Interactive Travel Companion Map",
    notifications: "Intelligence Feed & Alerts",
    settings: "Platform Settings & Preferences",
  };

  const currencies: Currency[] = ["USD", "EUR", "GBP", "INR", "JPY"];

  return (
    <header className="flex items-center justify-between pb-6 pt-1 select-none">
      {/* View Title & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#A5A5A5] mb-1">
          <NavoraLogo size={18} />
          <span className="font-semibold text-teal-400/90 tracking-wide">
            NAVORA
          </span>
          <span>/</span>
          <span className="capitalize text-neutral-400">{currentTab}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F5]">
          {tabLabels[currentTab]}
        </h1>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Reality Engine Status Pill */}
        <button
          onClick={onOpenRealityEngine}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111315] hover:bg-[#16181B] border border-[#26292D] hover:border-teal-500/40 text-xs text-[#A5A5A5] hover:text-[#F5F5F5] transition-all cursor-pointer shadow-sm group"
          title="Inspect Travel Reality Engine Validation Status"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                hasRealityAlert ? "bg-amber-400" : "bg-teal-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                hasRealityAlert ? "bg-amber-400" : "bg-teal-400"
              }`}
            />
          </span>
          <span className="font-medium text-neutral-300 group-hover:text-white">
            Reality Engine
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              hasRealityAlert
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
            }`}
          >
            {hasRealityAlert ? "2 Alerts" : "Feasible"}
          </span>
        </button>

        {/* Currency Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181B] border border-[#26292D] text-xs font-medium text-[#F5F5F5] transition-colors cursor-pointer"
          >
            <span>{currency}</span>
            <ChevronDown size={13} className="text-[#A5A5A5]" />
          </button>

          {currencyDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-28 bg-[#111315] border border-[#26292D] rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onCurrencyChange(c);
                    setCurrencyDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    c === currency
                      ? "bg-teal-500/20 text-teal-300 font-semibold"
                      : "text-[#A5A5A5] hover:text-white hover:bg-neutral-800/60"
                  }`}
                >
                  <span>{c}</span>
                  {c === currency && <span className="text-[10px]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Search Button */}
        <button
          onClick={onOpenSearch}
          className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181B] border border-[#26292D] text-xs text-[#A5A5A5] hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          title="Search all destinations, flights & stays"
        >
          <Search size={15} />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden lg:inline text-[10px] bg-neutral-800/80 px-1 py-0.5 rounded text-neutral-400 border border-neutral-700">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-[#111315] hover:bg-[#16181B] border border-[#26292D] text-[#A5A5A5] hover:text-white transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full border border-[#0B0D10]">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

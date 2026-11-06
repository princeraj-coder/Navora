"use client";

import React from "react";
import {
  Home,
  Compass,
  Search,
  Sparkles,
  Heart,
  Users,
  Wallet,
  MapPin,
  Bell,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { NavigationTab } from "../types";
import { NavoraLogo } from "./NavoraLogo";

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unreadCount?: number;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadCount = 4,
  onOpenSettings,
  onOpenHelp,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { id: "home" as NavigationTab, label: "Home", icon: Home },
    { id: "discover" as NavigationTab, label: "Discover", icon: Compass },
    { id: "search" as NavigationTab, label: "Smart Search", icon: Search },
    { id: "planner" as NavigationTab, label: "AI Trip Planner", icon: Sparkles },
    { id: "saved" as NavigationTab, label: "Saved Trips", icon: Heart },
    { id: "group" as NavigationTab, label: "Group Trips", icon: Users },
    { id: "budget" as NavigationTab, label: "Smart Budget", icon: Wallet },
    { id: "map" as NavigationTab, label: "Travel Map", icon: MapPin },
    {
      id: "notifications" as NavigationTab,
      label: "Notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0B0D10] border-b border-[#26292D] sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <NavoraLogo size={32} showText={true} />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between items-center w-[72px] h-screen sticky top-0 bg-[#0B0D10] py-6 select-none z-40 border-r border-[#1a1c1e]">
        {/* Top: Brand Logo */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => handleNavClick("home")}
            className="group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 shadow-lg cursor-pointer hover:scale-105"
            title="Navora Travel Intelligence"
          >
            <NavoraLogo size={42} withGlow={true} />

            {/* Hover Tooltip */}
            <span className="absolute left-[84px] bg-[#111315] text-[#F5F5F5] text-xs font-medium px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-[#26292D] shadow-xl z-50">
              Navora Home
            </span>
          </button>

          {/* Nav Items */}
          <nav className="flex flex-col items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#16181B] text-teal-400 border border-teal-500/40 shadow-[0_0_15px_-3px_rgba(45,212,191,0.25)]"
                        : "text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[#111315]/80"
                    }`}
                    aria-label={item.label}
                  >
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.3 : 1.8}
                      className={isActive ? "text-teal-400" : "text-[#A5A5A5] group-hover:text-[#F5F5F5]"}
                    />

                    {/* Active vertical accent pill on the left */}
                    {isActive && (
                      <span className="absolute -left-3 top-2.5 bottom-2.5 w-1 bg-teal-400 rounded-r-full shadow-[0_0_8px_#2DD4BF]" />
                    )}

                    {/* Red badge (matching reference screenshot for filter/notifications) */}
                    {item.badge && (
                      <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full border border-[#0B0D10] shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Tooltip */}
                  <div className="absolute left-[76px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#111315] text-[#F5F5F5] text-xs font-medium rounded-md whitespace-nowrap border border-[#26292D] shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
                    {item.label}
                    {item.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-rose-500/20 text-rose-300 rounded font-semibold">
                        {item.badge} new
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-3">
          {/* User Profile Avatar */}
          <div className="relative group">
            <button
              onClick={onOpenSettings}
              className="relative w-9 h-9 rounded-full ring-2 ring-[#26292D] hover:ring-teal-500/60 overflow-hidden transition-all duration-200"
              title="Account Settings & Profile"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Prince Raj"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal-400 border-2 border-[#0B0D10] rounded-full" />
            </button>
            <div className="absolute left-[76px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#111315] text-[#F5F5F5] text-xs font-medium rounded-md whitespace-nowrap border border-[#26292D] shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
              Prince Raj (Pro Member)
            </div>
          </div>

          {/* Settings */}
          <div className="relative group">
            <button
              onClick={onOpenSettings}
              className="p-2.5 text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[#111315] rounded-xl transition-colors cursor-pointer"
              aria-label="Settings"
            >
              <Settings size={19} strokeWidth={1.8} />
            </button>
            <div className="absolute left-[76px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#111315] text-[#F5F5F5] text-xs font-medium rounded-md whitespace-nowrap border border-[#26292D] shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
              Settings & Preferences
            </div>
          </div>

          {/* Help & Support */}
          <div className="relative group">
            <button
              onClick={onOpenHelp}
              className="p-2.5 text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[#111315] rounded-xl transition-colors cursor-pointer"
              aria-label="Help & System Info"
            >
              <HelpCircle size={19} strokeWidth={1.8} />
            </button>
            <div className="absolute left-[76px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#111315] text-[#F5F5F5] text-xs font-medium rounded-md whitespace-nowrap border border-[#26292D] shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
              Platform Info & Help
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-[#26292D]">
            <div className="flex items-center gap-3">
              <NavoraLogo size={36} />
              <div>
                <h3 className="font-semibold text-white tracking-wide text-sm">
                  NAVORA
                </h3>
                <p className="text-[11px] text-[#A5A5A5]">
                  AI Travel Intelligence
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg bg-[#111315] border border-[#26292D]"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#16181B] text-teal-400 border border-teal-500/30"
                      : "text-[#A5A5A5] hover:text-white hover:bg-[#111315]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-rose-500 text-white rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#26292D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Prince Raj"
                className="w-10 h-10 rounded-full object-cover border border-[#26292D]"
              />
              <div>
                <p className="text-sm font-medium text-white">Prince Raj</p>
                <p className="text-xs text-teal-400">Pro Member</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenSettings();
                }}
                className="p-2.5 rounded-lg bg-[#111315] border border-[#26292D] text-neutral-400 hover:text-white"
              >
                <Settings size={18} />
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenHelp();
                }}
                className="p-2.5 rounded-lg bg-[#111315] border border-[#26292D] text-neutral-400 hover:text-white"
              >
                <HelpCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar for Fast Quick Access */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0D10]/95 backdrop-blur-md border-t border-[#26292D] px-2 py-2 flex items-center justify-around">
        {[
          { id: "home" as NavigationTab, label: "Home", icon: Home },
          { id: "discover" as NavigationTab, label: "Discover", icon: Compass },
          { id: "planner" as NavigationTab, label: "Planner", icon: Sparkles },
          { id: "budget" as NavigationTab, label: "Budget", icon: Wallet },
          { id: "map" as NavigationTab, label: "Map", icon: MapPin },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] transition-colors ${
                isActive ? "text-teal-400" : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

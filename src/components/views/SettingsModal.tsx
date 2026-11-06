"use client";

import React from "react";
import {
  Settings,
  X,
  Globe,
  Sliders,
  Bell,
  Shield,
  Palette,
  Check,
} from "lucide-react";
import { Currency } from "../../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onShowToast: (msg: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currency,
  onCurrencyChange,
  onShowToast,
}) => {
  const [activeThemeGlow, setActiveThemeGlow] = React.useState<"teal" | "emerald" | "subtle">("teal");
  const [distanceUnit, setDistanceUnit] = React.useState<"km" | "miles">("km");
  const [notifySlack, setNotifySlack] = React.useState(true);
  const [autoValidateCorridors, setAutoValidateCorridors] = React.useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    onShowToast("Preferences and system settings updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0D0F12] border border-[#26292D] rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#26292D]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#141619] border border-[#26292D] flex items-center justify-center text-teal-400">
              <Settings size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Platform Preferences & Settings
              </h3>
              <p className="text-xs text-[#A5A5A5]">
                Configure Navora Travel Intelligence Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Currency Preference */}
          <div className="space-y-1.5">
            <label className="text-[#A5A5A5] font-medium flex items-center gap-1.5">
              <Globe size={13} className="text-teal-400" />
              <span>Base Currency Display</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(["USD", "EUR", "GBP", "INR", "JPY"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCurrencyChange(c)}
                  className={`py-2 rounded-xl font-bold transition-all ${
                    currency === c
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                      : "bg-[#141619] text-[#A5A5A5] border border-[#26292D] hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Units */}
          <div className="space-y-1.5">
            <label className="text-[#A5A5A5] font-medium flex items-center gap-1.5">
              <Sliders size={13} className="text-teal-400" />
              <span>Transit & Geography Units</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDistanceUnit("km")}
                className={`py-2 rounded-xl font-medium transition-colors ${
                  distanceUnit === "km"
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                    : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                }`}
              >
                Metric (Kilometres / km)
              </button>
              <button
                type="button"
                onClick={() => setDistanceUnit("miles")}
                className={`py-2 rounded-xl font-medium transition-colors ${
                  distanceUnit === "miles"
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                    : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                }`}
              >
                Imperial (Miles / mi)
              </button>
            </div>
          </div>

          {/* Accent Glow */}
          <div className="space-y-1.5">
            <label className="text-[#A5A5A5] font-medium flex items-center gap-1.5">
              <Palette size={13} className="text-teal-400" />
              <span>Active State Aesthetic</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "teal", label: "Teal Luminescence" },
                { id: "emerald", label: "Emerald Focus" },
                { id: "subtle", label: "Minimalist Charcoal" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setActiveThemeGlow(theme.id as any)}
                  className={`py-2 rounded-xl font-medium transition-colors ${
                    activeThemeGlow === theme.id
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                      : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-[#1C1F23]">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141619] border border-[#26292D]">
              <div>
                <span className="font-semibold text-white block">
                  Continuous Reality Engine Checks
                </span>
                <span className="text-[11px] text-[#A5A5A5]">
                  Validate transit corridors in background when editing activities
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoValidateCorridors}
                onChange={(e) => setAutoValidateCorridors(e.target.checked)}
                className="w-4 h-4 accent-teal-400 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141619] border border-[#26292D]">
              <div>
                <span className="font-semibold text-white block">
                  Flight & Hotel Price Alerts
                </span>
                <span className="text-[11px] text-[#A5A5A5]">
                  Notify automatically if monitored fares drop &gt; 5%
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifySlack}
                onChange={(e) => setNotifySlack(e.target.checked)}
                className="w-4 h-4 accent-teal-400 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#26292D]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#16181B] text-xs text-neutral-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

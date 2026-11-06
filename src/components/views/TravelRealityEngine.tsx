"use client";

import React from "react";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  RefreshCw,
  Sliders,
} from "lucide-react";
import { RealityCheckItem } from "../../types";

interface TravelRealityEngineProps {
  checks: RealityCheckItem[];
  onApplyFix: (id: string) => void;
  onRefreshValidation: () => void;
  isValidating?: boolean;
}

export const TravelRealityEngine: React.FC<TravelRealityEngineProps> = ({
  checks,
  onApplyFix,
  onRefreshValidation,
  isValidating = false,
}) => {
  const resolvedCount = checks.filter((c) => c.resolved).length;
  const totalCount = checks.length;
  const feasibilityPercentage = Math.round((resolvedCount / Math.max(1, totalCount)) * 100);

  const getStatusBadge = (check: RealityCheckItem) => {
    if (check.resolved) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 size={11} />
          <span>Feasible & Resolved</span>
        </span>
      );
    }

    switch (check.severity) {
      case "conflict":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
            <ShieldAlert size={11} />
            <span>Schedule Conflict</span>
          </span>
        );
      case "attention":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle size={11} />
            <span>Needs Attention</span>
          </span>
        );
      case "alternative":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            <Lightbulb size={11} />
            <span>Alternative Available</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={11} />
            <span>Feasible</span>
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-[#090B0D] border border-[#222529] space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Engine Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C1F23]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Travel Reality Engine™
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
                Core Differentiator
              </span>
            </div>
            <p className="text-xs text-[#A5A5A5]">
              Validates opening hours, peak congestion corridors, ticket windows & transit friction.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Feasibility score indicator */}
          <div className="text-right">
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block">
              Feasibility Score
            </span>
            <span className={`text-xl font-extrabold ${feasibilityPercentage > 85 ? "text-emerald-400" : "text-amber-400"}`}>
              {feasibilityPercentage}% Validated
            </span>
          </div>

          <button
            onClick={onRefreshValidation}
            disabled={isValidating}
            className="p-2.5 rounded-xl bg-[#141619] hover:bg-[#1C1F23] border border-[#26292D] text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Re-run Reality Validation"
          >
            <RefreshCw size={16} className={isValidating ? "animate-spin text-teal-400" : ""} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#A5A5A5]">
          <span>Validation Matrix: {resolvedCount} of {totalCount} constraints satisfied</span>
          <span>{feasibilityPercentage}% Reliable</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#16181B] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500 shadow-[0_0_10px_#2DD4BF]"
            style={{ width: `${feasibilityPercentage}%` }}
          />
        </div>
      </div>

      {/* Validation Items List */}
      <div className="space-y-3.5">
        {checks.map((check) => (
          <div
            key={check.id}
            className={`p-4 rounded-2xl border transition-all duration-200 ${
              check.resolved
                ? "bg-[#0D0F12]/60 border-[#1C1F23] opacity-80"
                : check.severity === "conflict"
                ? "bg-rose-950/20 border-rose-500/30"
                : "bg-amber-950/15 border-amber-500/30"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400">
                  Day {check.dayNumber}
                </span>
                <span className="text-neutral-600">•</span>
                <h4 className="text-sm font-semibold text-white">
                  {check.title}
                </h4>
              </div>
              <div>{getStatusBadge(check)}</div>
            </div>

            <p className="text-xs text-[#A5A5A5] mt-1 leading-relaxed">
              {check.description}
            </p>

            <div className="mt-3 p-3 rounded-xl bg-[#111315]/80 border border-[#26292D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2 text-xs text-teal-300/90">
                <Lightbulb size={14} className="text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Recommendation:</strong> {check.recommendation}
                </span>
              </div>

              {!check.resolved && check.actionLabel && (
                <button
                  onClick={() => onApplyFix(check.id)}
                  className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span>{check.actionLabel}</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

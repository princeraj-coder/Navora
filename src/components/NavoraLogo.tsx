"use client";

import React from "react";
import Image from "next/image";

interface NavoraLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  withGlow?: boolean;
}

export const NavoraLogo: React.FC<NavoraLogoProps> = ({
  size = 36,
  className = "",
  showText = false,
  withGlow = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div
        className={`relative overflow-hidden rounded-xl border border-[#26292D] transition-all duration-300 shrink-0 ${
          withGlow
            ? "shadow-[0_0_15px_-3px_rgba(45,212,191,0.3)] hover:shadow-[0_0_20px_-2px_rgba(45,212,191,0.5)] border-teal-500/40"
            : "hover:border-teal-500/50"
        }`}
        style={{ width: size, height: size }}
      >
        <Image
          src="/navora-logo.jpg"
          alt="Navora Logo"
          width={size * 2}
          height={size * 2}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      {showText && (
        <span className="font-bold text-sm tracking-wider text-[#F5F5F5]">
          NAVORA
        </span>
      )}
    </div>
  );
};

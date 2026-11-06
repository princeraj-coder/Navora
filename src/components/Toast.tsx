"use client";

import React, { useEffect } from "react";
import { CheckCircle2, Sparkles, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0F1114] border border-teal-500/40 text-xs text-white shadow-2xl shadow-teal-500/10">
        <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
          <Sparkles size={14} />
        </div>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-neutral-400 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

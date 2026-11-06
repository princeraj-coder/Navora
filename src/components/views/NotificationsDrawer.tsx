"use client";

import React from "react";
import {
  Bell,
  X,
  Check,
  ShieldAlert,
  TrendingDown,
  Users,
  Info,
  Trash2,
} from "lucide-react";
import { NotificationItem, NavigationTab } from "../../types";

interface NotificationsDrawerProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onDismiss,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "conflict":
        return <ShieldAlert size={16} className="text-amber-400" />;
      case "price_drop":
        return <TrendingDown size={16} className="text-teal-400" />;
      case "group":
        return <Users size={16} className="text-sky-400" />;
      default:
        return <Info size={16} className="text-neutral-400" />;
    }
  };

  const handleAction = (notif: NotificationItem) => {
    onDismiss(notif.id);
    onClose();
    if (notif.type === "conflict") onNavigate("planner");
    else if (notif.type === "price_drop") onNavigate("search");
    else if (notif.type === "group") onNavigate("group");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md h-full bg-[#0D0F12] border-l border-[#26292D] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#26292D] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#141619] border border-[#26292D] flex items-center justify-center text-teal-400">
              <Bell size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Notifications</h3>
              <p className="text-[11px] text-[#A5A5A5]">
                Intelligence Feed & Live Alerts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#141619]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#6B7280]">
              All caught up! No active alerts.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all ${
                  notif.unread
                    ? "bg-[#111316] border-teal-500/30 shadow-md"
                    : "bg-[#090B0D] border-[#1C1F23] opacity-75"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#141619] border border-[#26292D] shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-[#6B7280]">
                        {notif.time}
                      </span>
                    </div>

                    <p className="text-xs text-[#A5A5A5] mt-1 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1C1F23]">
                      <button
                        onClick={() => handleAction(notif)}
                        className="text-[11px] font-semibold text-teal-400 hover:underline"
                      >
                        Inspect & Resolve →
                      </button>

                      <button
                        onClick={() => onDismiss(notif.id)}
                        className="text-neutral-500 hover:text-neutral-300"
                        title="Dismiss"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#26292D] flex items-center justify-between text-xs">
          <button
            onClick={onMarkAllAsRead}
            className="text-teal-400 hover:text-teal-300 font-semibold"
          >
            Mark all as read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#141619] text-neutral-300 hover:text-white border border-[#26292D]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

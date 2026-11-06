"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { HomeDashboard } from "../components/views/HomeDashboard";
import { DiscoverView } from "../components/views/DiscoverView";
import { SmartSearchView } from "../components/views/SmartSearchView";
import { AITripPlannerView } from "../components/views/AITripPlannerView";
import { TravelRealityEngine } from "../components/views/TravelRealityEngine";
import { SmartBudgetView } from "../components/views/SmartBudgetView";
import { TravelMapView } from "../components/views/TravelMapView";
import { GroupTripsView } from "../components/views/GroupTripsView";
import { SavedTripsView } from "../components/views/SavedTripsView";
import { NotificationsDrawer } from "../components/views/NotificationsDrawer";
import { SettingsModal } from "../components/views/SettingsModal";
import { HelpModal } from "../components/views/HelpModal";
import { Toast } from "../components/Toast";

import {
  NavigationTab,
  Currency,
  Destination,
  Itinerary,
  ExpenseItem,
  SearchResultItem,
  GroupMember,
  GroupVoteItem,
  GroupExpenseSplit,
  NotificationItem,
} from "../types";

import {
  INITIAL_DESTINATIONS,
  INITIAL_ITINERARY,
  INITIAL_EXPENSES,
  INITIAL_SEARCH_RESULTS,
  INITIAL_GROUP_MEMBERS,
  INITIAL_GROUP_VOTES,
  INITIAL_GROUP_SPLITS,
  INITIAL_MAP_MARKERS,
  INITIAL_NOTIFICATIONS,
  CURRENCY_RATES,
} from "../data/mockData";

export default function NavoraApp() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>("home");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [searchInitialCategory, setSearchInitialCategory] = useState<
    "flight" | "hotel" | "experience" | "transport"
  >("flight");

  // Core Data States
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [itinerary, setItinerary] = useState<Itinerary>(INITIAL_ITINERARY);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>(INITIAL_SEARCH_RESULTS);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>(INITIAL_GROUP_MEMBERS);
  const [groupVotes, setGroupVotes] = useState<GroupVoteItem[]>(INITIAL_GROUP_VOTES);
  const [groupSplits, setGroupSplits] = useState<GroupExpenseSplit[]>(INITIAL_GROUP_SPLITS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals & Drawers
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currencyRate = CURRENCY_RATES[currency] || 1;

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Toggle Save Destination
  const handleToggleSaveDestination = (id: string) => {
    setDestinations((prev) =>
      prev.map((dest) => {
        if (dest.id === id) {
          const newState = !dest.isSaved;
          showToast(newState ? `Saved ${dest.name} to Favorites!` : `Removed ${dest.name} from Saved.`);
          return { ...dest, isSaved: newState };
        }
        return dest;
      })
    );
  };

  // Start AI Plan for specific destination
  const handlePlanTripForDestination = (dest: Destination) => {
    setItinerary((prev) => ({
      ...prev,
      title: `Curated Expedition: ${dest.name}`,
      destination: `${dest.name}, ${dest.country}`,
    }));
    setCurrentTab("planner");
    showToast(`Loaded ${dest.name} into AI Trip Planner!`);
  };

  // Run AI Search Prompt from Hero
  const handleRunAIPrompt = (prompt: string) => {
    setItinerary((prev) => ({
      ...prev,
      title: prompt,
    }));
    setCurrentTab("planner");
    showToast(`Generating custom itinerary for: "${prompt}"`);
  };

  // Feature Card Routing
  const handleOpenSearchCategory = (
    category: "flight" | "hotel" | "experience" | "transport"
  ) => {
    setSearchInitialCategory(category);
    setCurrentTab("search");
  };

  // Reality Engine Auto Fix Resolver
  const handleApplyRealityFix = (checkId: string) => {
    if (checkId === "rc-1") {
      // Fix Akihabara & Shibuya Sky conflict on Day 2
      const updatedDays = itinerary.days.map((day) => {
        if (day.dayNumber === 2) {
          return {
            ...day,
            activities: day.activities.map((act) => {
              if (act.id === "act-2-2") {
                return {
                  ...act,
                  timeString: "02:45 PM",
                  title: "Akihabara Electric Town (Shifted 45 min earlier)",
                  description: "Moved earlier by Reality Engine to avoid peak evening transit congestion.",
                };
              }
              if (act.id === "act-2-3") {
                return {
                  ...act,
                  timeString: "05:00 PM",
                  title: "Shibuya Sky 360° Sunset Deck (Arrival on time: 16:50)",
                };
              }
              return act;
            }),
          };
        }
        return day;
      });

      const updatedChecks = itinerary.realityChecks.map((c) =>
        c.id === checkId ? { ...c, resolved: true } : c
      );

      setItinerary({
        ...itinerary,
        days: updatedDays,
        realityChecks: updatedChecks,
      });

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2DD4BF", "#10B981", "#FFFFFF"],
      });

      showToast("Travel Reality Engine applied timing adjustment! Day 2 schedule is now 100% Feasible.");
    } else if (checkId === "rc-2") {
      // Optimize Fushimi Inari to 7:30 AM sunrise
      const updatedDays = itinerary.days.map((day) => {
        if (day.dayNumber === 5) {
          return {
            ...day,
            activities: day.activities.map((act) => {
              if (act.id === "act-5-1") {
                return {
                  ...act,
                  timeString: "07:30 AM",
                  title: "Fushimi Inari Taisha Sunrise Ascent (Optimized)",
                  description: "Early peaceful morning visit beating crowds; allows smooth transit to Arashiyama.",
                };
              }
              return act;
            }),
          };
        }
        return day;
      });

      const updatedChecks = itinerary.realityChecks.map((c) =>
        c.id === checkId ? { ...c, resolved: true } : c
      );

      setItinerary({
        ...itinerary,
        days: updatedDays,
        realityChecks: updatedChecks,
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      showToast("Day 5 schedule optimized for sunrise! Golden hour light secured for Arashiyama.");
    } else {
      setItinerary((prev) => ({
        ...prev,
        realityChecks: prev.realityChecks.map((c) =>
          c.id === checkId ? { ...c, resolved: true } : c
        ),
      }));
      showToast("Check marked as resolved.");
    }
  };

  // Add search item to Itinerary
  const handleAddSearchItemToItinerary = (item: SearchResultItem) => {
    // Also record into Budget
    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      title: item.title,
      category:
        item.type === "flight"
          ? "flights"
          : item.type === "hotel"
          ? "hotels"
          : item.type === "transport"
          ? "transport"
          : "activities",
      amount: item.price,
      currency: "INR",
      status: "confirmed",
      date: new Date().toISOString().split("T")[0],
      notes: `Added from Smart Search (${item.provider})`,
    };
    setExpenses((prev) => [newExpense, ...prev]);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#2DD4BF", "#14B8A6"],
    });

    showToast(`Added "${item.title}" to your itinerary & budget tracker!`);
  };

  // Save / Share Itinerary
  const handleSaveItinerary = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2DD4BF", "#F5F5F5"],
    });
    showToast("Itinerary successfully saved to your Navora vault!");
  };

  const handleShareItinerary = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `https://navora.ai/plan/${itinerary.id}?ref=shared_journey`
      );
    }
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
    showToast("Shareable link copied to clipboard! Anyone with the link can view & vote.");
  };

  // Group voting
  const handleGroupVote = (voteId: string, direction: "up" | "down") => {
    setGroupVotes((prev) =>
      prev.map((v) => {
        if (v.id === voteId) {
          const currentVote = v.userVoted;
          if (currentVote === direction) {
            // Undo vote
            return {
              ...v,
              userVoted: null,
              upvotes: direction === "up" ? v.upvotes - 1 : v.upvotes,
              downvotes: direction === "down" ? v.downvotes - 1 : v.downvotes,
            };
          } else {
            return {
              ...v,
              userVoted: direction,
              upvotes:
                direction === "up"
                  ? v.upvotes + 1
                  : currentVote === "up"
                  ? v.upvotes - 1
                  : v.upvotes,
              downvotes:
                direction === "down"
                  ? v.downvotes + 1
                  : currentVote === "down"
                  ? v.downvotes - 1
                  : v.downvotes,
            };
          }
        }
        return v;
      })
    );
    showToast(`Vote recorded!`);
  };

  const handleAddVoteItem = (title: string, category: string) => {
    const newItem: GroupVoteItem = {
      id: `vote-${Date.now()}`,
      title,
      category,
      proposedBy: "Prince Raj",
      upvotes: 1,
      downvotes: 0,
      userVoted: "up",
      status: "pending",
    };
    setGroupVotes((prev) => [newItem, ...prev]);
    showToast(`Proposed "${title}" for group voting!`);
  };

  // Invite member
  const handleInviteMember = (data: Partial<GroupMember>) => {
    const newMember: GroupMember = {
      id: `user-${Date.now()}`,
      name: data.name || "New Collaborator",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      email: data.email || "collaborator@navora.ai",
      role: data.role || "editor",
      status: "invited",
    };
    setGroupMembers((prev) => [...prev, newMember]);
    showToast(`Invitation sent to ${newMember.email}!`);
  };

  // Budget actions
  const handleAddExpense = (exp: ExpenseItem) => {
    setExpenses((prev) => [exp, ...prev]);
    showToast(`Added expense: "${exp.title}"`);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast("Expense removed.");
  };

  const handleToggleExpenseStatus = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: e.status === "confirmed" ? "estimated" : "confirmed",
            }
          : e
      )
    );
  };

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;
  const hasRealityAlert = itinerary.realityChecks.some((c) => !c.resolved);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col lg:flex-row antialiased selection:bg-teal-500/30 selection:text-teal-200">
      {/* Vertical Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === "notifications") {
            setIsNotificationsOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        unreadCount={unreadNotifsCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Workspace with generously rounded corners matching the screenshot */}
      <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-7 pb-24 lg:pb-7 flex flex-col justify-start">
        <div className="w-full max-w-7xl mx-auto rounded-[24px] sm:rounded-[32px] bg-[#08090B] border border-[#1E2125] p-4 sm:p-8 lg:p-10 shadow-2xl relative min-h-[92vh] flex flex-col justify-between">
          <div>
            {/* Header / Topbar */}
            <Header
              currentTab={currentTab}
              currency={currency}
              onCurrencyChange={setCurrency}
              onOpenSearch={() => setCurrentTab("search")}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              unreadCount={unreadNotifsCount}
              hasRealityAlert={hasRealityAlert}
              onOpenRealityEngine={() => {
                setCurrentTab("planner");
              }}
            />

            {/* Dynamic View Content */}
            <div className="mt-4">
              {currentTab === "home" && (
                <HomeDashboard
                  onNavigate={setCurrentTab}
                  onRunAIPrompt={handleRunAIPrompt}
                  onOpenSearchCategory={handleOpenSearchCategory}
                  savedTripsCount={destinations.filter((d) => d.isSaved).length}
                />
              )}

              {currentTab === "discover" && (
                <DiscoverView
                  destinations={destinations}
                  onToggleSave={handleToggleSaveDestination}
                  onPlanTripForDestination={handlePlanTripForDestination}
                  currency={currency}
                  currencyRate={currencyRate}
                />
              )}

              {currentTab === "search" && (
                <SmartSearchView
                  initialCategory={searchInitialCategory}
                  results={searchResults}
                  currency={currency}
                  currencyRate={currencyRate}
                  onAddToItinerary={handleAddSearchItemToItinerary}
                />
              )}

              {currentTab === "planner" && (
                <AITripPlannerView
                  itinerary={itinerary}
                  currency={currency}
                  currencyRate={currencyRate}
                  onUpdateItinerary={setItinerary}
                  onSaveItinerary={handleSaveItinerary}
                  onShareItinerary={handleShareItinerary}
                  onApplyRealityFix={handleApplyRealityFix}
                />
              )}

              {currentTab === "saved" && (
                <SavedTripsView
                  itinerary={itinerary}
                  savedDestinations={destinations.filter((d) => d.isSaved)}
                  currency={currency}
                  currencyRate={currencyRate}
                  onOpenItinerary={() => setCurrentTab("planner")}
                  onRemoveSavedDestination={handleToggleSaveDestination}
                  onDuplicateItinerary={() => {
                    showToast("Created a duplicate copy of this itinerary in your vault!");
                  }}
                />
              )}

              {currentTab === "group" && (
                <GroupTripsView
                  members={groupMembers}
                  votes={groupVotes}
                  splits={groupSplits}
                  currency={currency}
                  currencyRate={currencyRate}
                  onInviteMember={handleInviteMember}
                  onVote={handleGroupVote}
                  onAddVoteItem={handleAddVoteItem}
                />
              )}

              {currentTab === "budget" && (
                <SmartBudgetView
                  expenses={expenses}
                  totalBudget={itinerary.totalBudget}
                  currency={currency}
                  currencyRate={currencyRate}
                  onAddExpense={handleAddExpense}
                  onDeleteExpense={handleDeleteExpense}
                  onToggleStatus={handleToggleExpenseStatus}
                />
              )}

              {currentTab === "map" && (
                <TravelMapView
                  markers={INITIAL_MAP_MARKERS}
                  onSelectMarkerInPlanner={(day) => {
                    setCurrentTab("planner");
                  }}
                />
              )}
            </div>
          </div>

          {/* Bottom subtle copyright / status info */}
          <footer className="pt-12 mt-12 border-t border-[#16181B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>Navora Travel Intelligence Engine v2.4 • Production Ready</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsHelpOpen(true)}
                className="hover:text-white transition-colors"
              >
                Documentation & Architecture
              </button>
              <span>•</span>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="hover:text-white transition-colors"
              >
                System Settings
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
          showToast("All notifications marked as read.");
        }}
        onDismiss={(id) => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setIsNotificationsOpen(false);
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currency={currency}
        onCurrencyChange={setCurrency}
        onShowToast={showToast}
      />

      {/* Help Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Interactive Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

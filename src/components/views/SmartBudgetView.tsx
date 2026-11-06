"use client";

import React, { useState } from "react";
import {
  Wallet,
  Plus,
  Trash2,
  Edit2,
  DollarSign,
  TrendingDown,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Clock,
  Filter,
  CreditCard,
  ShoppingBag,
  Plane,
  Building2,
  Utensils,
  Navigation,
  Compass,
} from "lucide-react";
import { ExpenseItem, Currency } from "../../types";

interface SmartBudgetViewProps {
  expenses: ExpenseItem[];
  totalBudget: number; // in INR
  currency: Currency;
  currencyRate: number;
  onAddExpense: (expense: ExpenseItem) => void;
  onDeleteExpense: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const SmartBudgetView: React.FC<SmartBudgetViewProps> = ({
  expenses,
  totalBudget,
  currency,
  currencyRate,
  onAddExpense,
  onDeleteExpense,
  onToggleStatus,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New expense form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ExpenseItem["category"]>("food");
  const [amount, setAmount] = useState(3000);
  const [status, setStatus] = useState<"estimated" | "confirmed">("estimated");
  const [notes, setNotes] = useState("");

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

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const confirmedSpent = expenses
    .filter((e) => e.status === "confirmed")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const estimatedSpent = expenses
    .filter((e) => e.status === "estimated")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const percentageUsed = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Category aggregations
  const categoryTotals: Record<ExpenseItem["category"], number> = {
    flights: 0,
    hotels: 0,
    food: 0,
    transport: 0,
    activities: 0,
    shopping: 0,
    misc: 0,
  };

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const categoryConfigs: Record<
    ExpenseItem["category"],
    { label: string; icon: any; color: string }
  > = {
    flights: { label: "Flights", icon: Plane, color: "#38BDF8" },
    hotels: { label: "Hotels", icon: Building2, color: "#818CF8" },
    food: { label: "Food & Dining", icon: Utensils, color: "#F59E0B" },
    transport: { label: "Transport", icon: Navigation, color: "#34D399" },
    activities: { label: "Activities", icon: Compass, color: "#2DD4BF" },
    shopping: { label: "Shopping", icon: ShoppingBag, color: "#EC4899" },
    misc: { label: "Miscellaneous", icon: CreditCard, color: "#9CA3AF" },
  };

  const filteredExpenses =
    activeCategoryFilter === "all"
      ? expenses
      : expenses.filter((e) => e.category === activeCategoryFilter);

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    const newExp: ExpenseItem = {
      id: `exp-${Date.now()}`,
      title,
      category,
      amount,
      currency: "INR",
      status,
      date: new Date().toISOString().split("T")[0],
      notes,
    };

    onAddExpense(newExp);
    setIsAddModalOpen(false);
    setTitle("");
    setAmount(3000);
    setNotes("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget */}
        <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#26292D] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
            <span>Total Trip Budget</span>
            <Wallet size={15} className="text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {formatPrice(totalBudget)}
          </div>
          <div className="text-[11px] text-[#6B7280]">
            Target threshold for 6-day expedition
          </div>
        </div>

        {/* Estimated Total Spend */}
        <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#26292D] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
            <span>Total Allocated Spend</span>
            <CreditCard size={15} className="text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {formatPrice(totalSpent)}
          </div>
          <div className="text-[11px] text-amber-300/80">
            {percentageUsed}% of planned budget
          </div>
        </div>

        {/* Remaining Buffer */}
        <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#26292D] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
            <span>Remaining Buffer</span>
            <TrendingUp size={15} className="text-emerald-400" />
          </div>
          <div className={`text-2xl font-black ${remainingBudget >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {formatPrice(remainingBudget)}
          </div>
          <div className="text-[11px] text-emerald-400/80">
            {remainingBudget >= 0 ? "Safe financial margin" : "Budget exceeded"}
          </div>
        </div>

        {/* Confirmed vs Estimated */}
        <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#26292D] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
            <span>Confirmed / Paid</span>
            <CheckCircle2 size={15} className="text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-300">
            {formatPrice(confirmedSpent)}
          </div>
          <div className="text-[11px] text-[#6B7280]">
            {formatPrice(estimatedSpent)} still estimated
          </div>
        </div>
      </div>

      {/* Progress Bar & Visual Breakdown */}
      <div className="p-6 rounded-3xl bg-[#090B0D] border border-[#222529] space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Budget Utilization & Category Breakdown
            </h3>
            <p className="text-xs text-[#A5A5A5] mt-0.5">
              Live cost monitoring integrated with travel itinerary stops.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-colors cursor-pointer shadow-lg shadow-teal-500/20"
          >
            <Plus size={14} />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-[#16181B] overflow-hidden flex">
            {Object.entries(categoryTotals).map(([cat, amount]) => {
              const widthPct = (amount / Math.max(1, totalSpent)) * 100;
              if (widthPct === 0) return null;
              const config = categoryConfigs[cat as ExpenseItem["category"]];
              return (
                <div
                  key={cat}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: config.color,
                  }}
                  title={`${config.label}: ${formatPrice(amount)}`}
                  className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full hover:brightness-125"
                />
              );
            })}
          </div>
        </div>

        {/* Category Pill Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          {Object.entries(categoryConfigs).map(([cat, config]) => {
            const amount = categoryTotals[cat as ExpenseItem["category"]] || 0;
            const Icon = config.icon;
            return (
              <div
                key={cat}
                onClick={() =>
                  setActiveCategoryFilter(
                    activeCategoryFilter === cat ? "all" : cat
                  )
                }
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeCategoryFilter === cat
                    ? "bg-[#141619] border-teal-500/60 shadow-md"
                    : "bg-[#0E1013] border-[#222529] hover:bg-[#121417]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-[11px] font-medium text-[#A5A5A5] truncate">
                    {config.label}
                  </span>
                </div>
                <div className="text-xs font-bold text-white">
                  {formatPrice(amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expense Ledger Table */}
      <div className="p-6 rounded-3xl bg-[#090B0D] border border-[#222529] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1C1F23]">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white">Expenses Ledger</h4>
            <span className="text-xs text-[#6B7280]">
              ({filteredExpenses.length} entries)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#A5A5A5]">Filter:</span>
            <select
              value={activeCategoryFilter}
              onChange={(e) => setActiveCategoryFilter(e.target.value)}
              className="bg-[#141619] border border-[#26292D] rounded-lg px-2.5 py-1 text-white text-xs focus:outline-none"
            >
              <option value="all">All Categories</option>
              {Object.entries(categoryConfigs).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expenses List */}
        <div className="space-y-2.5">
          {filteredExpenses.map((expense) => {
            const config = categoryConfigs[expense.category] || categoryConfigs.misc;
            const Icon = config.icon;
            const isConfirmed = expense.status === "confirmed";

            return (
              <div
                key={expense.id}
                className="p-4 rounded-xl bg-[#0D0F12] border border-[#1E2226] hover:border-[#2A2E35] transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${config.color}15`,
                      borderColor: `${config.color}30`,
                      color: config.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-semibold text-white truncate">
                        {expense.title}
                      </h5>
                      <button
                        onClick={() => onToggleStatus(expense.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          isConfirmed
                            ? "bg-teal-500/15 text-teal-300 border border-teal-500/30"
                            : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-white"
                        }`}
                        title="Click to toggle Confirmed / Estimated"
                      >
                        {isConfirmed ? "Confirmed / Paid" : "Estimated"}
                      </button>
                    </div>
                    {expense.notes && (
                      <p className="text-xs text-[#6B7280] truncate mt-0.5">
                        {expense.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-bold text-white block">
                      {formatPrice(expense.amount)}
                    </span>
                    <span className="text-[10px] text-[#6B7280] block">
                      {expense.date}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="p-2 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete expense"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateExpense}
            className="w-full max-w-md bg-[#0D0F12] border border-[#26292D] rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95"
          >
            <h3 className="text-base font-bold text-white">Record New Expense</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A5A5A5] block mb-1">Expense Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Kyoto Craft Knife Souvenir"
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5A5A5] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    {Object.entries(categoryConfigs).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#A5A5A5] block mb-1">Amount (₹ INR)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#A5A5A5] block mb-1">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("estimated")}
                    className={`py-2 rounded-xl font-medium transition-colors ${
                      status === "estimated"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                    }`}
                  >
                    Estimated
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("confirmed")}
                    className={`py-2 rounded-xl font-medium transition-colors ${
                      status === "confirmed"
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                        : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                    }`}
                  >
                    Confirmed / Paid
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#A5A5A5] block mb-1">Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Receipt number, booking reference..."
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#26292D]">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#16181B] text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold"
              >
                Save Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

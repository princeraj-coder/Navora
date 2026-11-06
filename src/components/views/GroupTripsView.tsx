"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  Clock,
  DollarSign,
  Send,
  MessageSquare,
  Shield,
  X,
  Sparkles,
} from "lucide-react";
import {
  GroupMember,
  GroupVoteItem,
  GroupExpenseSplit,
  Currency,
} from "../../types";

interface GroupTripsViewProps {
  members: GroupMember[];
  votes: GroupVoteItem[];
  splits: GroupExpenseSplit[];
  currency: Currency;
  currencyRate: number;
  onInviteMember: (member: Partial<GroupMember>) => void;
  onVote: (voteId: string, direction: "up" | "down") => void;
  onAddVoteItem: (title: string, category: string) => void;
}

export const GroupTripsView: React.FC<GroupTripsViewProps> = ({
  members,
  votes,
  splits,
  currency,
  currencyRate,
  onInviteMember,
  onVote,
  onAddVoteItem,
}) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("editor");

  const [newProposalTitle, setNewProposalTitle] = useState("");
  const [newProposalCategory, setNewProposalCategory] = useState("Activity");

  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      author: "Elena Rostova",
      text: "I added the vote for teamLab Planets! Make sure to bring slip-on shoes because we wade in water.",
      time: "10:14 AM",
    },
    {
      id: "2",
      author: "Marcus Chen",
      text: "Voted up! Also let's definitely book the Kaiseki dinner on night 4.",
      time: "11:22 AM",
    },
    {
      id: "3",
      author: "Prince Raj",
      text: "Reality Engine flagged our Day 2 sunset schedule — I just auto-rescheduled it so we reach Shibuya Sky safely by 16:50.",
      time: "12:05 PM",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

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

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        author: "Prince Raj",
        text: chatInput,
        time: "Just now",
      },
    ]);
    setChatInput("");
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProposalTitle.trim()) return;
    onAddVoteItem(newProposalTitle, newProposalCategory);
    setNewProposalTitle("");
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    onInviteMember({
      name: inviteName || inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "invited",
    });
    setIsInviteModalOpen(false);
    setInviteEmail("");
    setInviteName("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Workspace Header */}
      <div className="p-6 rounded-3xl bg-[#0D0F12] border border-[#26292D] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Collaborative Hub
            </span>
            <span className="text-xs text-[#A5A5A5]">
              {members.length} Active Collaborators
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Japan Expedition Workspace
          </h2>
          <p className="text-xs text-[#A5A5A5]">
            Vote on activities, split shared expenses, and coordinate real-time itineraries with your crew.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-teal-500/20 cursor-pointer w-fit"
        >
          <UserPlus size={15} />
          <span>Invite Traveller</span>
        </button>
      </div>

      {/* Travellers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-2xl bg-[#0D0F12] border border-[#26292D] flex items-center gap-3.5 group hover:border-teal-500/40 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.avatar}
              alt={member.name}
              className="w-11 h-11 rounded-full object-cover border border-[#26292D]"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white truncate">
                  {member.name}
                </h4>
                {member.role === "organizer" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                )}
              </div>
              <p className="text-[11px] text-[#A5A5A5] truncate">{member.email}</p>
              <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider block mt-0.5">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-Column Section: Group Voting & Activity Proposals VS Split Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Group Voting & Decisions */}
        <div className="p-6 rounded-3xl bg-[#090B0D] border border-[#222529] space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C1F23]">
            <div>
              <h3 className="text-base font-bold text-white">
                Group Voting & Activity Proposals
              </h3>
              <p className="text-xs text-[#A5A5A5]">
                Consensus engine for proposed stops and dining spots.
              </p>
            </div>
          </div>

          {/* New Proposal Input */}
          <form onSubmit={handleCreateProposal} className="flex gap-2 text-xs">
            <input
              type="text"
              value={newProposalTitle}
              onChange={(e) => setNewProposalTitle(e.target.value)}
              placeholder="Suggest a new stop or restaurant..."
              className="flex-1 bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white placeholder-[#6B7280] focus:outline-none focus:border-teal-500/60"
            />
            <select
              value={newProposalCategory}
              onChange={(e) => setNewProposalCategory(e.target.value)}
              className="bg-[#141619] border border-[#26292D] rounded-xl px-2.5 py-2 text-white focus:outline-none"
            >
              <option value="Activity">Activity</option>
              <option value="Dining">Dining</option>
              <option value="Transport">Transport</option>
              <option value="Stay">Stay</option>
            </select>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#16181B] hover:bg-[#1E2226] border border-teal-500/40 text-teal-300 font-semibold cursor-pointer"
            >
              Propose
            </button>
          </form>

          {/* Proposals List */}
          <div className="space-y-3">
            {votes.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#0D0F12] border border-[#1E2226] hover:border-[#282D35] transition-all flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
                      {item.category}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      by {item.proposedBy}
                    </span>
                  </div>
                  <h5 className="text-sm font-semibold text-white truncate">
                    {item.title}
                  </h5>
                </div>

                {/* Vote Buttons & Tally */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onVote(item.id, "up")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      item.userVoted === "up"
                        ? "bg-teal-500 text-black shadow-md shadow-teal-500/20"
                        : "bg-[#141619] hover:bg-[#1C1F23] text-neutral-300 border border-[#26292D]"
                    }`}
                  >
                    <ThumbsUp size={13} />
                    <span>{item.upvotes}</span>
                  </button>

                  <button
                    onClick={() => onVote(item.id, "down")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      item.userVoted === "down"
                        ? "bg-rose-500 text-white"
                        : "bg-[#141619] hover:bg-[#1C1F23] text-neutral-300 border border-[#26292D]"
                    }`}
                  >
                    <ThumbsDown size={13} />
                    <span>{item.downvotes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Group Shared Expenses & Split Tracker */}
        <div className="p-6 rounded-3xl bg-[#090B0D] border border-[#222529] space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C1F23]">
            <div>
              <h3 className="text-base font-bold text-white">
                Shared Expenses & Split Tracker
              </h3>
              <p className="text-xs text-[#A5A5A5]">
                Fair equal splits across all 4 travellers.
              </p>
            </div>
            <span className="text-xs font-semibold text-teal-400">
              Auto-Balanced
            </span>
          </div>

          {/* Splits List */}
          <div className="space-y-3">
            {splits.map((split) => {
              const perPerson = Math.round(split.amount / split.splitWith.length);
              return (
                <div
                  key={split.id}
                  className="p-4 rounded-2xl bg-[#0D0F12] border border-[#1E2226] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-semibold text-white">
                        {split.description}
                      </h5>
                      <span className="text-xs text-[#6B7280]">
                        Paid by{" "}
                        <strong className="text-teal-400 font-medium">
                          {split.paidBy}
                        </strong>{" "}
                        on {split.date}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white block">
                        {formatPrice(split.amount)}
                      </span>
                      <span className="text-[11px] text-[#A5A5A5]">
                        {formatPrice(perPerson)} / person
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1C1F23] flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>Split among {split.splitWith.join(", ")}</span>
                    <span className="text-emerald-400 font-medium">✓ Settled</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Group Chat & Coordination Feed */}
          <div className="pt-4 border-t border-[#1C1F23] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A5A5A5] flex items-center gap-1.5">
              <MessageSquare size={13} className="text-teal-400" />
              <span>Group Coordination Feed</span>
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3 rounded-xl bg-[#111315] border border-[#1E2226] text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-300">{msg.author}</span>
                    <span className="text-[10px] text-[#6B7280]">{msg.time}</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-1 text-xs">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Drop a note for the group..."
                className="flex-1 bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black cursor-pointer"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleSendInvite}
            className="w-full max-w-md bg-[#0D0F12] border border-[#26292D] rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#26292D]">
              <h3 className="text-base font-bold text-white">
                Invite Collaborator to Trip
              </h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A5A5A5] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#A5A5A5] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-[#141619] border border-[#26292D] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#A5A5A5] block mb-1">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInviteRole("editor")}
                    className={`py-2 rounded-xl font-medium transition-colors ${
                      inviteRole === "editor"
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                        : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                    }`}
                  >
                    Editor (Can vote & add)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInviteRole("viewer")}
                    className={`py-2 rounded-xl font-medium transition-colors ${
                      inviteRole === "viewer"
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                        : "bg-[#141619] text-[#A5A5A5] border border-[#26292D]"
                    }`}
                  >
                    Viewer (Read-only)
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#26292D]">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#16181B] text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

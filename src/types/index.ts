export type NavigationTab =
  | "home"
  | "discover"
  | "search"
  | "planner"
  | "saved"
  | "group"
  | "budget"
  | "map"
  | "notifications"
  | "settings";

export type Currency = "USD" | "EUR" | "GBP" | "INR" | "JPY";

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  description: string;
  bestTimeToVisit: string;
  estimatedBudget: {
    min: number;
    max: number;
    currency: Currency;
  };
  categories: ("trending" | "popular" | "hidden_gem" | "nature" | "culture" | "food" | "weekend")[];
  rating: number;
  highlightSpots: string[];
  weather: {
    temp: string;
    condition: string;
    season: string;
  };
  isSaved?: boolean;
}

export type ActivityTimeSlot = "morning" | "afternoon" | "evening";

export interface Activity {
  id: string;
  timeSlot: ActivityTimeSlot;
  timeString: string;
  title: string;
  description: string;
  location: string;
  category: "culture" | "food" | "transport" | "sightseeing" | "nature" | "leisure" | "shopping";
  durationMinutes: number;
  cost: number;
  currency: Currency;
  bookingRequired?: boolean;
  notes?: string;
  transitToNext?: {
    mode: "walk" | "metro" | "bullet_train" | "taxi" | "bus";
    durationMinutes: number;
    distance: string;
    instruction: string;
  };
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  dateStr: string;
  city: string;
  activities: Activity[];
}

export interface RealityCheckItem {
  id: string;
  dayNumber: number;
  severity: "feasible" | "attention" | "conflict" | "alternative";
  title: string;
  description: string;
  recommendation: string;
  actionLabel?: string;
  resolved?: boolean;
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  totalBudget: number;
  currency: Currency;
  interests: string[];
  travelStyle: "balanced" | "luxury" | "budget" | "fast_paced";
  pace: "relaxed" | "moderate" | "intense";
  days: DayPlan[];
  realityChecks: RealityCheckItem[];
  isSaved?: boolean;
}

export interface ExpenseItem {
  id: string;
  title: string;
  category: "flights" | "hotels" | "food" | "transport" | "activities" | "shopping" | "misc";
  amount: number;
  currency: Currency;
  status: "estimated" | "confirmed";
  date: string;
  notes?: string;
}

export interface SearchResultItem {
  id: string;
  type: "flight" | "hotel" | "experience" | "transport";
  provider: string;
  title: string;
  subtitle: string;
  rating?: number;
  reviewsCount?: number;
  price: number;
  currency: Currency;
  image?: string;
  details: {
    label: string;
    value: string;
  }[];
  badge?: string;
  source: string;
  lastUpdated: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: "organizer" | "editor" | "viewer";
  status: "active" | "invited";
}

export interface GroupVoteItem {
  id: string;
  title: string;
  category: string;
  proposedBy: string;
  upvotes: number;
  downvotes: number;
  userVoted?: "up" | "down" | null;
  status: "pending" | "approved" | "rejected";
}

export interface GroupExpenseSplit {
  id: string;
  description: string;
  paidBy: string;
  amount: number;
  currency: Currency;
  splitWith: string[];
  date: string;
}

export interface MapMarkerItem {
  id: string;
  title: string;
  city: string;
  category: "attraction" | "hotel" | "restaurant" | "transit";
  coords: [number, number]; // [lat, lng]
  dayAssigned?: number;
  rating: number;
  image: string;
  shortInfo: string;
  priceLevel: "$" | "$$" | "$$$" | "$$$$";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "price_drop" | "conflict" | "group" | "system";
  unread: boolean;
  actionUrl?: string;
}

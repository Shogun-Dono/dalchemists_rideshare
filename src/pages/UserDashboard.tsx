import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import QRCodePopup from "../components/QRCodePopup";

interface Ride {
  id: number;
  driver: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  avatar: string;
  isFemaleIdentifying?: boolean;
  is2SLgbtqia?: boolean;
  rideType: 'one-time' | 'recurring';
  recurringDays?: string[];
  endDate?: string;
  isGroceryRun?: boolean;
  shoppingDuration?: number;
}

// In-memory storage for rides
let ridesStore: Ride[] = [
  {
    id: 1,
    driver: "Sarah M.",
    from: "Halifax, NS",
    to: "Dartmouth, NS",
    date: "Monday, Wednesday, Friday",
    time: "8:00 AM",
    seats: 3,
    avatar: "SM",
    isFemaleIdentifying: true,
    is2SLgbtqia: false,
    rideType: 'recurring',
    recurringDays: ['Monday', 'Wednesday', 'Friday'],
    isGroceryRun: false,
  },
  {
    id: 2,
    driver: "James K.",
    from: "West End",
    to: "Shopping Centre",
    date: "Oct 17",
    time: "9:30 AM",
    seats: 2,
    avatar: "JK",
    isFemaleIdentifying: false,
    is2SLgbtqia: true,
    rideType: 'one-time',
    isGroceryRun: true,
    shoppingDuration: 45,
  },
  {
    id: 3,
    driver: "Maria R.",
    from: "Suburb Hills",
    to: "Downtown",
    date: "Tuesday, Thursday",
    time: "7:15 AM",
    seats: 4,
    avatar: "MR",
    isFemaleIdentifying: true,
    is2SLgbtqia: true,
    rideType: 'recurring',
    recurringDays: ['Tuesday', 'Thursday'],
    isGroceryRun: false,
  },
  {
    id: 4,
    driver: "Alex T.",
    from: "North District",
    to: "Grocery Store",
    date: "Oct 18",
    time: "2:00 PM",
    seats: 2,
    avatar: "AT",
    isFemaleIdentifying: false,
    is2SLgbtqia: false,
    rideType: 'one-time',
    isGroceryRun: true,
    shoppingDuration: 30,
  },
];

let listeners: Array<() => void> = [];

export function getRides(): Ride[] {
  return ridesStore;
}

export function addRide(ride: Ride): void {
  ridesStore = [ride, ...ridesStore];
  listeners.forEach((listener) => listener());
}

export function subscribeToRides(listener: () => void): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [, setUpdateTrigger] = useState(0);

  useState(() => {
    const unsubscribe = subscribeToRides(() => {
      setUpdateTrigger((prev) => prev + 1);
    });
    return unsubscribe;
  });

  const rides = getRides();
  const recurringRides = rides.filter(r => r.rideType === 'recurring');
  const oneTimeRides = rides.filter(r => r.rideType === 'one-time');

  const stats = [
    {
      icon: "👥",
      value: "2,847",
      label: "Rides Shared",
      color: "bg-blue-500",
      trend: "+12% this month",
    },
    {
      icon: "🌱",
      value: "18.5 tons",
      label: "CO₂ Saved",
      color: "bg-green-500",
      trend: "Environmental impact",
    },
    {
      icon: "💰",
      value: "$42,150",
      label: "Community Savings",
      color: "bg-purple-500",
      trend: "Total saved by riders",
    },
    {
      icon: "🚗",
      value: "1,240",
      label: "Cars Off Road",
      color: "bg-orange-500",
      trend: "Reduced congestion",
    },
  ];

  const handleSearch = () => {
    console.log("Searching rides from", fromLocation, "to", toLocation);
  };

  const handleRideClick = (rideId: number) => {
    navigate(`/ride-details/${rideId}`);
  };

  const RideCard = ({ ride }: { ride: Ride }) => (
    <div
      onClick={() => handleRideClick(ride.id)}
      className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer bg-[#b8ccde] hover:border-blue-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-[#f0ebe1] font-semibold text-sm">
            {ride.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {ride.driver}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span>👤</span>
              {ride.seats} seats available
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          ride.rideType === 'recurring'
            ? 'bg-purple-100 text-purple-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {ride.rideType === 'recurring' ? '🔄 Daily' : '✓ One-Time'}
        </span>
      </div>

      {(ride.isFemaleIdentifying || ride.is2SLgbtqia || ride.isGroceryRun) && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {ride.isFemaleIdentifying && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
              👩 Female Driver
            </span>
          )}
          {ride.is2SLgbtqia && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
              🌈 LGBTQIA+ Friendly
            </span>
          )}
          {ride.isGroceryRun && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              🛒 Grocery ({ride.shoppingDuration} min)
            </span>
          )}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-green-600">📍</span>
          <span className="font-medium">From: {ride.from}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-red-600">📍</span>
          <span className="font-medium">To: {ride.to}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
          <span className="flex items-center gap-1">
            <span>🕐</span>
            {ride.time}
          </span>
          {ride.rideType === 'one-time' && (
            <span className="flex items-center gap-1">
              <span>📅</span>
              {ride.date}
            </span>
          )}
        </div>
        {ride.rideType === 'recurring' && (
          <div className="text-sm text-gray-600 pt-2">
            <span className="flex items-center gap-1">
              <span>📅</span>
              {ride.recurringDays?.join(', ')}
            </span>
            {ride.endDate && (
              <span className="text-xs text-gray-500">Until: {ride.endDate}</span>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-[#22477a] text-[#f0ebe1] rounded-lg font-medium hover:bg-[#f0a824] transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#22477a] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#f0ebe1] mb-2">
              Community Rideshare
            </h1>
            <p className="text-[#b8ccde]">
              Share your journey, reduce costs, protect the environment
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-[#f0ebe1] rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              Find a Ride
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  placeholder="Enter starting location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  placeholder="Enter destination"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-8 py-3 bg-[#22477a] text-[#f0ebe1] rounded-lg font-semibold hover:bg-[#f0a824] transition-colors shadow-md hover:shadow-lg"
                >
                  Search Rides
                </button>
              </div>
            </div>
          </div>

          {/* Recurring Rides */}
          {recurringRides.length > 0 && (
            <div className="bg-[#f0ebe1] rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                Daily Commutes ({recurringRides.length})
              </h2>
              <p className="text-gray-600 mb-6">Regular rides that repeat on specific days. Perfect for daily commutes!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recurringRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            </div>
          )}

          {/* One-Time Rides */}
          {oneTimeRides.length > 0 && (
            <div className="bg-[#f0ebe1] rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">✓</span>
                One-Time Rides ({oneTimeRides.length})
              </h2>
              <p className="text-gray-600 mb-6">Single rides for specific dates. Great for occasional trips!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {oneTimeRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            </div>
          )}

          {rides.length === 0 && (
            <div className="bg-[#f0ebe1] rounded-2xl shadow-lg p-8 text-center">
              <p className="text-lg text-gray-500 mb-2">No rides available</p>
              <p className="text-sm text-gray-600">Check back soon for new rides!</p>
            </div>
          )}

          {/* Stats Section */}
          <div className="bg-[#f0ebe1] rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📈</span>
              Community Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-xl border border-[#b8ccde] p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center text-[#f0ebe1] mb-4 text-2xl`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-500">{stat.trend}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                Why Rideshare Matters
              </h3>
              <p className="text-gray-600 text-sm">
                Every shared ride reduces traffic congestion, lowers carbon
                emissions, and saves money for both drivers and riders.
                Together, our community has made a significant impact on
                sustainability and accessibility. Join us in building a more
                connected and eco-friendly community!
              </p>
            </div>
          </div>
      <QRCodePopup></QRCodePopup>

          {/* Footer */}
        <div className="text-center mt-12 text-indigo-100">
          <p>
            © 2025 NS Move. Building a sustainable future together.
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
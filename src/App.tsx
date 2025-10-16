import { useState } from "react";

interface Ride {
  id: number;
  driver: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: string;
  avatar: string;
}

function App() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const recentRides: Ride[] = [
    {
      id: 1,
      driver: "Sarah M.",
      from: "Downtown",
      to: "Airport",
      date: "Oct 17",
      time: "8:00 AM",
      seats: 3,
      price: "$15",
      avatar: "SM",
    },
    {
      id: 2,
      driver: "James K.",
      from: "West End",
      to: "University",
      date: "Oct 17",
      time: "9:30 AM",
      seats: 2,
      price: "$8",
      avatar: "JK",
    },
    {
      id: 3,
      driver: "Maria R.",
      from: "Suburb Hills",
      to: "Downtown",
      date: "Oct 17",
      time: "7:15 AM",
      seats: 4,
      price: "$12",
      avatar: "MR",
    },
    {
      id: 4,
      driver: "Alex T.",
      from: "North District",
      to: "Shopping Mall",
      date: "Oct 18",
      time: "2:00 PM",
      seats: 2,
      price: "$10",
      avatar: "AT",
    },
  ];

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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Community Rideshare
            </h1>
            <p className="text-gray-600">
              Share your journey, reduce costs, protect the environment
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
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
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Search Rides
                </button>
              </div>
            </div>
          </div>

          {/* Recent Rides Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🕐</span>
              Recently Posted Rides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentRides.map((ride) => (
                <div
                  key={ride.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-r from-white to-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
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
                    <span className="text-lg font-bold text-blue-600">
                      {ride.price}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600">📍</span>
                      <span className="font-medium">{ride.from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-red-600">📍</span>
                      <span className="font-medium">{ride.to}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        {ride.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🕐</span>
                        {ride.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📈</span>
              Community Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4 text-2xl`}
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
        </div>
      </div>
    </>
  );
}

export default App;

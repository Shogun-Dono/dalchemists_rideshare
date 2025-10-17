import { useState } from "react";
import { getRides, subscribeToRides, addRide } from "./UserDashboard";
import Navbar from "../components/NavBar";

export default function DriverDashboard() {
  const [rideFrom, setRideFrom] = useState("");
  const [rideTo, setRideTo] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [rideSeats, setRideSeats] = useState<number>(1);
  const [, setUpdateTrigger] = useState(0);

  useState(() => {
    const unsubscribe = subscribeToRides(() => {
      setUpdateTrigger((prev) => prev + 1);
    });
    return unsubscribe;
  });

  const rides = getRides();
  const myPostedRides = rides.filter((ride) => ride.driver === "You");

  const driverStats = [
    {
      icon: "🚗",
      value: "24",
      label: "Rides Posted",
      color: "bg-blue-500",
      trend: "This month",
    },
    {
      icon: "⭐",
      value: "4.9",
      label: "Rating",
      color: "bg-yellow-500",
      trend: "Based on 87 reviews",
    },
    {
      icon: "👥",
      value: "156",
      label: "Passengers Helped",
      color: "bg-green-500",
      trend: "Total lifetime",
    },
    {
      icon: "💰",
      value: "$847",
      label: "Earnings",
      color: "bg-purple-500",
      trend: "This month",
    },
  ];

  const handlePostRide = () => {
    if (!rideFrom || !rideTo || !rideDate || !rideTime) {
      alert("Please fill in all ride details before posting.");
      return;
    }

    const newRide = {
      id: Date.now(),
      driver: "You",
      from: rideFrom,
      to: rideTo,
      date: new Date(rideDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: rideTime,
      seats: rideSeats,
      avatar: "U",
    };

    addRide(newRide);
    setRideFrom("");
    setRideTo("");
    setRideDate("");
    setRideTime("");
    setRideSeats(1);
    alert("Ride posted successfully!");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Driver Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your rides and help your community
            </p>
          </div>

          {/* Driver Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Your Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {driverStats.map((stat, idx) => (
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
          </div>

          {/* Post a Ride Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🚗</span>
              Post a New Ride
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="text"
                  value={rideFrom}
                  onChange={(e) => setRideFrom(e.target.value)}
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="text"
                  value={rideTo}
                  onChange={(e) => setRideTo(e.target.value)}
                  placeholder="Enter destination"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={rideDate}
                  onChange={(e) => setRideDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={rideTime}
                  onChange={(e) => setRideTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Seats
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={rideSeats}
                  onChange={(e) => setRideSeats(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handlePostRide}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
              >
                Post Ride
              </button>
            </div>
          </div>

          {/* My Posted Rides */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              My Posted Rides
            </h2>
            {myPostedRides.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">No rides posted yet</p>
                <p className="text-sm">
                  Post your first ride above to get started!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myPostedRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-indigo-50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
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
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
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
            )}
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Driver Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Be Punctual
                </h3>
                <p className="text-sm text-gray-600">
                  Arrive on time to build trust and maintain a good rating with
                  your passengers.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-800 mb-2">Stay Safe</h3>
                <p className="text-sm text-gray-600">
                  Always verify passenger details and follow safety guidelines
                  for a secure ride.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Communicate
                </h3>
                <p className="text-sm text-gray-600">
                  Keep passengers informed about any changes or delays to ensure
                  a smooth experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

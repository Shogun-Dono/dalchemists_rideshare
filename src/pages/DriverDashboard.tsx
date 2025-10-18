import { useState } from "react";
import { getRides, subscribeToRides, addRide } from "./UserDashboard";
import Navbar from "../components/NavBar";

interface ExtendedRide {
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
}

export default function DriverDashboard() {
  const [rideFrom, setRideFrom] = useState("");
  const [rideTo, setRideTo] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [rideSeats, setRideSeats] = useState<number>(1);
  const [rideType, setRideType] = useState<'one-time' | 'recurring'>('one-time');
  const [recurringDays, setRecurringDays] = useState<string[]>([]);
  const [endDate, setEndDate] = useState("");
  const [isFemaleIdentifying, setIsFemaleIdentifying] = useState(false);
  const [is2SLgbtqia, setIs2SLgbtqia] = useState(false);
  const [, setUpdateTrigger] = useState(0);

  useState(() => {
    const unsubscribe = subscribeToRides(() => {
      setUpdateTrigger((prev) => prev + 1);
    });
    return unsubscribe;
  });

  const rides = getRides() as ExtendedRide[];
  const myPostedRides = rides.filter((ride) => ride.driver === "You");
  const recurringRides = myPostedRides.filter(ride => ride.rideType === 'recurring');
  const oneTimeRides = myPostedRides.filter(ride => ride.rideType === 'one-time');

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

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day: string) => {
    setRecurringDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handlePostRide = () => {
    if (!rideFrom || !rideTo || !rideTime) {
      alert("Please fill in all ride details before posting.");
      return;
    }

    if (rideType === 'one-time' && !rideDate) {
      alert("Please select a date for your one-time ride.");
      return;
    }

    if (rideType === 'recurring' && recurringDays.length === 0) {
      alert("Please select at least one day for your recurring ride.");
      return;
    }

    const newRide: ExtendedRide = {
      id: Date.now(),
      driver: "You",
      from: rideFrom,
      to: rideTo,
      date: rideType === 'one-time' 
        ? new Date(rideDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : recurringDays.slice(0, 3).join(', ') + (recurringDays.length > 3 ? '...' : ''),
      time: rideTime,
      seats: rideSeats,
      avatar: "U",
      isFemaleIdentifying,
      is2SLgbtqia,
      rideType,
      recurringDays: rideType === 'recurring' ? recurringDays : undefined,
      endDate: rideType === 'recurring' ? endDate : undefined,
    };

    addRide(newRide);
    
    // Reset form
    setRideFrom("");
    setRideTo("");
    setRideDate("");
    setRideTime("");
    setRideSeats(1);
    setRideType('one-time');
    setRecurringDays([]);
    setEndDate("");
    setIsFemaleIdentifying(false);
    setIs2SLgbtqia(false);
    
    alert(`${rideType === 'recurring' ? 'Recurring' : 'One-time'} ride posted successfully!`);
  };

  const RideCard = ({ ride }: { ride: ExtendedRide }) => (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-indigo-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {ride.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{ride.driver}</p>
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
          {ride.rideType === 'recurring' ? '🔄 Recurring' : '✓ One-Time'}
        </span>
      </div>

      {(ride.isFemaleIdentifying || ride.is2SLgbtqia) && (
        <div className="flex gap-2 mb-4">
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
    </div>
  );

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

            {/* Ride Type Selection */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <label className="block text-sm font-semibold text-gray-800 mb-3">Ride Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rideType"
                    value="one-time"
                    checked={rideType === 'one-time'}
                    onChange={(e) => setRideType(e.target.value as 'one-time' | 'recurring')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 font-medium">✓ One-Time Ride</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rideType"
                    value="recurring"
                    checked={rideType === 'recurring'}
                    onChange={(e) => setRideType(e.target.value as 'one-time' | 'recurring')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 font-medium">🔄 Recurring Ride</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
                  Time
                </label>
                <input
                  type="time"
                  value={rideTime}
                  onChange={(e) => setRideTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              {rideType === 'one-time' && (
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
              )}

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

            {/* Recurring Days Selection */}
            {rideType === 'recurring' && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <label className="block text-sm font-semibold text-gray-800 mb-3">Select Days</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {daysOfWeek.map(day => (
                    <label key={day} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={recurringDays.includes(day)}
                        onChange={() => toggleDay(day)}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="Leave empty for ongoing rides"
                  />
                </div>
              </div>
            )}

            {/* Identity & Safety Preferences */}
            <div className="border-2 border-pink-200 rounded-lg p-6 bg-pink-50 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Ride Preferences (Optional)</h3>
              <p className="text-sm text-gray-600 mb-4">These tags help create a safe and inclusive community:</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="driverFemaleIdentifying"
                    checked={isFemaleIdentifying}
                    onChange={(e) => setIsFemaleIdentifying(e.target.checked)}
                    className="w-5 h-5 text-pink-600 rounded focus:ring-2 focus:ring-pink-600 cursor-pointer"
                  />
                  <label htmlFor="driverFemaleIdentifying" className="text-gray-800 font-semibold cursor-pointer flex items-center gap-2">
                    👩 Female-identifying driver
                    <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full">Tag visible to riders</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="driver2SLgbtqia"
                    checked={is2SLgbtqia}
                    onChange={(e) => setIs2SLgbtqia(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600 cursor-pointer"
                  />
                  <label htmlFor="driver2SLgbtqia" className="text-gray-800 font-semibold cursor-pointer flex items-center gap-2">
                    🌈 2SLGBTQIA+ friendly ride
                    <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full">Tag visible to riders</span>
                  </label>
                </div>
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

          {/* Recurring Rides */}
          {recurringRides.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                Recurring Rides ({recurringRides.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recurringRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            </div>
          )}

          {/* One-Time Rides */}
          {oneTimeRides.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">✓</span>
                One-Time Rides ({oneTimeRides.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {oneTimeRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            </div>
          )}

          {myPostedRides.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-lg text-gray-500 mb-2">No rides posted yet</p>
              <p className="text-sm text-gray-600">Post your first ride above to get started!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
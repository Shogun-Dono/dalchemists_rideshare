import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import RideDetails from "./pages/RideDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";

function App() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    if (role === "user") navigate("/auth?role=user");
    else if (role === "driver") navigate("/auth?role=driver");
    else navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#22477a] flex items-center justify-center p-6 text-[#1B1B1B]">
      <div className="max-w-6xl w-full relative">
        {/* Admin Button (Top-Right) */}
        <button
          onClick={() => handleRoleSelect("admin")}
          className="absolute top-4 right-4 text-xs text-[#f0ebe1] bg-[#1d3a66] rounded-full px-3 py-1 font-semibold opacity-80 hover:opacity-100 hover:bg-[#22477a] transition-all"
        >
          ⚙️ Operations
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#f0ebe1] mb-4 tracking-wide">
            NS Move
          </h1>
          <p className="text-lg text-[#f0ebe1] max-w-2xl mx-auto">
            Connect, share, and travel together — powered by community.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Rider Card */}
          <div
            onClick={() => handleRoleSelect("user")}
            className="bg-[#f0ebe1] rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-[#b8ccde] rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm text-[#f0ebe1]">
                👤
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-3">
                I'm a Rider
              </h2>
              <p className="text-[#22477a] mb-6 text-base">
                Find rides, connect with drivers, and travel sustainably.
              </p>
              <button className="w-full bg-[#f0a824] text-[#22477a] py-3 rounded-lg font-semibold text-base hover:bg-[#22477a] hover:text-[#f0a824] transition-all">
                Enter Dashboard →
              </button>
            </div>
          </div>

          {/* Driver Card */}
          <div
            onClick={() => handleRoleSelect("driver")}
            className="bg-[#f0ebe1] rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-[#b8ccde] rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm text-[#f0ebe1]">
                🚗
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-3">
                I'm a Driver
              </h2>
              <p className="text-[#22477a] mb-6 text-base">
                Share your rides, earn money, and help reduce carbon emissions.
              </p>
              <button className="w-full bg-[#f0a824] text-[#22477a] py-3 rounded-lg font-semibold text-base hover:bg-[#22477a] hover:text-[#f0a824] transition-all">
                Enter Dashboard →
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[#b8ccde] text-sm">
          <p>© 2025 NS Move. Building a sustainable future together.</p>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/driver" element={<DriverDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/ride-details/:id" element={<RideDetails />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}
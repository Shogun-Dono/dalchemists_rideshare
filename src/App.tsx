import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import RideDetails from "./pages/RideDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";

function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);

    if (role === "user") {
      navigate("/user");
    } else if (role === "driver") {
      navigate("/driver");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">

        <button
          onClick={() => handleRoleSelect("admin")}
          className="absolute top-4 right-4 text-xs text-indigo-100 border border-indigo-300/40 rounded-full px-3 py-1 opacity-70 hover:opacity-100 hover:text-white hover:border-indigo-200 transition-all"
        >
          ⚙️ Operations Hub
        </button>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-2xl">
              🚗
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Community Rideshare
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Connect, Share, and Travel Together. Join our community-driven
            platform for sustainable transportation.
          </p>
        </div>


        {/* Role Selection Section */}
        <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto">
          {/* Main Role Cards */}
          <div className="grid md:grid-cols-2 gap-8 w-full">
            {/* Rider Card */}
            <div
              onClick={() => handleRoleSelect("user")}
              className={`bg-white rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                selectedRole === "user" ? "ring-4 ring-yellow-400 scale-105" : ""
              }`}
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
                  👤
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">I'm a Rider</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Find rides, connect with drivers, and travel sustainably.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                  Enter Dashboard →
                </button>
              </div>
            </div>

            {/* Driver Card */}
            <div
              onClick={() => handleRoleSelect("driver")}
              className={`bg-white rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                selectedRole === "driver" ? "ring-4 ring-yellow-400 scale-105" : ""
              }`}
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
                  🚗
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">I'm a Driver</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Share your rides, earn money, and help reduce carbon emissions.
                </p>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
                  Enter Dashboard →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-indigo-100">
          <p>
            © 2025 NS Move. Building a sustainable future together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/driver" element={<DriverDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/ride-details/:id" element={<RideDetails />} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      
    </Routes>
  );
}
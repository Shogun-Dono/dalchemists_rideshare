import { useState } from "react";
import {
  Edit2,
  Save,
  X,
  Star,
  Award,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Shield,
  LogOut,
} from "lucide-react";
import Navbar from "../components/NavBar";
import QRCodePopup from "../components/QRCodePopup";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(902) 555-0147",
    role: "Rider",
    joinDate: "March 2024",
    profileImage: "👤",
    bio: "Commuter passionate about sustainable transportation and community connection.",
    location: "Halifax, NS",
    verificationType: "Email Verified",
  });

  const [editForm, setEditForm] = useState(profile);

  const riderStats = {
    ridesCompleted: 47,
    coSaved: "2.4 tons",
    moneySpent: "$156.50",
    averageRating: 4.8,
    ratingCount: 42,
  };

  const rewardMilestones = [
    {
      km: 10,
      reward: "5¢/litre Discount On Fuel",
      unlocked: true,
    },
    { km: 20, reward: "15% Off HFX Monthly Pass", unlocked: true },
    { km: 30, reward: "10¢/litre Discount On Fuel", unlocked: true },
    { km: 50, reward: "30% Off HFX Monthly Pass", unlocked: false },
    { km: 75, reward: "50% Off HFX Monthly Pass", unlocked: false },
    { km: 100, reward: "75% Off HFX Monthly Pass", unlocked: false },
  ];

  const currentKm = 35;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#22477a]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header Card */}
        <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-12 shadow-2xl mb-8">
          <div className="grid md:grid-cols-4 gap-8 items-start mb-8">
            {/* Profile Image & Name */}
            <div className="md:col-span-1 text-center">
              <div className="w-40 h-40 bg-[#f0a824] rounded-full flex items-center justify-center text-7xl mx-auto mb-6 shadow-lg">
                {profile.profileImage}
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 bg-[#22477a] text-[#f0ebe1] px-4 py-2 rounded-lg font-semibold hover:bg-[#f0a824] transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="md:col-span-3">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 text-[#f0ebe1] px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-400 text-[#f0ebe1] px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {profile.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-[#22477a] text-[#f0ebe1] px-4 py-1 rounded-full text-sm font-semibold">
                      {profile.role}
                    </span>
                    <span className="text-gray-600">{profile.joinDate}</span>
                  </div>
                  <p className="text-gray-700 text-lg mb-4">{profile.bio}</p>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#22477a]" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#22477a]" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#22477a]" />
                      <span>{profile.phone}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">Identity Verified</p>
                <p className="text-sm text-gray-600">
                  {profile.verificationType}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {riderStats.ridesCompleted}
            </h3>
            <p className="text-gray-600">Rides Completed</p>
          </div>

          <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {riderStats.coSaved}
            </h3>
            <p className="text-gray-600">CO₂ Saved</p>
          </div>

          <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <div className="text-4xl mx-auto mb-3">💰</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {riderStats.moneySpent}
            </h3>
            <p className="text-gray-600">Total Spent</p>
          </div>

          <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {riderStats.averageRating}
            </h3>
            <p className="text-gray-600">Rating</p>
          </div>

          <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <div className="text-4xl mx-auto mb-3">⭐</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {riderStats.ratingCount}
            </h3>
            <p className="text-gray-600">Reviews</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Rides
          </h2>
          <div className="space-y-4">
            {[
              {
                date: "Dec 15, 2024",
                destination: "Bridge Terminal",
                driver: "Sarah M.",
                rating: 5,
              },
              {
                date: "Dec 14, 2024",
                destination: "Shopping Centre",
                driver: "James T.",
                rating: 5,
              },
              {
                date: "Dec 13, 2024",
                destination: "Bridge Terminal",
                driver: "Emma C.",
                rating: 4,
              },
            ].map((ride, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-[#f0a824]"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {ride.destination}
                  </p>
                  <p className="text-sm text-gray-600">with {ride.driver}</p>
                  <p className="text-xs text-gray-500">{ride.date}</p>
                </div>
                <div className="text-yellow-500">
                  {"⭐".repeat(ride.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Timeline */}
        <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Rewards Journey
          </h2>
          <p className="text-gray-600 mb-8">
            Track your progress and unlock rewards as you ride
          </p>

          {/* Current Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-800">
                {currentKm} km traveled
              </span>
              <span className="text-sm text-gray-600">
                Next reward at 50 km
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-[#f0a824] rounded-full transition-all duration-500"
                style={{ width: `${(currentKm / 100) * 100}%` }}
              />
            </div>
          </div>

          {/* Milestone Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#f0a824]" />

            <div className="space-y-6">
              {rewardMilestones.map((milestone, idx) => (
                <div key={idx} className="relative flex items-start gap-6">
                  {/* Milestone marker */}
                  <div
                    className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-bold text-[#f0ebe1] shadow-lg ${
                      milestone.unlocked
                        ? "bg-gradient-to-br from-green-500 to-green-600"
                        : currentKm >= milestone.km * 0.8
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {milestone.unlocked ? (
                      <Award className="w-8 h-8" />
                    ) : (
                      <span className="text-sm">{milestone.km}km</span>
                    )}
                  </div>

                  {/* Milestone content */}
                  <div
                    className={`flex-1 p-6 rounded-2xl shadow-lg transition-all ${
                      milestone.unlocked
                        ? "bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400"
                        : currentKm >= milestone.km * 0.8
                        ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400"
                        : "bg-gray-50 border-2 border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {milestone.km} Kilometers
                        </h3>
                        <p className="text-lg text-gray-700 mt-1">
                          {milestone.reward}
                        </p>
                      </div>
                      {milestone.unlocked && (
                        <span className="bg-green-600 text-[#f0ebe1] px-4 py-1 rounded-full text-sm font-semibold">
                          Unlocked ✓
                        </span>
                      )}
                      {!milestone.unlocked &&
                        currentKm >= milestone.km * 0.8 && (
                          <span className="bg-orange-500 text-[#f0ebe1] px-4 py-1 rounded-full text-sm font-semibold">
                            Almost There!
                          </span>
                        )}
                      {!milestone.unlocked &&
                        currentKm < milestone.km * 0.8 && (
                          <span className="bg-gray-400 text-[#f0ebe1] px-4 py-1 rounded-full text-sm font-semibold">
                            Locked
                          </span>
                        )}
                    </div>
                    {!milestone.unlocked && (
                      <p className="text-sm text-gray-600 mt-2">
                        {milestone.km - currentKm} km to go
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Token Balance */}
          <div className="grid md:grid-cols-3 gap-4 mt-12 pt-8 border-t-2 border-gray-200">
            <div className="p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl border-2 border-green-300 text-center">
              <h3 className="font-bold text-gray-800 mb-2">
                Fuel Discount Unlocked
              </h3>
              <p className="text-4xl font-bold text-green-700">10¢</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl border-2 border-orange-300 text-center">
              <h3 className="font-bold text-gray-800 mb-2">
                HFX Transit Discount Unlocked
              </h3>
              <p className="text-4xl font-bold text-orange-700">50%</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl border-2 border-purple-300 text-center">
              <h3 className="font-bold text-gray-800 mb-2">Community Points</h3>
              <p className="text-4xl font-bold text-purple-700">245</p>
            </div>
          </div>
        </div>

        {/* Settings & Security */}
        <div className="bg-[#f0ebe1] bg-opacity-95 rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Account Management
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Settings Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#22477a]" />
                Security & Privacy
              </h3>
              <div className="space-y-3">
                <button className="w-full group text-left p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:shadow-md transition-all border border-indigo-200 hover:border-indigo-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                        Change Password
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Update your login credentials
                      </p>
                    </div>
                    <span className="text-indigo-400 group-hover:text-indigo-600 transition-colors">
                      →
                    </span>
                  </div>
                </button>

                <button className="w-full group text-left p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:shadow-md transition-all border border-indigo-200 hover:border-indigo-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                        Privacy Settings
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Control information sharing
                      </p>
                    </div>
                    <span className="text-indigo-400 group-hover:text-indigo-600 transition-colors">
                      →
                    </span>
                  </div>
                </button>

                <button className="w-full group text-left p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:shadow-md transition-all border border-indigo-200 hover:border-indigo-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Add extra security layer
                      </p>
                    </div>
                    <span className="text-indigo-400 group-hover:text-indigo-600 transition-colors">
                      →
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Preferences Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#22477a]" />
                Preferences
              </h3>
              <div className="space-y-3">
                <button className="w-full group text-left p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all border border-blue-200 hover:border-blue-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        Notification Preferences
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Manage email and SMS alerts
                      </p>
                    </div>
                    <span className="text-blue-400 group-hover:text-blue-600 transition-colors">
                      →
                    </span>
                  </div>
                </button>

                <button className="w-full group text-left p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all border border-blue-200 hover:border-blue-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        Ride Preferences
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Set preferences and availability
                      </p>
                    </div>
                    <span className="text-blue-400 group-hover:text-blue-600 transition-colors">
                      →
                    </span>
                  </div>
                </button>

                <button className="w-full group text-left p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all border border-blue-200 hover:border-blue-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        Payment Methods
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Update payment information
                      </p>
                    </div>
                    <span className="text-blue-400 group-hover:text-blue-600 transition-colors">
                      →
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Help & Support Row */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Help & Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="group text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all border border-green-200 hover:border-green-400">
                <div className="text-3xl mb-3">💬</div>
                <p className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                  Help & Support
                </p>
                <p className="text-sm text-gray-600 mt-1">Get assistance</p>
              </button>

              <button className="group text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-all border border-blue-200 hover:border-blue-400">
                <div className="text-3xl mb-3">📄</div>
                <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  Privacy Policy
                </p>
                <p className="text-sm text-gray-600 mt-1">View our policies</p>
              </button>

              <button className="group text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl hover:shadow-md transition-all border border-red-200 hover:border-red-400">
                <LogOut className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors">
                  Sign Out
                </p>
                <p className="text-sm text-gray-600 mt-1">End your session</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <QRCodePopup />

      {/* Footer */}
      <div className="text-center py-8 text-indigo-100 border-t border-[#f0ebe1] border-opacity-20 mt-12">
        <p>© 2025 NSMove. Building a sustainable future together.</p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Edit2, Save, X, Star, Award, TrendingUp, MapPin, Phone, Mail, Shield, LogOut } from 'lucide-react';
import Navbar from "../components/NavBar";
import QRCodePopup from "../components/QRCodePopup";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(902) 555-0147',
    role: 'Rider',
    joinDate: 'March 2024',
    profileImage: '👤',
    bio: 'Commuter passionate about sustainable transportation and community connection.',
    location: 'Halifax, NS',
    verificationType: 'Email Verified'
  });

  const [editForm, setEditForm] = useState(profile);

  const riderStats = {
    ridesCompleted: 47,
    coSaved: '2.4 tons',
    moneySpent: '$156.50',
    averageRating: 4.8,
    ratingCount: 42
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header Card */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 shadow-2xl mb-8">
          <div className="grid md:grid-cols-4 gap-8 items-start mb-8">
            {/* Profile Image & Name */}
            <div className="md:col-span-1 text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center text-7xl mx-auto mb-6 shadow-lg">
                {profile.profileImage}
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
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
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Location</label>
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
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{profile.name}</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {profile.role}
                    </span>
                    <span className="text-gray-600">{profile.joinDate}</span>
                  </div>
                  <p className="text-gray-700 text-lg mb-4">{profile.bio}</p>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-indigo-600" />
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
                <p className="text-sm text-gray-600">{profile.verificationType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{riderStats.ridesCompleted}</h3>
            <p className="text-gray-600">Rides Completed</p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{riderStats.coSaved}</h3>
            <p className="text-gray-600">CO₂ Saved</p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <div className="text-4xl mx-auto mb-3">💰</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{riderStats.moneySpent}</h3>
            <p className="text-gray-600">Total Spent</p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{riderStats.averageRating}</h3>
            <p className="text-gray-600">Rating</p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <div className="text-4xl mx-auto mb-3">⭐</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{riderStats.ratingCount}</h3>
            <p className="text-gray-600">Reviews</p>
          </div>
        </div>

        {/* Activity & Rewards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Rides</h2>
            <div className="space-y-4">
              {[
                { date: 'Dec 15, 2024', destination: 'Bridge Terminal', driver: 'Sarah M.', rating: 5 },
                { date: 'Dec 14, 2024', destination: 'Shopping Centre', driver: 'James T.', rating: 5 },
                { date: 'Dec 13, 2024', destination: 'Bridge Terminal', driver: 'Emma C.', rating: 4 }
              ].map((ride, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-600">
                  <div>
                    <p className="font-semibold text-gray-800">{ride.destination}</p>
                    <p className="text-sm text-gray-600">with {ride.driver}</p>
                    <p className="text-xs text-gray-500">{ride.date}</p>
                  </div>
                  <div className="text-yellow-500">{'⭐'.repeat(ride.rating)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards & Tokens */}
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Rewards</h2>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl border-2 border-green-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800">Grocery Tokens</h3>
                  <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full">Active</span>
                </div>
                <p className="text-3xl font-bold text-green-700 mb-2">8</p>
                <p className="text-sm text-gray-600">Redeemable at partner vendors</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl border-2 border-orange-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800">Fuel Tokens</h3>
                  <span className="text-sm bg-orange-600 text-white px-3 py-1 rounded-full">Available</span>
                </div>
                <p className="text-3xl font-bold text-orange-700 mb-2">0</p>
                <p className="text-sm text-gray-600">Earn by offering rides as a driver</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl border-2 border-blue-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800">Community Points</h3>
                  <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">Earned</span>
                </div>
                <p className="text-3xl font-bold text-blue-700 mb-2">245</p>
                <p className="text-sm text-gray-600">Points toward next reward tier</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings & Security */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-800">Change Password</p>
                <p className="text-sm text-gray-600">Update your login credentials</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-800">Privacy Settings</p>
                <p className="text-sm text-gray-600">Control what information is shared</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-800">Notification Preferences</p>
                <p className="text-sm text-gray-600">Manage email and SMS alerts</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-800">Payment Methods</p>
                <p className="text-sm text-gray-600">Update your payment information</p>
              </button>
            </div>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">More Options</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-800">My Preferences</p>
                <p className="text-sm text-gray-600">Set ride preferences and availability</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-800">Help & Support</p>
                <p className="text-sm text-gray-600">Get help with your account</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-800">View Privacy Policy</p>
                <p className="text-sm text-gray-600">Learn how we protect your data</p>
              </button>
              <button className="w-full text-left p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-all border-l-4 border-red-600">
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-700">Sign Out</p>
                    <p className="text-sm text-red-600">End your current session</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <QRCodePopup></QRCodePopup>
      {/* Footer */}
      <div className="text-center py-8 text-indigo-100 border-t border-white border-opacity-20 mt-12">
        <p>© 2025 NSMove. Building a sustainable future together.</p>
      </div>
    </div>
  );
}
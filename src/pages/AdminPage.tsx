import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function AdminPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin login submitted:', formData);
    setIsLoggedIn(true);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#22477a] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#f0ebe1] mb-2">NS Move</h1>
            <p className="text-[#b8ccde] text-lg">Admin Portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#b8ccde] rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl font-bold text-black mb-8 text-center">Admin Login</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-black font-semibold mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[#f0a824]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@nsmove.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-black font-semibold mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#f0a824]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-[#f0a824] hover:text-[#b8ccde]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="w-full bg-[#f0a824] text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
              >
                Sign In
              </button>
            </form>

            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="w-full mt-4 bg-[#22477a] text-[#f0ebe1] py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
            >
              Back to Home
            </button>

            <p className="text-center text-black text-sm mt-6">
              Authorized personnel only
            </p>
          </div>

          <div className="text-center py-8 text-[#f0ebe1] mt-8">
            <p>© 2025 NS Move. Building a sustainable future together.</p>
          </div>
        </div>
      </div>
    </>
  );
}
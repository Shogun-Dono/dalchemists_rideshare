import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Upload, Check, Eye, EyeOff } from 'lucide-react';
import NavBar from '../components/NavBar';
import QRCodePopup from "../components/QRCodePopup";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get('role');

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [isFemaleIdentifying, setIsFemaleIdentifying] = useState(false);
  const [is2SLgbtqia, setIs2SLgbtqia] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [insuranceUploaded, setInsuranceUploaded] = useState(false);
  const [licenseUploaded, setLicenseUploaded] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    idFile: null,
    driverLicense: '',
    licensePlate: '',
    vehicleType: '',
    insuranceFile: null,
    insuranceProvider: '',
    policyNumber: '',
    femaleIdentifying: false,
    lgbtqiaIdentifying: false,
    lgbtqiaIdentity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fileType]: file
      }));
      if (fileType === 'idFile') setIdUploaded(true);
      if (fileType === 'insuranceFile') setInsuranceUploaded(true);
    }
  };

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLicenseUploaded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(isLogin ? 'Login successful!' : 'Sign up successful!');
    
    // Redirect based on the role parameter
    if (roleParam === 'user') {
      navigate('/user');
    } else if (roleParam === 'driver') {
      navigate('/driver');
    } else {
      navigate('/');
    }
  };

  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-[#22477a] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0ebe1] mb-2">NS Move</h1>
          <p className="text-[#b8ccde] text-lg">{isLogin ? 'Welcome Back' : 'Join Our Community'}</p>
        </div>

        {/* Main Card */}
        <div className="bg-[#b8ccde] rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${!isLogin ? 'bg-[#f0a824] text-[#f0ebe1]' : 'bg-[#22477a] text-[#f0ebe1] hover:bg-opacity-80'}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isLogin ? 'bg-[#f0a824] text-[#f0ebe1]' : 'bg-[#22477a] text-[#f0ebe1] hover:bg-opacity-80'}`}
            >
              Login
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {isLogin ? (
              <>
                {/* Login Form */}
                <div>
                  <label className="block text-black font-semibold mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[#f0a824]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

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
                      required
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

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#f0a824] text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                {/* SIGN UP FORM */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-black font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(902) 555-0123"
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[#f0a824]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

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
                      required
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

                <div>
                  <label className="block text-black font-semibold mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* ID Upload */}
                <div className="border-2 border-dashed border-[#b8ccde] rounded-lg p-6 text-center bg-[#22477a]">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      {idUploaded ? (
                        <>
                          <Check className="w-8 h-8 text-[#f0a824]" />
                          <span className="text-[#f0a824] font-semibold">ID Uploaded</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-[#f0a824]" />
                          <span className="text-[#f0ebe1] font-semibold">Upload Government ID</span>
                          <span className="text-sm text-[#b8ccde]">(Driver's License, Passport, etc.)</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'idFile')}
                      className="hidden"
                      required
                    />
                  </label>
                </div>

                {/* Identity & Preferences Section */}
                <div className="border-2 border-[#f0a824] rounded-lg p-6 bg-[#22477a]">
                  <h3 className="text-lg font-bold text-[#f0ebe1] mb-4">Identity & Safety Preferences (Optional)</h3>
                  <p className="text-sm text-[#b8ccde] mb-4">This information helps us provide a safer and more inclusive community. All information is kept confidential.</p>

                  {/* Female Identifying Checkbox */}
                  <div className="flex items-center gap-3 p-4 bg-[#f0ebe1] rounded-lg border-2 border-[#f0a824] mb-4">
                    <input
                      type="checkbox"
                      id="femaleIdentifying"
                      checked={isFemaleIdentifying}
                      onChange={(e) => {
                        setIsFemaleIdentifying(e.target.checked);
                        setFormData(prev => ({ ...prev, femaleIdentifying: e.target.checked }));
                      }}
                      className="w-5 h-5 text-[#f0a824] rounded focus:ring-2 focus:ring-[#f0a824] cursor-pointer"
                    />
                    <label htmlFor="femaleIdentifying" className="text-black font-semibold cursor-pointer flex-1">
                      👩 I identify as female
                    </label>
                  </div>
                  <p className="text-xs text-[#b8ccde] ml-9 mb-4">You may be matched with female-identifying drivers for added comfort and safety</p>

                  {/* 2SLGBTQIA+ Checkbox */}
                  <div className="flex items-center gap-3 p-4 bg-[#f0ebe1] rounded-lg border-2 border-[#f0a824] mb-4">
                    <input
                      type="checkbox"
                      id="lgbtqiaIdentifying"
                      checked={is2SLgbtqia}
                      onChange={(e) => {
                        setIs2SLgbtqia(e.target.checked);
                        setFormData(prev => ({ ...prev, lgbtqiaIdentifying: e.target.checked }));
                      }}
                      className="w-5 h-5 text-[#f0a824] rounded focus:ring-2 focus:ring-[#f0a824] cursor-pointer"
                    />
                    <label htmlFor="lgbtqiaIdentifying" className="text-black font-semibold cursor-pointer flex-1">
                      🌈 I identify as 2SLGBTQIA+
                    </label>
                  </div>

                  {is2SLgbtqia && (
                    <div className="ml-9 mb-4 p-4 bg-[#f0ebe1] rounded-lg border-2 border-[#f0a824]">
                      <label className="block text-black font-semibold mb-3">Please select your identity (optional):</label>
                      <div className="space-y-2">
                        {[{ value: 'lesbian', label: 'Lesbian' },
                          { value: 'gay', label: 'Gay' },
                          { value: 'bisexual', label: 'Bisexual' },
                          { value: 'transgender', label: 'Transgender' },
                          { value: 'non-binary', label: 'Non-Binary' },
                          { value: 'asexual', label: 'Asexual' },
                          { value: 'pansexual', label: 'Pansexual' },
                          { value: 'queer', label: 'Queer' },
                          { value: 'questioning', label: 'Questioning' },
                          { value: 'two-spirit', label: 'Two-Spirit' },
                          { value: 'prefer-not-to-say', label: 'Prefer Not To Say' },
                          { value: 'other', label: 'Other' }
                        ].map(option => (
                          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="lgbtqiaIdentity"
                              value={option.value}
                              checked={formData.lgbtqiaIdentity === option.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-[#f0a824]"
                            />
                            <span className="text-black">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-[black] mt-3">This helps us connect you with like-minded community members and offer inclusive safety features</p>
                    </div>
                  )}
                </div>

                {/* Driver Checkbox */}
                <div className="flex items-center gap-3 p-4 bg-[#f0ebe1] rounded-lg border-2 border-[#b8ccde]">
                  <input
                    type="checkbox"
                    id="isDriver"
                    checked={isDriver}
                    onChange={(e) => setIsDriver(e.target.checked)}
                    className="w-5 h-5 text-[#f0a824] rounded focus:ring-2 focus:ring-[#f0a824] cursor-pointer"
                  />
                  <label htmlFor="isDriver" className="text-black font-semibold cursor-pointer flex-1">
                    I want to offer rides as a driver
                  </label>
                </div>

                {/* Driver Specific Fields */}
                {isDriver && (
                  <div className="space-y-6 p-6 bg-[#f0ebe1] rounded-lg border-2 border-[#b8ccde]">
                    <h3 className="text-lg font-bold text-black">Driver Verification Information</h3>

                    <div>
                      <label className="block text-black font-semibold mb-2">License Plate</label>
                      <input
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleChange}
                        placeholder="NSM 123 AB"
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                        required={isDriver}
                      />
                    </div>

                    <div>
                      <label className="block text-black font-semibold mb-2">Vehicle Type</label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                        required={isDriver}
                      >
                        <option value="">Select your vehicle type</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                        <option value="hatchback">Hatchback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-black font-semibold mb-2">Insurance Provider</label>
                      <input
                        type="text"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleChange}
                        placeholder="e.g., CAA, Intact, etc."
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                        required={isDriver}
                      />
                    </div>

                    <div>
                      <label className="block text-black font-semibold mb-2">Insurance Policy Number</label>
                      <input
                        type="text"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={handleChange}
                        placeholder="Your policy number"
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#f0ebe1] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                        required={isDriver}
                      />
                    </div>

                    {/* Insurance Upload */}
                    <div className="border-2 border-dashed border-[#f0a824] rounded-lg p-6 text-center bg-[#22477a]">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          {insuranceUploaded ? (
                            <>
                              <Check className="w-8 h-8 text-[#f0a824]" />
                              <span className="text-[#f0a824] font-semibold">Insurance Proof Uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-[#f0a824]" />
                              <span className="text-[#f0ebe1] font-semibold">Upload Insurance Proof</span>
                              <span className="text-sm text-[#b8ccde]">(Insurance certificate or policy document)</span>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, 'insuranceFile')}
                          className="hidden"
                          required={isDriver}
                        />
                      </label>
                    </div>

                    {/* License Upload */}
                    <div className="border-2 border-dashed border-[#f0a824] rounded-lg p-6 text-center bg-[#22477a]">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          {licenseUploaded ? (
                            <>
                              <Check className="w-8 h-8 text-[#f0a824]" />
                              <span className="text-[#f0a824] font-semibold">Driver License Uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-[#f0a824]" />
                              <span className="text-[#f0ebe1] font-semibold">Upload Driver License</span>
                              <span className="text-sm text-[#b8ccde]">(Front and back photos or scan)</span>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleLicenseUpload}
                          className="hidden"
                          required={isDriver}
                        />
                      </label>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#f0a824] text-[#f0ebe1] py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
                >
                  Create Account
                </button>
              </>
            )}
          </div>

          <p className="text-center text-black text-sm mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        <QRCodePopup />
        <div className="text-center py-8 text-[#f0ebe1] border-t border-[#b8ccde] mt-12">
          <p>© 2025 NS Move. Building a sustainable future together.</p>
        </div>
      </div>
    </div>
    </>
  );
}
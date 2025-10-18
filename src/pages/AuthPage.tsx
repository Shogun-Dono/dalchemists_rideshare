import { useState } from 'react';
import { Mail, Lock, User, Upload, Check, Eye, EyeOff } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function AuthPage() {
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
    if (file) {
      setLicenseUploaded(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(isLogin ? 'Login successful!' : 'Sign up successful!');
  };

  return (
    <>
    <NavBar></NavBar>
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">NS Move</h1>
          <p className="text-indigo-100 text-lg">
            {isLogin ? 'Welcome Back' : 'Join Our Community'}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Tab Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                !isLogin
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isLogin
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Login
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {isLogin ? (
              // LOGIN FORM
              <>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:from-indigo-700 hover:to-blue-700"
                >
                  Sign In
                </button>
              </>
            ) : (
              // SIGN UP FORM
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(902) 555-0123"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* ID Upload */}
                <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center bg-indigo-50">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      {idUploaded ? (
                        <>
                          <Check className="w-8 h-8 text-green-600" />
                          <span className="text-green-600 font-semibold">ID Uploaded</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-indigo-600" />
                          <span className="text-gray-700 font-semibold">Upload Government ID</span>
                          <span className="text-sm text-gray-600">(Driver's License, Passport, etc.)</span>
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
                <div className="border-2 border-pink-200 rounded-lg p-6 bg-pink-50">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Identity & Safety Preferences (Optional)</h3>
                  <p className="text-sm text-gray-600 mb-4">This information helps us provide a safer and more inclusive community. All information is kept confidential.</p>

                  {/* Female Identifying Checkbox */}
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-pink-300 mb-4">
                    <input
                      type="checkbox"
                      id="femaleIdentifying"
                      checked={isFemaleIdentifying}
                      onChange={(e) => {
                        setIsFemaleIdentifying(e.target.checked);
                        setFormData(prev => ({
                          ...prev,
                          femaleIdentifying: e.target.checked
                        }));
                      }}
                      className="w-5 h-5 text-pink-600 rounded focus:ring-2 focus:ring-pink-600 cursor-pointer"
                    />
                    <label htmlFor="femaleIdentifying" className="text-gray-800 font-semibold cursor-pointer flex-1">
                      👩 I identify as female-identifying
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 ml-9 mb-4">You may be matched with female-identifying drivers for added comfort and safety</p>

                  {/* 2SLGBTQIA+ Checkbox */}
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-purple-300 mb-4">
                    <input
                      type="checkbox"
                      id="lgbtqiaIdentifying"
                      checked={is2SLgbtqia}
                      onChange={(e) => {
                        setIs2SLgbtqia(e.target.checked);
                        setFormData(prev => ({
                          ...prev,
                          lgbtqiaIdentifying: e.target.checked
                        }));
                      }}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600 cursor-pointer"
                    />
                    <label htmlFor="lgbtqiaIdentifying" className="text-gray-800 font-semibold cursor-pointer flex-1">
                      🌈 I identify as 2SLGBTQIA+
                    </label>
                  </div>

                  {/* 2SLGBTQIA+ Identity Selection */}
                  {is2SLgbtqia && (
                    <div className="ml-9 mb-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <label className="block text-gray-700 font-semibold mb-3">Please select your identity (optional):</label>
                      <div className="space-y-2">
                        {[
                          { value: 'lesbian', label: 'Lesbian' },
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
                              className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-3">This helps us connect you with like-minded community members and offer inclusive safety features</p>
                    </div>
                  )}
                </div>

                {/* Driver Checkbox */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <input
                    type="checkbox"
                    id="isDriver"
                    checked={isDriver}
                    onChange={(e) => setIsDriver(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                  />
                  <label htmlFor="isDriver" className="text-gray-800 font-semibold cursor-pointer flex-1">
                    I want to offer rides as a driver
                  </label>
                </div>

                {/* Driver Specific Fields */}
                {isDriver && (
                  <div className="space-y-6 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                    <h3 className="text-lg font-bold text-gray-800">Driver Verification Information</h3>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">License Plate</label>
                      <input
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleChange}
                        placeholder="NSM 123 AB"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                        required={isDriver}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Vehicle Type</label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
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
                      <label className="block text-gray-700 font-semibold mb-2">Insurance Provider</label>
                      <input
                        type="text"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleChange}
                        placeholder="e.g., CAA, Intact, etc."
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                        required={isDriver}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Insurance Policy Number</label>
                      <input
                        type="text"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={handleChange}
                        placeholder="Your policy number"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                        required={isDriver}
                      />
                    </div>

                    {/* Insurance Document Upload */}
                    <div className="border-2 border-dashed border-green-400 rounded-lg p-6 text-center bg-green-100">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          {insuranceUploaded ? (
                            <>
                              <Check className="w-8 h-8 text-green-600" />
                              <span className="text-green-600 font-semibold">Insurance Proof Uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-green-600" />
                              <span className="text-gray-700 font-semibold">Upload Insurance Proof</span>
                              <span className="text-sm text-gray-600">(Insurance certificate or policy document)</span>
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

                    {/* Driver License Upload */}
                    <div className="border-2 border-dashed border-orange-400 rounded-lg p-6 text-center bg-orange-100">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          {licenseUploaded ? (
                            <>
                              <Check className="w-8 h-8 text-orange-600" />
                              <span className="text-orange-600 font-semibold">Driver License Uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-orange-600" />
                              <span className="text-gray-700 font-semibold">Upload Driver License</span>
                              <span className="text-sm text-gray-600">(Front and back photos or scan)</span>
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
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:from-indigo-700 hover:to-blue-700"
                >
                  Create Account
                </button>
              </>
            )}
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-600 text-sm mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
         {/* Footer */}
            <div className="text-center py-8 text-indigo-100 border-t border-white border-opacity-20 mt-12">
                <p>© 2025 NS Move. Building a sustainable future together.</p>
            </div>
      </div>
    </div>
    
    </>
  );
}
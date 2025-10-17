import { Users, Leaf, Shield, Award } from "lucide-react";
import Navbar from "../components/NavBar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
      <Navbar></Navbar>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About NS Move
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Revolutionizing community transportation in Nova Scotia through
            sustainable, affordable, and reliable ridesharing.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 mb-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            NS Move is dedicated to solving the first/last-mile transportation
            challenge that affects over 12.5% of Nova Scotia families living at
            or below the poverty line. We provide an innovative,
            community-driven rideshare platform that connects commuters with
            local drivers heading to major transit hubs like Bridge
            Terminal—especially during winter or when walking alone feels
            unsafe.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our platform prioritizes affordability, safety, and community
            connection by rewarding both riders and drivers with local vendor
            incentives (fuel discounts, grocery rewards, etc). We believe
            transportation access shouldn't depend on personal wealth or car
            ownership.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in 2025, NS Move has grown to serve thousands of residents
            across Nova Scotia, making every journey count towards a more
            equitable and sustainable transportation system.
          </p>
        </div>

        {/* Impact Stats Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Our Impact This Month
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">2,847</h3>
              <p className="text-gray-700 font-semibold mb-2">Rides Shared</p>
              <p className="text-green-600 font-bold text-sm">
                +12% this month
              </p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                18.5 tons
              </h3>
              <p className="text-gray-700 font-semibold mb-2">CO₂ Saved</p>
              <p className="text-green-600 font-bold text-sm">
                Environmental impact
              </p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">$42,150</h3>
              <p className="text-gray-700 font-semibold mb-2">
                Community Savings
              </p>
              <p className="text-green-600 font-bold text-sm">
                Total saved by riders
              </p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">1,240</h3>
              <p className="text-gray-700 font-semibold mb-2">Cars Off Road</p>
              <p className="text-green-600 font-bold text-sm">
                Reduced congestion
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Community First
              </h3>
              <p className="text-gray-700">
                We prioritize the needs of households living at or below the
                poverty line, removing barriers to employment, education, and
                healthcare access through affordable transportation.
              </p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <Leaf className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Sustainability
              </h3>
              <p className="text-gray-700">
                Every shared ride reduces congestion and carbon emissions. By
                keeping cars off the road, we're building a cleaner Nova Scotia
                for future generations.
              </p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <Shield className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Safety & Trust
              </h3>
              <p className="text-gray-700">
                QR-based pairing verification, safety pings, and
                female-identifying pairing options ensure every journey is
                secure. Privacy by design—no personal data collection.
              </p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Local Rewards
              </h3>
              <p className="text-gray-700">
                Our incentive system connects riders and drivers with local
                vendors—fuel points, grocery discounts, and community engagement
                that strengthens neighborhoods.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 shadow-2xl mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            How NS Move Works
          </h2>

          {/* Rider Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl mr-4">
                👤
              </div>
              <h3 className="text-3xl font-bold text-gray-800">For Riders</h3>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    How It Works
                  </h4>
                  <ol className="text-gray-700 space-y-3">
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        1
                      </span>
                      <span>
                        Open app and select your transit hub (e.g., Bridge
                        Terminal)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        2
                      </span>
                      <span>Browse nearby drivers heading to the same hub</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        3
                      </span>
                      <span>
                        Select a driver and pair via QR code verification
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        4
                      </span>
                      <span>
                        Optionally request a grocery stop along the way
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        5
                      </span>
                      <span>Complete your journey safely and securely</span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    What You Receive
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        💰 Grocery Token
                      </p>
                      <p className="text-sm text-gray-600">
                        Earn discounts at partner grocery vendors with every
                        completed trip
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        🛡️ Safe Journey
                      </p>
                      <p className="text-sm text-gray-600">
                        Safety pings alert you if route deviates, with direct
                        admin support
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        💵 Cost Savings
                      </p>
                      <p className="text-sm text-gray-600">
                        Affordable rides with no surge pricing—designed for
                        those on tight budgets
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        👩‍🤝‍👩 Choice & Privacy
                      </p>
                      <p className="text-sm text-gray-600">
                        Option for female-identifying riders to match with
                        female drivers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-2xl mr-4">
                🚗
              </div>
              <h3 className="text-3xl font-bold text-gray-800">For Drivers</h3>
            </div>
            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    How It Works
                  </h4>
                  <ol className="text-gray-700 space-y-3">
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        1
                      </span>
                      <span>
                        Go online and set your hub destination and availability
                        window
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        2
                      </span>
                      <span>See nearby rider requests heading to your hub</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        3
                      </span>
                      <span>
                        Accept requests and display your QR code for
                        verification
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        4
                      </span>
                      <span>Give riders a safe ride to their destination</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        5
                      </span>
                      <span>Complete the trip and collect your rewards</span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    What You Receive
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        ⛽ Fuel Token
                      </p>
                      <p className="text-sm text-gray-600">
                        Earn fuel discounts at partner gas stations for every
                        completed ride
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        💚 Give Back
                      </p>
                      <p className="text-sm text-gray-600">
                        Help community members reach employment, education, and
                        healthcare
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        🌍 Reduce Emissions
                      </p>
                      <p className="text-sm text-gray-600">
                        Earn environmental credits while reducing your carbon
                        footprint
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                      <p className="font-semibold text-gray-800 mb-1">
                        🤝 Build Community
                      </p>
                      <p className="text-sm text-gray-600">
                        Connect with neighbors and strengthen local connections
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Features Section */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 shadow-2xl mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Safety & Privacy First
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                QR Verification
              </h3>
              <p className="text-gray-700">
                Physical QR code confirmation ensures authentic pairing between
                riders and drivers.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👩‍🤝‍👩</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Female-Only Pairing
              </h3>
              <p className="text-gray-700">
                Female-identifying riders can opt for female drivers for added
                comfort and security.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                No Personal Data
              </h3>
              <p className="text-gray-700">
                Aliases only—no real IDs or personal information collected.
                Privacy by design.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to Join NS Move?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Be part of the ridesharing revolution in Nova Scotia.
          </p>
          <button className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all hover:from-indigo-700 hover:to-blue-700">
            Get Started Today →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-indigo-100 border-t border-white border-opacity-20 mt-12">
        <p>© 2025 NS Move. Building a sustainable future together..</p>
      </div>
    </div>
  );
}

import { Users, Leaf, Shield, Award } from "lucide-react";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import QRCodePopup from "../components/QRCodePopup";

export default function AboutPage() {
  const cardBase =
    "rounded-3xl p-8 text-center shadow-md hover:shadow-lg transition-all transform hover:scale-105 bg-[#b8ccde] text-[#000000]";
  const sectionDark =
    "rounded-3xl p-12 shadow-xl bg-[#22477a] text-[#f0ebe1]";
  const sectionLight =
    "rounded-3xl p-12 shadow-xl bg-[#f0ebe1] text-[#000000]";
  const valueCard =
    "rounded-2xl p-8 shadow-md hover:shadow-lg transition-all bg-[#b8ccde]";
  const borderBox =
    "bg-[#f0ebe1] rounded-lg p-4 border-l-4 shadow-sm text-[#000000]";

  return (
    <div className="min-h-screen bg-[#f0ebe1] text-[#000000]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#22477a] text-[#f0ebe1] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About NS Move</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Revolutionizing community transportation in Nova Scotia through
            sustainable, affordable, and reliable ridesharing.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Mission Section */}
        <div className={sectionLight}>
          <h2 className="text-4xl font-bold text-[#22477a] mb-6">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            NS Move is dedicated to solving the first/last-mile transportation
            challenge that affects over 12.5% of Nova Scotia families living at
            or below the poverty line. We provide an innovative,
            community-driven rideshare platform that connects commuters with
            local drivers heading to major transit hubs like Bridge Terminal.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Our platform prioritizes affordability, safety, and community
            connection by rewarding both riders and drivers with local vendor
            incentives. We believe transportation access shouldn't depend on
            personal wealth or car ownership.
          </p>
          <p className="text-lg leading-relaxed">
            Founded in 2025, NS Move has grown to serve thousands of residents
            across Nova Scotia, making every journey count toward a more
            equitable and sustainable transportation system.
          </p>
        </div>

        {/* Impact Section */}
        <div className={sectionDark}>
          <h2 className="text-4xl font-bold mb-8 text-center text-[#f0a824]">
            Our Impact This Month
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "🚗", stat: "2,847", label: "Rides Shared" },
              { icon: "🌱", stat: "18.5 tons", label: "CO₂ Saved" },
              { icon: "💰", stat: "$42,150", label: "Community Savings" },
              { icon: "🚙", stat: "1,240", label: "Cars Off Road" },
            ].map((item, i) => (
              <div key={i} className={cardBase}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#22477a] mb-2">
                  {item.stat}
                </h3>
                <p className="font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className={sectionLight}>
          <h2 className="text-4xl font-bold text-[#22477a] mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12 text-[#22477a] mb-4" />,
                title: "Community First",
                text: "We prioritize the needs of low-income households, removing barriers to employment, education, and healthcare access through affordable transportation.",
              },
              {
                icon: <Leaf className="w-12 h-12 text-[#f0a824] mb-4" />,
                title: "Sustainability",
                text: "Every shared ride reduces congestion and emissions. We're building a cleaner Nova Scotia for future generations.",
              },
              {
                icon: <Shield className="w-12 h-12 text-[#22477a] mb-4" />,
                title: "Safety & Trust",
                text: "QR verification, safety pings, and privacy-first pairing options ensure secure and comfortable journeys.",
              },
              {
                icon: <Award className="w-12 h-12 text-[#f0a824] mb-4" />,
                title: "Local Rewards",
                text: "Our incentive system connects riders and drivers with local vendors for fuel and grocery discounts.",
              },
            ].map((v, i) => (
              <div key={i} className={valueCard}>
                {v.icon}
                <h3 className="text-2xl font-bold text-[#22477a] mb-3">
                  {v.title}
                </h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className={sectionDark}>
          <h2 className="text-4xl font-bold text-[#f0a824] mb-8 text-center">
            How NS Move Works
          </h2>

          {/* Riders */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-2xl mr-4">
                👤
              </div>
              <h3 className="text-3xl font-bold text-[#f0ebe1]">For Riders</h3>
            </div>
            <div className="bg-[#b8ccde] rounded-2xl p-8 border-2 border-[#f0a824]/40 text-[#000000]">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-[#22477a] mb-3">
                    How It Works
                  </h4>
                  <ol className="space-y-3">
                    {[
                      "Open app and select your transit hub",
                      "Browse nearby drivers heading to the same hub",
                      "Select a driver and pair via QR verification",
                      "Optionally request a grocery stop",
                      "Complete your journey safely",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-white bg-[#22477a] rounded-full w-7 h-7 flex items-center justify-center mr-3 text-sm font-bold">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#22477a] mb-3">
                    What You Receive
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        color: "#22477a",
                        label: "💰 Grocery Token",
                        desc: "Earn discounts at partner grocery vendors with every trip.",
                      },
                      {
                        color: "#22477a",
                        label: "🛡️ Safe Journey",
                        desc: "Safety pings and admin alerts for route deviations.",
                      },
                      {
                        color: "#22477a",
                        label: "💵 Cost Savings",
                        desc: "Affordable rides with no surge pricing.",
                      },
                      {
                        color: "#22477a",
                        label: "👩‍🤝‍👩 Choice & Privacy",
                        desc: "Option for female-identifying riders to match with female drivers.",
                      },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className={borderBox}
                        style={{ borderLeftColor: b.color }}
                      >
                        <p className="font-semibold mb-1">{b.label}</p>
                        <p className="text-sm opacity-90">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drivers */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-2xl mr-4">
                🚗
              </div>
              <h3 className="text-3xl font-bold text-[#f0ebe1]">For Drivers</h3>
            </div>
            <div className="bg-[#b8ccde] rounded-2xl p-8 border-2 border-[#f0a824]/40 text-[#000000]">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-[#22477a] mb-3">
                    How It Works
                  </h4>
                  <ol className="space-y-3">
                    {[
                      "Set your hub destination and availability",
                      "See nearby rider requests",
                      "Accept requests and display QR code",
                      "Provide safe rides to destinations",
                      "Complete trip and earn rewards",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-white bg-[#f0a824] rounded-full w-7 h-7 flex items-center justify-center mr-3 text-sm font-bold">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#22477a] mb-3">
                    What You Receive
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        color: "#f0a824",
                        label: "⛽ Fuel Token",
                        desc: "Earn fuel discounts at partner gas stations.",
                      },
                      {
                        color: "#f0a824",
                        label: "💚 Give Back",
                        desc: "Help community members access essential services.",
                      },
                      {
                        color: "#f0a824",
                        label: "🌍 Reduce Emissions",
                        desc: "Lower your carbon footprint and earn credits.",
                      },
                      {
                        color: "#f0a824",
                        label: "🤝 Build Community",
                        desc: "Connect with neighbors and strengthen local ties.",
                      },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className={borderBox}
                        style={{ borderLeftColor: b.color }}
                      >
                        <p className="font-semibold mb-1">{b.label}</p>
                        <p className="text-sm opacity-90">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Section */}
        <div className={sectionLight}>
          <h2 className="text-4xl font-bold text-[#22477a] mb-8 text-center">
            Safety & Privacy First
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🔐",
                title: "QR Verification",
                text: "Ensures authentic pairing between riders and drivers.",
              },
              {
                icon: "👩‍🤝‍👩",
                title: "Female-Only Pairing",
                text: "Added comfort and security for female-identifying riders.",
              },
              {
                icon: "🛡️",
                title: "No Personal Data",
                text: "Aliases only—no real IDs or personal info collected.",
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#22477a] mb-3">
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#22477a] rounded-3xl p-12 text-center shadow-xl text-[#f0ebe1]">
          <h2 className="text-4xl font-bold mb-4">Ready to Join NS Move?</h2>
          <p className="text-lg mb-8 opacity-90">
            Be part of the ridesharing revolution in Nova Scotia.
          </p>
          <Link
            to="/auth"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block bg-[#f0a824] text-[#000000] px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#b8ccde] transition-all"
          >
            Get Started Today →
          </Link>
        </div>
      </div>

      <QRCodePopup />

      {/* Footer */}
      <div className="text-center py-8 bg-[#22477a] text-[#f0ebe1] mt-12">
        <p>© 2025 NS Move. Building a sustainable future together.</p>
      </div>
    </div>
  );
}

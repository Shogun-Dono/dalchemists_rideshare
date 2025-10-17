import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { getRides } from "./UserDashboard";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Helper function to fetch coordinates using OpenStreetMap’s Nominatim API
async function getCoordinates(location) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`
  );
  const data = await response.json();
  if (data.length === 0) return null;
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

export default function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState(1);
  const [message, setMessage] = useState("");
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);

  const rides = getRides();
  const ride = rides.find((r) => r.id === Number(id));

  // Fetch map coordinates for both locations when component loads
  useEffect(() => {
    if (ride) {
      (async () => {
        const from = await getCoordinates(ride.from);
        const to = await getCoordinates(ride.to);
        setFromCoords(from);
        setToCoords(to);
      })();
    }
  }, [ride]);

  if (!ride) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Ride Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The ride you're looking for doesn't exist.
              </p>
              <button
                onClick={() => navigate("/user")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleRequestRide = () => {
    if (passengers > ride.seats) {
      alert(`Only ${ride.seats} seats are available.`);
      return;
    }
    alert(
      `Ride request sent! You've requested ${passengers} seat(s) for the ride from ${ride.from} to ${ride.to}.`
    );
    navigate("/user");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/user")}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Available Rides
          </button>

          {/* Ride Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Ride Details
            </h1>

            {/* Driver Info */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {ride.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {ride.driver}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-600">
                    4.9 (47 reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Route Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-lg">📍</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">
                        Pickup Location
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {ride.from}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 border-l-2 border-dashed border-gray-300 h-8"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-lg">📍</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">
                        Drop-off Location
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {ride.to}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaflet Map */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Route Map
                </h3>
                <div className="h-96 w-full rounded-lg overflow-hidden">
                  {fromCoords && toCoords ? (
                    <MapContainer
                      center={fromCoords}
                      zoom={9}
                      scrollWheelZoom={true}
                      className="h-full w-full"
                    >
                      <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={fromCoords}>
                        <Popup>Pickup: {ride.from}</Popup>
                      </Marker>
                      <Marker position={toCoords}>
                        <Popup>Drop-off: {ride.to}</Popup>
                      </Marker>
                      <Polyline
                        positions={[fromCoords, toCoords]}
                        color="blue"
                      />
                    </MapContainer>
                  ) : (
                    <p className="text-gray-500 text-center mt-8">
                      Loading map...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Request Ride Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Request This Ride
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Passengers
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  {Array.from({ length: ride.seats }, (_, i) => i + 1).map(
                    (num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "passenger" : "passengers"}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to Driver (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Let the driver know any special requests or information..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
              <button
                onClick={handleRequestRide}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-lg"
              >
                Send Ride Request
              </button>
              <p className="text-xs text-gray-500 text-center">
                The driver will receive your request and contact you to confirm
                the details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

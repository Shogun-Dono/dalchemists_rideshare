import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../components/NavBar";

interface HeatmapData {
  area: string;
  lat: number;
  lng: number;
  rides: number;
  intensity: number;
}

interface RideConnection {
  fromArea: string;
  toArea: string;
}

type ViewType = "map" | "bar" | "pie" | "line" | "histogram";

const getFromHeatColor = (intensity: number) => {
  if (intensity >= 70) return "#dc2626"; // red
  if (intensity >= 50) return "#f97316"; // orange/yellow
  if (intensity >= 30) return "#eab308"; // yellow
  return "#22c55e"; // green
};

const getToHeatColor = (intensity: number) => {
  if (intensity >= 70) return "#6b21a8"; // purple
  if (intensity >= 50) return "#2563eb"; // blue
  return "#60a5fa"; // light blue
};

const RidesHeatmapWithStraightLines = ({
  ridesFrom,
  ridesTo,
  connections,
}: {
  ridesFrom: HeatmapData[];
  ridesTo: HeatmapData[];
  connections: RideConnection[];
}) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [44.6488, -63.5752],
        zoom: 11,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current);
    } else {
      mapRef.current.eachLayer((layer) => {
        if (
          layer instanceof L.Circle ||
          layer instanceof L.CircleMarker ||
          layer instanceof L.Polyline
        ) {
          mapRef.current!.removeLayer(layer);
        }
      });
    }

    const findPoint = (areaName: string, list: HeatmapData[]) =>
      list.find((p) => p.area === areaName);

    ridesFrom.forEach((point) => {
      const color = getFromHeatColor(point.intensity);
      const radius = 200 + point.intensity * 10;

      L.circle([point.lat, point.lng], {
        color,
        fillColor: color,
        fillOpacity: 0.3,
        radius,
        weight: 2,
      }).addTo(mapRef.current!);

      const marker = L.circleMarker([point.lat, point.lng], {
        radius: 8,
        fillColor: color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="text-align: center; padding: 4px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color:#166534;">From: ${point.area}</h3>
          <p style="margin: 0; font-size: 14px;"><strong>${point.rides}</strong> rides</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Intensity: ${point.intensity}%</p>
        </div>
      `);

      marker.bindTooltip(point.area, {
        permanent: true,
        offset: [12, 0],
        direction: "right",
        className: "from-label",
      });

      marker.on("mouseover", () => marker.openPopup());
    });

    ridesTo.forEach((point) => {
      const color = getToHeatColor(point.intensity);
      const radius = 200 + point.intensity * 10;

      L.circle([point.lat, point.lng], {
        color,
        fillColor: color,
        fillOpacity: 0.3,
        radius,
        weight: 2,
      }).addTo(mapRef.current!);

      const marker = L.circleMarker([point.lat, point.lng], {
        radius: 8,
        fillColor: color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="text-align: center; padding: 4px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color:#1e3a8a;">To: ${point.area}</h3>
          <p style="margin: 0; font-size: 14px;"><strong>${point.rides}</strong> rides</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Intensity: ${point.intensity}%</p>
        </div>
      `);

      marker.bindTooltip(point.area, {
        permanent: true,
        offset: [12, 0],
        direction: "right",
        className: "to-label",
      });

      marker.on("mouseover", () => marker.openPopup());
    });

    connections.forEach(({ fromArea, toArea }) => {
      const fromPoint = findPoint(fromArea, ridesFrom);
      const toPoint = findPoint(toArea, ridesTo);

      if (fromPoint && toPoint) {
        L.polyline(
          [
            [fromPoint.lat, fromPoint.lng],
            [toPoint.lat, toPoint.lng],
          ],
          {
            color: "#6b7280",
            weight: 3,
            opacity: 0.7,
            dashArray: "8, 6",
            lineJoin: "round",
          }
        ).addTo(mapRef.current!);
      }
    });

    setTimeout(() => mapRef.current!.invalidateSize(), 100);

    return () => {
      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          if (
            layer instanceof L.Circle ||
            layer instanceof L.CircleMarker ||
            layer instanceof L.Polyline
          ) {
            mapRef.current!.removeLayer(layer);
          }
        });
      }
    };
  }, [ridesFrom, ridesTo, connections]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Interactive Ride Activity Heatmap with Multiple Connections
      </h2>
      <div
        id="map"
        style={{
          height: "600px",
          borderRadius: "8px",
          border: "2px solid #e5e7eb",
          width: "100%",
        }}
      ></div>
      <style>{`
        .from-label {
          background-color: #d1fae5;
          color: #065f46;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
        }
        .to-label {
          background-color: #dbeafe;
          color: #1e3a8a;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
        }
        .legend-container {
          display: flex;
          gap: 20px;
          margin-top: 12px;
          font-size: 14px;
          color: #4b5563;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legend-color-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid #9ca3af;
        }
        .from-green { background-color: #22c55e; }
        .from-yellow { background-color: #eab308; }
        .from-orange { background-color: #f97316; }
        .from-red { background-color: #dc2626; }
        .to-lightblue { background-color: #60a5fa; }
        .to-blue { background-color: #2563eb; }
        .to-purple { background-color: #6b21a8; }
      `}</style>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>💡 Tip:</strong> Click and drag to pan. Scroll to zoom. Hover
          over markers for details. Multiple lines connect one 'from' to many
          'to' rides.
        </p>
      </div>
      {/* Legend */}
      <div className="legend-container">
        <div className="legend-item">
          <div className="legend-color-box from-green"></div> Rides From - Low
          (Green)
        </div>
        <div className="legend-item">
          <div className="legend-color-box from-yellow"></div> Medium (Yellow)
        </div>
        <div className="legend-item">
          <div className="legend-color-box from-orange"></div> High (Orange)
        </div>
        <div className="legend-item">
          <div className="legend-color-box from-red"></div> Very High (Red)
        </div>
        <div className="legend-item" style={{ marginLeft: "30px" }}>
          <div className="legend-color-box to-lightblue"></div> Rides To - Low
          (Light Blue)
        </div>
        <div className="legend-item">
          <div className="legend-color-box to-blue"></div> Medium (Blue)
        </div>
        <div className="legend-item">
          <div className="legend-color-box to-purple"></div> High (Purple)
        </div>
      </div>
    </div>
  );
};

// Chart components reused from before:

const RidesByAreaChart = ({ data }: { data: any[] }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rides by Area</h2>
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="area" angle={-45} textAnchor="end" height={120} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rides" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const TimeDistributionChart = ({ data }: { data: any[] }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Rides by Time of Day
    </h2>
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const WeeklyTrendsChart = ({ data }: { data: any[] }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Weekly Ride Trends
    </h2>
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="rides"
          stroke="#3b82f6"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const DistanceHistogramChart = ({ data }: { data: any[] }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Ride Distance Distribution
    </h2>
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#ec4899" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("week");
  const [activeView, setActiveView] = useState<ViewType>("map");

  const ridesFrom: HeatmapData[] = [
    {
      area: "Downtown Halifax",
      lat: 44.6488,
      lng: -63.5752,
      rides: 450,
      intensity: 90,
    },
    { area: "North End", lat: 44.66, lng: -63.59, rides: 320, intensity: 64 },
    { area: "Dartmouth", lat: 44.671, lng: -63.569, rides: 380, intensity: 76 },
    { area: "Bedford", lat: 44.729, lng: -63.647, rides: 190, intensity: 38 },
    { area: "Sackville", lat: 44.77, lng: -63.68, rides: 150, intensity: 30 },
  ];

  const ridesTo: HeatmapData[] = [
    { area: "South End", lat: 44.63, lng: -63.57, rides: 280, intensity: 56 },
    { area: "West End", lat: 44.645, lng: -63.6, rides: 210, intensity: 42 },
    {
      area: "Clayton Park",
      lat: 44.657,
      lng: -63.637,
      rides: 240,
      intensity: 48,
    },
    { area: "Fairview", lat: 44.674, lng: -63.65, rides: 200, intensity: 80 },
    { area: "Spryfield", lat: 44.622, lng: -63.614, rides: 160, intensity: 32 },
  ];

  // Multiple connections per 'fromArea' supported here:
  const connections: RideConnection[] = [
    { fromArea: "Downtown Halifax", toArea: "South End" },
    { fromArea: "Downtown Halifax", toArea: "West End" },
    { fromArea: "North End", toArea: "West End" },
    { fromArea: "North End", toArea: "Clayton Park" },
    { fromArea: "Dartmouth", toArea: "Clayton Park" },
    { fromArea: "Bedford", toArea: "Fairview" },
    { fromArea: "Sackville", toArea: "Spryfield" },
  ];

  const heatmapData = [...ridesFrom, ...ridesTo];

  const ridesByArea = heatmapData
    .map((d) => ({
      area: d.area,
      rides: d.rides,
    }))
    .sort((a, b) => b.rides - a.rides);

  const timeDistribution = [
    { name: "Morning (6-9 AM)", value: 320, color: "#3b82f6" },
    { name: "Midday (9-3 PM)", value: 450, color: "#8b5cf6" },
    { name: "Evening (3-7 PM)", value: 580, color: "#ec4899" },
    { name: "Night (7-12 PM)", value: 280, color: "#f59e0b" },
    { name: "Late Night (12-6 AM)", value: 90, color: "#6b7280" },
  ];

  const ridesOverTime = [
    { day: "Mon", rides: 240, revenue: 3600 },
    { day: "Tue", rides: 280, revenue: 4200 },
    { day: "Wed", rides: 310, revenue: 4650 },
    { day: "Thu", rides: 290, revenue: 4350 },
    { day: "Fri", rides: 420, revenue: 6300 },
    { day: "Sat", rides: 480, revenue: 7200 },
    { day: "Sun", rides: 340, revenue: 5100 },
  ];

  const rideDistances = [
    { range: "0-5 km", count: 420 },
    { range: "5-10 km", count: 580 },
    { range: "10-15 km", count: 340 },
    { range: "15-20 km", count: 180 },
    { range: "20+ km", count: 90 },
  ];

  const filteredFrom = ridesFrom.filter((item) => {
    const matchesSearch = item.area
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "high" && item.rides > 300) ||
      (selectedFilter === "medium" && item.rides >= 200 && item.rides <= 300) ||
      (selectedFilter === "low" && item.rides < 200);
    return matchesSearch && matchesFilter;
  });

  const filteredTo = ridesTo.filter((item) => {
    const matchesSearch = item.area
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "high" && item.rides > 300) ||
      (selectedFilter === "medium" && item.rides >= 200 && item.rides <= 300) ||
      (selectedFilter === "low" && item.rides < 200);
    return matchesSearch && matchesFilter;
  });

  const filteredConnections = connections.filter(
    ({ fromArea, toArea }) =>
      filteredFrom.some((f) => f.area === fromArea) &&
      filteredTo.some((t) => t.area === toArea)
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Halifax Regional Municipality - Rideshare Analytics
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Location
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Areas</option>
                  <option value="high">High Activity (300+)</option>
                  <option value="medium">Medium Activity (200-300)</option>
                  <option value="low">Low Activity (&lt;200)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Range
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* View Navigation Buttons */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-3">
              {["map", "bar", "pie", "line", "histogram"].map((view) => {
                const labels: Record<ViewType, string> = {
                  map: "🗺️ Heatmap",
                  bar: "📊 Bar Chart",
                  pie: "🥧 Pie Chart",
                  line: "📈 Line Chart",
                  histogram: "📉 Histogram",
                };
                return (
                  <button
                    key={view}
                    onClick={() => setActiveView(view as ViewType)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeView === view
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {labels[view as ViewType]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central View */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            {activeView === "map" && (
              <RidesHeatmapWithStraightLines
                ridesFrom={filteredFrom}
                ridesTo={filteredTo}
                connections={filteredConnections}
              />
            )}
            {activeView === "bar" && <RidesByAreaChart data={ridesByArea} />}
            {activeView === "pie" && (
              <TimeDistributionChart data={timeDistribution} />
            )}
            {activeView === "line" && (
              <WeeklyTrendsChart data={ridesOverTime} />
            )}
            {activeView === "histogram" && (
              <DistanceHistogramChart data={rideDistances} />
            )}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Total Rides</p>
              <p className="text-3xl font-bold text-purple-600">2,620</p>
              <p className="text-green-600 text-sm mt-1">
                ↑ 12% from last week
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Active Areas</p>
              <p className="text-3xl font-bold text-blue-600">10</p>
              <p className="text-gray-500 text-sm mt-1">Across Halifax</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Avg. Distance</p>
              <p className="text-3xl font-bold text-green-600">8.5 km</p>
              <p className="text-gray-500 text-sm mt-1">Per ride</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">Peak Hour</p>
              <p className="text-3xl font-bold text-orange-600">5 PM</p>
              <p className="text-gray-500 text-sm mt-1">Evening commute</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

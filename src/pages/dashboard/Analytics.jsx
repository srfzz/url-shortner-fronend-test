import api from "@/api/axios";
import { showToast } from "@/utils/toast";
import {
  BarChart3,
  Calendar,
  ExternalLink,
  Loader2,
  PieChart as PieIcon,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = () => {
  const [globalData, setGlobalData] = useState([]);
  const [allLinks, setAllLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- DATE FILTER STATES ---
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(today);

  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const startParam = `${startDate}T00:00:00`;
      const endParam = `${endDate}T23:59:59`;

      // 1. Fetch Global Time-Series Data
      const globalRes = await api.get(`/api/urls/analytics/totalClicks`, {
        params: { startDate: startParam, endDate: endParam },
      });

      // 2. Fetch All Links for Leaderboard
      const linksRes = await api.get("/api/urls/myurls");

      const formattedGlobal = Object.entries(globalRes.data.data || {})
        .map(([date, clicks]) => ({ date, clicks }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setGlobalData(formattedGlobal);
      setAllLinks(linksRes.data.data || []);
    } catch (err) {
      showToast.error("Failed to refresh analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [startDate, endDate]);

  // Derived Data for Leaderboard and Pie Chart
  const topLinks = [...allLinks]
    .sort((a, b) => b.clickCount - a.clickCount)
    .slice(0, 5);

  const totalClicksSum = allLinks.reduce(
    (acc, curr) => acc + curr.clickCount,
    0,
  );

  if (loading && globalData.length === 0)
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
          Syncing Analytics...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* --- TOP FILTER BAR --- */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Real-time link performance tracking
          </p>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 px-3 border-r border-gray-200">
            <Calendar size={16} className="text-gray-400" />
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2 px-3">
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={today}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- MAIN CHART: TRAFFIC OVER TIME --- */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" /> Click Trends
            </h3>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={globalData}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(val) =>
                    val.split("-")[2] +
                    " " +
                    new Date(val).toLocaleString("default", { month: "short" })
                  }
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fill="url(#areaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- PIE CHART: CLICK DISTRIBUTION --- */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-gray-900 mb-6 w-full text-left flex items-center gap-2">
            <PieIcon size={20} className="text-purple-600" /> Share by Link
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topLinks}
                  dataKey="clickCount"
                  nameKey="shortUrl"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {topLinks.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2 w-full">
            {topLinks.map((link, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs font-bold"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: COLORS[i] }}
                  ></div>
                  <span className="text-gray-500">/{link.shortUrl}</span>
                </div>
                <span className="text-gray-900">
                  {Math.round((link.clickCount / totalClicksSum) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- LEADERBOARD: MOST CLICKED LINKS --- */}
        <div className="lg:col-span-3 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-2">
            <BarChart3 size={20} className="text-emerald-600" /> Most Clicked
            Links (All Time)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topLinks.map((link, index) => (
              <div
                key={link.id}
                className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${index === 0 ? "bg-yellow-100 text-yellow-600" : "bg-blue-100 text-blue-600"}`}
                  >
                    #{index + 1}
                  </div>
                  <button
                    onClick={() =>
                      window.open(`http://localhost:8080/${link.shortUrl}`)
                    }
                    className="p-2 bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink
                      size={16}
                      className="text-gray-400 hover:text-blue-600"
                    />
                  </button>
                </div>
                <h4 className="font-black text-gray-900 text-xl tracking-tight mb-1">
                  /{link.shortUrl}
                </h4>
                <p className="text-xs text-gray-400 truncate mb-4">
                  {link.orignalUrl}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Total Clicks
                  </span>
                  <span className="text-lg font-black text-blue-600">
                    {link.clickCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

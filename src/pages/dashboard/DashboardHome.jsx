import api from "@/api/axios";
import { useAuthStore } from "@/store/authStorer";
import { showToast } from "@/utils/toast";
import { motion } from "framer-motion";
import {
  BarChart3,
  Check,
  Copy,
  ExternalLink,
  Link2,
  Loader2,
  MousePointer2,
  Plus,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const DashboardHome = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { setShowCreateModal } = useOutletContext();

  const [links, setLinks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/urls/myurls");
        const allLinks = response.data.data || [];

        // 1. Calculate Total Clicks
        const clicks = allLinks.reduce(
          (acc, curr) => acc + (curr.clickCount || 0),
          0,
        );
        setTotalClicks(clicks);

        // 2. Sort by 'createdAt' descending (Most recent first)
        // If your backend has 'updatedAt', use that instead
        const sortedLinks = allLinks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        // 3. Take only the top 5 for the dashboard
        setLinks(sortedLinks.slice(0, 5));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        showToast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(`http://localhost:8080/${shortUrl}`);
    setCopiedId(id);
    showToast.success("Link copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stats = [
    {
      label: "Total Clicks",
      value: totalClicks.toLocaleString(),
      icon: <MousePointer2 />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Links",
      value: links.length,
      icon: <Link2 />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Avg. CTR",
      value:
        links.length > 0 ? `${(totalClicks / links.length).toFixed(1)}%` : "0%",
      icon: <BarChart3 />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Top Location",
      value: "India",
      icon: <TrendingUp />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.username?.split(" ")[0] || "Chief"}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here is a summary of your link performance.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} /> Create New Link
        </button>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}
            >
              {React.cloneElement(stat.icon, { size: 24 })}
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- RECENT LINKS TABLE --- */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">
              Recently Created
            </h2>
            <button
              onClick={() => navigate("/dashboard/links")}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto min-h-[350px]">
            {loading ? (
              <div className="flex h-full items-center justify-center py-20">
                <Loader2 className="animate-spin text-blue-600" />
              </div>
            ) : links.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Short Link</th>
                    <th className="px-6 py-4">Original URL</th>
                    <th className="px-6 py-4 text-center">Clicks</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {links.map((link) => (
                    <tr
                      key={link.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 font-bold text-blue-600 truncate max-w-[120px]">
                        /{link.shortUrl}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 truncate max-w-[180px]">
                          {link.orignalUrl}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                          {link.clickCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleCopy(link.shortUrl, link.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                          >
                            {copiedId === link.id ? (
                              <Check size={16} className="text-emerald-500" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                `http://localhost:8080/${link.shortUrl}`,
                                "_blank",
                              )
                            }
                            className="p-2 hover:bg-blue-600 rounded-lg text-gray-400 hover:text-white transition-all"
                          >
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center text-gray-500">
                No links found.
              </div>
            )}
          </div>
        </div>

        {/* --- SIDE CARDS --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Performance Tip</h3>
            <p className="text-sm text-gray-500">
              Your most active link is currently receiving <strong>24%</strong>{" "}
              more traffic than average. Keep sharing!
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-2 italic">Strucify Pro</h3>
            <p className="text-slate-400 text-sm mb-6">
              Advanced geo-tracking and device analytics.
            </p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

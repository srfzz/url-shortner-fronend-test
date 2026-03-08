import api from "@/api/axios";
import { showToast } from "@/utils/toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  ExternalLink,
  Filter,
  Link2,
  Loader2,
  RotateCcw,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const MyLinks = () => {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // --- FILTER MODAL STATES ---
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get today's date in YYYY-MM-DD format for input constraints
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        const response = await api.get("/api/urls/myurls");
        const data = response.data.data || [];
        // Sort by most recent creation date
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setLinks(sorted);
        setFilteredLinks(sorted);
      } catch (err) {
        showToast.error("Failed to fetch links");
      } finally {
        setLoading(false);
      }
    };
    fetchAllLinks();
  }, []);

  // --- FILTERING ENGINE ---
  useEffect(() => {
    let result = links;

    // Search Filter
    if (searchQuery) {
      result = result.filter(
        (link) =>
          link.orignalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Date Range Filter
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      result = result.filter((link) => new Date(link.createdAt) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((link) => new Date(link.createdAt) <= end);
    }

    setFilteredLinks(result);
  }, [searchQuery, startDate, endDate, links]);

  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(`http://localhost:8080/${shortUrl}`);
    setCopiedId(id);
    showToast.success("Copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isFilterActive = startDate || endDate;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            My Links
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {filteredLinks.length} URLs in the current view
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by URL or alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-60 transition-all text-sm font-medium"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilterModal(true)}
            className={`p-2.5 rounded-2xl border transition-all relative ${
              isFilterActive
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Filter size={20} />
            {isFilterActive && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-gray-400 font-medium tracking-tight">
              Syncing with server...
            </p>
          </div>
        ) : filteredLinks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-black">
                <tr>
                  <th className="px-8 py-5">Short URL</th>
                  <th className="px-8 py-5">Long URL</th>
                  <th className="px-8 py-5 text-center">Clicks</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filteredLinks.map((link) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={link.id}
                      className="hover:bg-blue-50/20 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <span className="font-extrabold text-blue-600 text-lg">
                          /{link.shortUrl}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <p
                          className="text-sm text-gray-500 truncate max-w-[250px] font-medium"
                          title={link.orignalUrl}
                        >
                          {link.orignalUrl}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
                          <TrendingUp size={12} className="text-emerald-500" />
                          {link.clickCount}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleCopy(link.shortUrl, link.id)}
                            className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            {copiedId === link.id ? (
                              <Check size={18} className="text-emerald-500" />
                            ) : (
                              <Copy size={18} />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                `http://localhost:8080/${link.shortUrl}`,
                                "_blank",
                              )
                            }
                            className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <ExternalLink size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link2 className="text-gray-300" size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              No results found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Try changing your search or date filters.
            </p>
          </div>
        )}
      </div>

      {/* --- FILTER MODAL --- */}
      <AnimatePresence>
        {showFilterModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[40px] shadow-2xl overflow-hidden p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    max={endDate || today} // Disable future dates and dates after End Date
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate} // Disable dates before Start Date
                    max={today} // Disable future dates
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all"
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                >
                  <RotateCcw size={18} /> Reset
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
                >
                  Show Links
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyLinks;

import api from "@/api/axios";
import { useAuthStore } from "@/store/authStorer";
import { showToast } from "@/utils/toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Globe,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --- API CALL FOR SHORTENING ---
  const handleCreateLink = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // Endpoint to your Spring Boot Controller
      const response = await api.post("/api/urls/shorten", {
        orignalUrl: longUrl,
      });

      if (response.data) {
        showToast.success("Link shortened successfully!");
        setLongUrl("");
        setShowCreateModal(false);
        // Direct redirect to the links table
        navigate("/dashboard/links");
      }
    } catch (err) {
      console.error("Shortening error:", err);
      showToast.error(err.response?.data?.message || "Failed to shorten link");
    } finally {
      setIsCreating(false);
    }
  };

  const navItems = [
    {
      label: "Overview",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    { label: "My Links", icon: <Link2 size={20} />, path: "/dashboard/links" },
    {
      label: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/dashboard/analytics",
    },
    {
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <Link to="/" className="flex items-center gap-2 mb-10 px-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white font-bold">
              <Link2 size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Strucify
            </span>
          </Link>

          <button
            onClick={() => {
              setShowCreateModal(true);
              setIsSidebarOpen(false);
            }}
            className="flex items-center justify-center gap-3 w-full py-4 mb-8 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus size={20} /> New Link
          </button>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Info Footer */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 px-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 hidden md:block">
              {navItems.find((n) => n.path === location.pathname)?.label ||
                "Dashboard"}
            </h2>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all active:scale-95"
          >
            <Plus size={16} />{" "}
            <span className="hidden sm:inline">Create Link</span>
          </button>
        </header>

        <main className="flex-1 p-6 md:p-10">
          <Outlet context={{ setShowCreateModal }} />
        </main>
      </div>

      {/* --- CREATE LINK MODAL --- */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isCreating && setShowCreateModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    Create New Link
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={handleCreateLink}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                      Destination URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Globe size={18} />
                      </div>
                      <input
                        type="url"
                        required
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="https://example.com/very-long-link"
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-4 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isCreating ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Shortening...</span>
                      </div>
                    ) : (
                      "Shorten Link"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;

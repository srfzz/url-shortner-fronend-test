import { useAuthStore } from "@/store/authStorer";
import {
  BarChart3,
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
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <div className="h-full flex flex-col p-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 px-2 mb-10">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Link2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Strucify</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section at Bottom */}
          <div className="border-t border-gray-100 pt-4 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header / Top Nav */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            {/* Quick Create Link Button */}
            <button className="hidden sm:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
              <Plus size={16} /> Create Link
            </button>

            <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

            {/* User Profile Info */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-none">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content injected here */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;

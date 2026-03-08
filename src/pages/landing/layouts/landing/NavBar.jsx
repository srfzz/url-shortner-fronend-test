import { useAuthStore } from "@/store/authStorer"; // Filename: authStorer.js
import { showToast } from "@/utils/toast";
import {
  CreditCard,
  Info,
  LayoutDashboard,
  Link2,
  LogIn,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Hook into your Global Zustand State
  const { isAuthenticated, user, logout } = useAuthStore();
  console.log("NavBar - Is Authenticated:", isAuthenticated, "User:", user);

  const closeMenu = () => setIsOpen(false);

  // 2. Handle Logout Action
  const handleLogout = () => {
    logout();
    closeMenu();
    showToast.success("Logged out safely");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* --- LOGO --- */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Link2 className="w-7 h-7 text-blue-600" />
          <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Strucify Links
          </span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/about"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            About
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Pricing
          </Link>

          {/* 3. CONDITIONAL LOGIC FOR DESKTOP */}
          {!isAuthenticated ? (
            // Only show if NOT logged in
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium border border-gray-200 px-5 py-2 rounded-full hover:bg-gray-50 transition-all"
            >
              <LogIn size={16} />
              Log In
            </Link>
          ) : (
            // Only show if LOGGED IN
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                <User size={14} className="text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {user?.username}
                </span>
              </div>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-medium bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all shadow-sm"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(true)} className="p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Strucify
            </span>
            <button onClick={closeMenu} className="p-2 text-gray-500">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {/* User Profile Info in Mobile Sidebar */}
            {isAuthenticated && (
              <div className="mb-4 p-4 bg-blue-50 rounded-2xl flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                    Account
                  </p>
                  <p className="font-bold text-gray-900">{user?.username}</p>
                </div>
              </div>
            )}

            <Link
              to="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl hover:bg-gray-100 text-gray-700"
            >
              <Info size={20} /> About
            </Link>
            <Link
              to="/pricing"
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl hover:bg-gray-100 text-gray-700"
            >
              <CreditCard size={20} /> Pricing
            </Link>

            <div className="my-2 border-t border-gray-100" />

            {/* 4. CONDITIONAL MOBILE LINKS */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl hover:bg-gray-100 text-gray-700"
              >
                <LogIn size={20} /> Log In
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-lg font-bold p-3 rounded-xl bg-blue-50 text-blue-600"
                >
                  <LayoutDashboard size={20} /> My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl text-red-600 hover:bg-red-50 mt-auto"
                >
                  <LogOut size={20} /> Log Out
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

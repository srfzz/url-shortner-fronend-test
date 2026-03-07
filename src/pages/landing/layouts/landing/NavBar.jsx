import {
  CreditCard,
  Info,
  LayoutDashboard,
  Link2,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo Section - Linked to Home */}
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
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            About
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-medium border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            <LogIn size={16} />
            Log In
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            <LayoutDashboard size={16} />
            My Dashboard
          </Link>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-600 hover:text-black focus:outline-none"
          >
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
            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            >
              Strucify
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
            >
              <Info size={20} />
              About
            </Link>
            <Link
              to="/pricing"
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
            >
              <CreditCard size={20} />
              Pricing
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
            >
              <LogIn size={20} />
              Log In
            </Link>

            <div className="my-2 border-t border-gray-100" />

            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-bold p-3 rounded-xl bg-blue-50 text-blue-600"
            >
              <LayoutDashboard size={20} />
              My Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

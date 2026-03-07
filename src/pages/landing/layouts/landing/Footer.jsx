import {
  ExternalLink,
  Github,
  Link2,
  Linkedin,
  Shield,
  Twitter,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Link2 className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Strucify Links
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Simplifying the web, one link at a time. Built for speed,
              security, and scale.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/features"
                  className="hover:text-blue-600 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-blue-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="hover:text-blue-600 transition-colors"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack Badge (Your existing logic) */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Powered by
            </h3>
            <div className="flex flex-col gap-3 opacity-80">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Zap size={14} className="text-blue-500" /> Vite + React
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <Shield size={14} className="text-green-500" /> Spring Boot
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <ExternalLink size={14} className="text-purple-500" />{" "}
                PostgreSQL
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Strucify. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

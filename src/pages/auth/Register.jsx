import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Link2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Basic email validation check
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* 1. Left Side: Brand (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex md:w-1/2 bg-gray-50 flex-col justify-center px-12 lg:px-24 border-r border-gray-100"
      >
        <div className="max-w-md text-left">
          <Link2 className="w-12 h-12 text-blue-600 mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Secure your <span className="text-blue-600">brand identity.</span>
          </h1>
          <p className="text-gray-500 mb-8">
            Create short links that look professional and scale with your
            traffic.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <ShieldCheck className="text-green-500" /> End-to-end Encryption
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <Zap className="text-blue-500" /> Ultra-low Latency Redirects
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Right Side: Form */}
      <div className="flex-grow flex flex-col justify-center py-12 px-6 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Get Started
            </h2>
            <p className="text-gray-500 mt-2">Join Strucify Links today.</p>
          </div>

          <form className="space-y-5">
            {/* Username Field */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700 ml-1">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="sarfaraj_ansari"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </motion.div>

            {/* Email Field with Validation Icon */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700 ml-1">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@company.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <AnimatePresence>
                    {isEmailValid && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <CheckCircle2 className="text-green-500" size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Password Field with Show/Hide Toggle */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg flex justify-center items-center gap-2 mt-4 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
            >
              Create Enterprise Account
              <ArrowRight size={20} />
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline underline-offset-4"
            >
              Log In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

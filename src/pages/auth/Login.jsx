import { motion } from "framer-motion";
import { Link2, Lock, LogIn, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Assumes you have React Router set up

// Variants for consistent staggering entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Add your login logic here (calling your Spring Boot backend)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* 1. Header/Logo Section with Fade-in Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Link2 className="w-9 h-9 text-blue-600" />
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Strucify
          </span>
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            create a new enterprise account
          </Link>
        </p>
      </motion.div>

      {/* 2. Login Form Card with Staggered Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 rounded-2xl sm:px-10 border border-gray-100 relative overflow-hidden">
          {/* Subtle decorative background detail */}
          <Sparkles
            className="absolute -top-10 -right-10 w-32 h-32 text-blue-50/50"
            strokeWidth={1}
          />

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Work Email
              </label>
              <div className="mt-1 relative rounded-full shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative rounded-full shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember this device
                </label>
              </div>
            </motion.div>

            {/* Submit Button with Micro-interactions */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center gap-2 items-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95 shadow-blue-500/30"
              >
                <LogIn size={20} />
                Sign in to Dashboard
              </motion.button>
            </motion.div>
          </form>

          {/* Third-party Login Divider */}
          <motion.div variants={itemVariants} className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 font-medium">
                  Or continue with enterprise SSO
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="w-full inline-flex justify-center items-center gap-3 py-3 px-4 rounded-full border border-gray-200 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
              >
                <img
                  src="https://authjs.dev/img/providers/google.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Sign in with Google Workspace
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Simple Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-center text-xs text-gray-400"
      >
        © {new Date().getFullYear()} Vocman India Private Limited. Secure login
        powered by Strucify Auth.
      </motion.p>
    </div>
  );
};

export default Login;

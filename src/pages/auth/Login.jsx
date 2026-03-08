import api from "@/api/axios";
import { useAuthStore } from "@/store/authStorer";
import { showToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Link2, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid work email"),
  password: z.string().min(1, "Password is required"),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // 1. Redirect if already logged in (Handled via Effect to prevent render conflicts)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data, e) => {
    // PREVENT REFRESH: Manually stop the event just in case
    if (e) e.preventDefault();

    setIsLoading(true);
    setServerError("");

    try {
      // Ensure path matches your Spring Boot Controller (@RequestMapping("/api/auth"))
      const response = await api.post("/api/auth/login", data);

      if (response?.data?.data) {
        const { user, token } = response.data.data;

        // Update global Zustand state (Persist handles localStorage)
        login(user, token);

        showToast.success(`Welcome back, ${user.username}!`);
        navigate("/dashboard");
      }
    } catch (err) {
      // 2. LOG THE ERROR: Use F12 -> Network -> "Preserve Log" to see this if it refreshes
      console.error("Login Error Object:", err);

      const message =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      setServerError(message);
      showToast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <Link to="/" className="inline-flex items-center gap-2">
          <Link2 className="w-9 h-9 text-blue-600" />
          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Strucify
          </span>
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
      </motion.div>

      {/* --- FORM CARD --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4"
      >
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 rounded-3xl sm:px-10 border border-gray-100 relative overflow-hidden">
          {/* Server Side Error Alert */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-3"
            >
              <AlertCircle size={20} className="shrink-0" />
              <p className="font-medium">{serverError}</p>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  disabled={isLoading}
                  className={`block w-full pl-11 pr-4 py-3.5 border rounded-2xl outline-none transition-all ${
                    errors.email
                      ? "border-red-300 focus:ring-2 focus:ring-red-50"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="you@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  disabled={isLoading}
                  className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button" // CRITICAL: Prevents refreshing the page on click
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={!isValid || isLoading}
              className={`w-full flex justify-center items-center py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
                isValid && !isLoading
                  ? "bg-black hover:bg-gray-800 shadow-gray-300"
                  : "bg-gray-200 cursor-not-allowed text-gray-400 shadow-none"
              }`}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign in to Dashboard"
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-blue-600 hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

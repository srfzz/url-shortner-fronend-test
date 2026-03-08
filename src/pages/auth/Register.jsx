import api from "@/api/axios";
import { showToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

import {
  AlertCircle,
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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid work email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const emailValue = watch("email", "");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      const response = await api.post("/api/auth/register", data);
      showToast.success(`Welcome, ${response.data.data.username}!`);
      navigate("/login");
    } catch (err) {
      if (
        err.response?.data.data &&
        typeof err.response.data.data === "object"
      ) {
        const backendErrors = err.response.data.data;
        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field],
          });
        });
        showToast.error("Validation failed. Check the fields.");
      } else {
        setServerError(err.response?.data?.message || "Connection failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex md:w-1/2 bg-gray-50 flex-col justify-center px-12 lg:px-24 border-r border-gray-100"
      >
        <div className="max-w-md">
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
              <ShieldCheck className="text-green-500" size={20} /> End-to-end
              Encryption
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <Zap className="text-blue-500" size={20} /> Ultra-low Latency
              Redirects
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex-grow flex flex-col justify-center py-12 px-6 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm flex items-center gap-2"
            >
              <AlertCircle size={18} /> {serverError}
            </motion.div>
          )}

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Get Started
            </h2>
            <p className="text-gray-500 mt-2">Join Strucify Links today.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700 ml-1">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  {...register("username")}
                  disabled={isLoading}
                  className={`block w-full pl-11 pr-4 py-3 border rounded-2xl outline-none transition-all ${
                    errors.username
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                  placeholder="sarfaraj_ansari"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.username.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700 ml-1">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email")}
                  disabled={isLoading}
                  className={`block w-full pl-11 pr-12 py-3 border rounded-2xl outline-none transition-all ${
                    errors.email
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                  placeholder="you@company.com"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <AnimatePresence>
                    {isEmailValid && !errors.email && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle2 className="text-green-500" size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  {...register("password")}
                  disabled={isLoading}
                  type={showPassword ? "text" : "password"}
                  className={`block w-full pl-11 pr-12 py-3 border rounded-2xl outline-none transition-all ${
                    errors.password
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: isValid && !isLoading ? 1.01 : 1 }}
              whileTap={{ scale: isValid && !isLoading ? 0.99 : 1 }}
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 mt-4 transition-all shadow-xl ${
                isValid && !isLoading
                  ? "bg-black text-white hover:bg-gray-800 shadow-gray-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isLoading ? (
                <div className="h-6 w-6 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={20} />
                </>
              )}
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

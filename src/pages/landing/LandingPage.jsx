import { motion } from "framer-motion";
import { LineChart, Link, Link2, Sparkles } from "lucide-react";

// 1. Animated Hero Visual Component
const HeroImagePlaceholder = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full aspect-video rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center p-8 shadow-inner relative overflow-hidden"
  >
    {/* Floating Central Icon */}
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Link2
        className="w-12 h-12 md:w-20 md:h-20 text-gray-300"
        strokeWidth={1}
      />
    </motion.div>

    {/* Decorative Background Sparkles */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 opacity-30">
      <Sparkles className="w-8 h-8 text-cyan-400" />
      <Sparkles className="w-12 h-12 text-blue-500" />
    </div>
  </motion.div>
);

const LandingPage = () => {
  // Animation Variants for a clean "Staggered" entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Side: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 text-center md:text-left order-2 md:order-1"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 px-4 py-1 rounded-full text-sm"
          >
            <Sparkles size={16} />
            Powered by Strucify Core
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            Shorten. <br className="hidden md:block" /> Manage.{" "}
            <br className="hidden md:block" />{" "}
            <motion.span
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200%" }}
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent"
            >
              Analyze.
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0"
          >
            A high-performance link management platform designed for enterprise
            scale—built to handle 100,000+ daily hits with ease.
          </motion.p>

          {/* Main CTA: Create Link Input */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <input
              type="text"
              placeholder="Paste your long URL here..."
              className="flex-grow p-4 border border-gray-200 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-base transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl transition-all whitespace-nowrap"
            >
              <Link2 size={20} />
              Shorten Now
            </motion.button>
          </motion.div>

          {/* Analytics Badge */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500"
          >
            <LineChart size={16} className="text-green-500" />
            Free real-time analytics on your first 1,000 links.
          </motion.div>
        </motion.div>

        {/* Right Side: Visuals */}
        <div className="relative order-1 md:order-2 px-4 md:px-0">
          <HeroImagePlaceholder />

          {/* Floating Decorative Elements */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-2xl shadow-xl text-white"
          >
            <Sparkles size={24} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="hidden sm:block absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-black p-3 rounded-2xl shadow-xl text-white"
          >
            <Link size={24} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

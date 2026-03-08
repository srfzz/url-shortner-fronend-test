import api from "@/api/axios";
import { showToast } from "@/utils/toast";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateLinkModal = ({ isOpen, onClose }) => {
  const [longUrl, setLongUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreateLink = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const response = await api.post("/api/urls/shorten", {
        orignalUrl: longUrl,
      });
      if (response.data) {
        showToast.success("Link shortened successfully!");
        setLongUrl("");
        onClose(); // Close the modal
        navigate("/dashboard/links");
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Failed to shorten link");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isCreating && onClose()}
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
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
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
                  {isCreating ? "Shortening..." : "Shorten Link"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateLinkModal;

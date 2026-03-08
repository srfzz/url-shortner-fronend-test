import toast from "react-hot-toast";

const toastConfig = {
  style: {
    borderRadius: "16px",
    background: "#333",
    color: "#fff",
    padding: "16px",
    fontWeight: "500",
    fontSize: "14px",
  },
  success: {
    style: {
      border: "1px solid #3b82f6",
      background: "#eff6ff",
      color: "#1e3a8a",
    },
    icon: "🚀",
  },
  error: {
    style: {
      border: "1px solid #ef4444",
      background: "#fef2f2",
      color: "#991b1b",
    },
    icon: "❌",
  },
};

export const showToast = {
  success: (message) => toast.success(message, toastConfig.success),
  error: (message) => toast.error(message, toastConfig.error),
  loading: (message) => toast.loading(message, { style: toastConfig.style }),
  dismiss: () => toast.dismiss(),
};

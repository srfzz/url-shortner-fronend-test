import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Auth & Protection
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Landing Pages
import AboutPage from "./pages/landing/AboutPage";
import LandingPage from "./pages/landing/LandingPage";
import Footer from "./pages/landing/layouts/landing/Footer";
import NavBar from "./pages/landing/layouts/landing/NavBar";

// Dashboard Pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardLayout from "./pages/dashboard/layouts/DashboardLayout";
import MyLinks from "./pages/dashboard/MyLinks";
import Settings from "./pages/dashboard/Settings";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* --- GROUP 1: LANDING PAGES (With NavBar & Footer) --- */}
        <Route
          element={
            <>
              <NavBar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* --- GROUP 2: AUTH PAGES (No NavBar/Footer) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- GROUP 3: PROTECTED DASHBOARD (Own Sidebar/Nav) --- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* These render inside DashboardLayout's <Outlet /> */}
          <Route index element={<DashboardHome />} />
          <Route path="links" element={<MyLinks />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Helper to make the Landing Layout work
import { Outlet } from "react-router-dom";

export default App;

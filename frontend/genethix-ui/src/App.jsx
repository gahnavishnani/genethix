import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Consent from "./pages/Consent";
import Decision from "./pages/Decision";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

function AppContent() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarOn = ["/", "/login"];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05080f] via-[#0a0f1a] to-[#020409] text-white">

      {showNavbar && (
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <Navbar />
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-10">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

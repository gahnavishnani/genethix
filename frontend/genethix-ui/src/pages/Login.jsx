import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId) {
      alert("Please enter User ID");
      return;
    }

    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    if (role === "admin") navigate("/admin");
    else navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#05080f] via-[#0b111d] to-[#020409] flex items-center justify-center overflow-hidden">

      {/* BACKGROUND AI WAVE */}
      <svg
        className="absolute right-10 top-0 h-full animate-wave-login"
        width="250"
        viewBox="0 0 80 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="loginWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d0ff" />
            <stop offset="50%" stopColor="#0090ff" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>
        </defs>

        <path
          d="
            M40 0
            C70 120, 10 240, 40 360
            C70 480, 10 600, 40 720
            C70 840, 10 960, 40 1080
          "
          stroke="url(#loginWave)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          className="drop-shadow-[0_0_20px_rgba(0,200,255,0.6)]"
        />
      </svg>

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-particle"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: Math.random() * 7 + 6 + "s",
              animationDelay: Math.random() * -10 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* LOGIN BOX */}
      <div className="relative z-10 w-full max-w-md p-10 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-fade-in">

        <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-md">
          Welcome Back
        </h1>
        <p className="text-center text-gray-300 mt-2 mb-8 tracking-wide">
          Secure Access to GENETHIX AI Banking
        </p>

        <div className="space-y-6">

          {/* USER ID */}
          <div>
            <label className="text-gray-300 text-sm">User ID</label>
            <input
              type="text"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 backdrop-blur text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-genethix-primary"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          {/* ROLE SELECT */}
          <div>
            <label className="text-gray-300 text-sm">Select Role</label>
            <select
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 backdrop-blur text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-genethix-primary"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option className="text-black" value="customer">
                Customer
              </option>
              <option className="text-black" value="admin">
                Admin
              </option>
            </select>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full py-3.5 mt-4 rounded-xl text-lg font-semibold tracking-wide
            bg-gradient-to-r from-genethix-primary to-blue-500 text-white
            shadow-[0_0_20px_rgba(0,200,255,0.5)]
            hover:shadow-[0_0_30px_rgba(0,200,255,0.8)]
            hover:from-blue-600 hover:to-genethix-primary
            transition-all duration-300"
          >
            Login →
          </button>
        </div>
      </div>

    </div>
  );
}

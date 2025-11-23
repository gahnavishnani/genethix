import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const userId = localStorage.getItem("userId");

  return (
    <div className="max-w-4xl mx-auto">

      {/* GLASS CARD */}
      <div className="
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20 
        rounded-3xl 
        p-10 
        shadow-2xl
        text-white
      ">

        {/* Header */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-genethix-primary to-blue-300 text-transparent bg-clip-text mb-4">
          Welcome Back
        </h1>

        <p className="text-gray-300 mb-6">
          You are logged in as 
          <span className="text-genethix-primary font-semibold"> {userId}</span>.
        </p>

        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          Manage your AI-powered financial profile, control your consent
          settings, explore explainable decisions, and view governance insights —
          all powered by GENETHIX Ethical AI.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Profile Button */}
          <Link
            to="/profile"
            className="
              w-full px-6 py-4 rounded-xl 
              bg-white/10 border border-white/20 
              hover:bg-white/20 
              backdrop-blur-xl
              shadow-[0_0_15px_rgba(0,200,255,0.4)]
              hover:shadow-[0_0_25px_rgba(0,200,255,0.7)]
              transition
              text-center font-semibold
            "
          >
            Manage Profile →
          </Link>

          {/* Consent Button */}
          <Link
            to="/consent"
            className="
              w-full px-6 py-4 rounded-xl 
              bg-white/10 border border-white/20 
              hover:bg-white/20
              backdrop-blur-xl
              shadow-[0_0_15px_rgba(0,200,255,0.4)]
              hover:shadow-[0_0_25px_rgba(0,200,255,0.7)]
              transition
              text-center font-semibold
            "
          >
            Consent Settings →
          </Link>

          {/* Decision Button */}
          <Link
            to="/decision"
            className="
              w-full px-6 py-4 rounded-xl 
              bg-white/10 border border-white/20 
              hover:bg-white/20 
              backdrop-blur-xl
              shadow-[0_0_15px_rgba(0,200,255,0.4)]
              hover:shadow-[0_0_25px_rgba(0,200,255,0.7)]
              transition
              text-center font-semibold
            "
          >
            Explain My Decision →
          </Link>

          {/* Admin Button */}
          <Link
            to="/admin"
            className="
              w-full px-6 py-4 rounded-xl 
              bg-white/10 border border-white/20 
              hover:bg-white/20
              backdrop-blur-xl
              shadow-[0_0_15px_rgba(0,200,255,0.4)]
              hover:shadow-[0_0_25px_rgba(0,200,255,0.7)]
              transition
              text-center font-semibold
            "
          >
            Governance Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

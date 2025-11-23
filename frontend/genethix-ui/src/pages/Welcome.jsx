import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="
      relative 
      h-screen 
      max-h-[820px]
      overflow-hidden 
      bg-gradient-to-br from-[#05080f] via-[#0a0f1a] to-[#020409] 
      flex flex-col md:flex-row 
      items-center justify-center 
      px-6 md:px-16 
      py-6 md:py-10
    ">

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-particle"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: Math.random() * 6 + 6 + "s",
              animationDelay: Math.random() * -10 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* LEFT SECTION */}
      <div className="max-w-xl z-10 text-white text-center md:text-left animate-fade-in px-2 md:px-0">

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Welcome to the  
          <br />
          <span className="bg-gradient-to-r from-genethix-primary to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,200,255,0.4)]">
            Future of Ethical AI
          </span>
        </h1>

        <p className="text-gray-300 mt-6 text-lg md:text-xl leading-relaxed animate-fade-in-delay">
          GENETHIX is redefining fairness and transparency  
          in AI-powered financial systems.  
          <br className="hidden md:block" />
          Step into a new era of intelligent, responsible banking.
        </p>

        <div className="flex justify-center md:justify-start">
          <Link
            to="/login"
            className="mt-8 px-8 py-4 text-lg rounded-xl font-semibold
            bg-gradient-to-r from-genethix-primary to-blue-400 hover:from-blue-500 hover:to-genethix-primary
            shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:shadow-[0_0_28px_rgba(0,200,255,0.7)]
            transition-all duration-300 animate-fade-in-delay2 text-white tracking-wide"
          >
            Continue →
          </Link>
        </div>
      </div>

      {/* RIGHT WAVE */}
      <div className="relative w-full md:w-1/3 h-52 md:h-full flex justify-center md:justify-end items-center mt-10 md:mt-0">

        <svg
          width="160"
          height="100%"
          viewBox="0 0 80 800"
          preserveAspectRatio="none"
          className="animate-wave-glow"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00eaff" />
              <stop offset="50%" stopColor="#00aaff" />
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
            stroke="url(#waveGradient)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            className="drop-shadow-[0_0_20px_rgba(0,200,255,0.6)]"
          />
        </svg>

      </div>

    </div>
  );
}

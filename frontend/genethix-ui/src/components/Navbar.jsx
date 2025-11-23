import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="
      w-full 
      px-6 py-4 
      flex items-center justify-between 
      backdrop-blur-xl 
      bg-black/20 
      border-b border-white/10 
      shadow-[0_0_15px_rgba(0,200,255,0.2)]
      text-white
    ">

      {/* LEFT — Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/genethix-logo.png"
          alt="GENETHIX"
          className="w-10 h-10 drop-shadow-[0_0_10px_rgba(0,200,255,0.7)]"
        />
        <span className="text-xl font-bold tracking-wide">
          GENETHIX
        </span>
      </div>

      {/* CENTER — Navigation (desktop only) */}
      <div className="hidden md:flex gap-8 text-gray-300 text-sm font-medium">
        <Link to="/home" className="hover:text-genethix-primary transition">Home</Link>
        <Link to="/profile" className="hover:text-genethix-primary transition">Profile</Link>
        <Link to="/consent" className="hover:text-genethix-primary transition">Consent</Link>
        <Link to="/decision" className="hover:text-genethix-primary transition">Explain</Link>
        <Link to="/admin" className="hover:text-genethix-primary transition">Admin</Link>
      </div>

      {/* RIGHT — User + Logout */}
      <div className="flex items-center gap-5">
        {userId && (
          <span className="text-gray-300 text-sm">
            Logged in as <span className="text-genethix-primary font-semibold">{userId}</span>
          </span>
        )}

        <button
          onClick={handleLogout}
          className="
            px-4 py-2 rounded-lg text-sm font-medium
            bg-gradient-to-r from-genethix-primary to-blue-500
            shadow-[0_0_15px_rgba(0,200,255,0.4)]
            hover:shadow-[0_0_25px_rgba(0,200,255,0.7)]
            transition
          "
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

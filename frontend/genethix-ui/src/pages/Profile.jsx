import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState({
    user_id: userId,
    age: "",
    income: "",
    credit_score: "",
    debt: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/${userId}`);
        if (res.data) {
          setProfile(res.data);
        }
      } catch (error) {
        console.log("No profile found for this user yet.");
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await api.post("/update_profile", profile);
      alert("Profile updated successfully.");
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* GLASS CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
        
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-genethix-primary to-blue-300 text-transparent bg-clip-text">
          Profile Information
        </h1>

        {/* Show Logged In User */}
        <p className="text-gray-300 mb-8">
          Logged in as: <span className="text-genethix-primary font-semibold">{userId}</span>
        </p>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="text-gray-400">Age</label>
            <input
              type="number"
              name="age"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20 focus:ring-genethix-primary"
              value={profile.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-400">Income</label>
            <input
              type="number"
              name="income"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20 focus:ring-genethix-primary"
              value={profile.income}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-400">Credit Score</label>
            <input
              type="number"
              name="credit_score"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20 focus:ring-genethix-primary"
              value={profile.credit_score}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-400">Debt Amount</label>
            <input
              type="number"
              name="debt"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20 focus:ring-genethix-primary"
              value={profile.debt}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={saveProfile}
          className="
            mt-8 px-8 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-genethix-primary to-blue-500
            text-white
            shadow-[0_0_20px_rgba(0,200,255,0.4)]
            hover:shadow-[0_0_30px_rgba(0,200,255,0.7)]
            hover:from-blue-600 hover:to-genethix-primary
            transition-all duration-300
          "
        >
          Save Profile →
        </button>
      </div>
    </div>
  );
}

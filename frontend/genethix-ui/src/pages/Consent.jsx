import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Consent() {
  const userId = localStorage.getItem("userId");

  const [consent, setConsent] = useState({
    user_id: userId,
    share_data: false,
    allow_marketing: false,
    allow_ai_decisions: true,
  });

  useEffect(() => {
    const fetchConsent = async () => {
      try {
        const res = await api.get(`/consent/${userId}`);
        if (res.data) {
          setConsent(res.data);
        }
      } catch {
        console.log("Using default consent settings.");
      }
    };
    fetchConsent();
  }, [userId]);

  const updateConsent = async (field) => {
    const updated = { ...consent, [field]: !consent[field] };
    setConsent(updated);

    try {
      await api.post("/consent", updated);
    } catch (error) {
      alert("Error updating consent.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

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
          Consent Settings
        </h1>

        <p className="text-gray-300 mb-8">
          Manage how GENETHIX AI can use your data.<br/>
          Logged in as: <span className="text-genethix-primary font-semibold">{userId}</span>
        </p>

        {/* CONSENT OPTIONS */}
        <div className="space-y-8">

          {/* Toggle 1 */}
          <div className="flex items-center justify-between bg-white/10 border border-white/10 p-4 rounded-xl">
            <div>
              <h2 className="text-xl font-semibold">Allow AI Decisions</h2>
              <p className="text-gray-400 text-sm">
                Enable automated AI-driven decision-making for faster processing.
              </p>
            </div>

            <button
              onClick={() => updateConsent("allow_ai_decisions")}
              className={`
                px-6 py-2 rounded-xl font-medium text-sm
                ${consent.allow_ai_decisions
                  ? "bg-genethix-primary text-white"
                  : "bg-gray-600 text-gray-200"}
                transition
              `}
            >
              {consent.allow_ai_decisions ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between bg-white/10 border border-white/10 p-4 rounded-xl">
            <div>
              <h2 className="text-xl font-semibold">Share Data</h2>
              <p className="text-gray-400 text-sm">
                Allow data sharing for service improvements.
              </p>
            </div>

            <button
              onClick={() => updateConsent("share_data")}
              className={`
                px-6 py-2 rounded-xl font-medium text-sm
                ${consent.share_data
                  ? "bg-genethix-primary text-white"
                  : "bg-gray-600 text-gray-200"}
                transition
              `}
            >
              {consent.share_data ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between bg-white/10 border border-white/10 p-4 rounded-xl">
            <div>
              <h2 className="text-xl font-semibold">Marketing Personalization</h2>
              <p className="text-gray-400 text-sm">
                Allow personalized product recommendations.
              </p>
            </div>

            <button
              onClick={() => updateConsent("allow_marketing")}
              className={`
                px-6 py-2 rounded-xl font-medium text-sm
                ${consent.allow_marketing
                  ? "bg-genethix-primary text-white"
                  : "bg-gray-600 text-gray-200"}
                transition
              `}
            >
              {consent.allow_marketing ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

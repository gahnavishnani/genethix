import React, { useState } from "react";

export default function Admin() {
  const [user, setUser] = useState("");

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Governance Dashboard</h1>

      {/* Search Bar */}
      <input
        className="p-3 w-full bg-gray-800 rounded-lg text-white"
        placeholder="Enter User ID"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      {/* Audit Trail */}
      <div className="bg-gray-800 p-6 rounded-xl mt-8">
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">Audit Trail</h2>

        <div className="text-gray-300 space-y-2">
          <p>• Consent updated for user '{user || "user123"}' — 1 hour ago</p>
          <p>• Profile updated — 2 hours ago</p>
          <p>• AI decision generated — Today 10:30 AM</p>
          <p>• No fairness violations detected</p>
        </div>
      </div>
    </div>
  );
}

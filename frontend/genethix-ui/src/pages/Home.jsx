import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-14">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">
        Trustworthy AI for Future Banking
      </h1>

      <p className="text-gray-300 text-lg max-w-3xl">
        GENETHIX brings transparency, fairness and governance to AI-driven
        banking decisions.
      </p>

      {/* Ethical AI Card */}
      <div className="bg-gray-800 p-6 mt-10 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 mb-2">
          Why Ethical AI Matters
        </h2>
        <p className="text-gray-300">
          Genethix ensures fairness, transparency, and accountability in
          AI-driven banking. Customers get clear explanations, control over data,
          and responsible decision-making.
        </p>
      </div>
    </div>
  );
}

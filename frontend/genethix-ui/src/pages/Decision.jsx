import React, { useState } from "react";
import { aiReviewer } from "../utils/aiReviewer";

export default function Decision() {
  const [inputs, setInputs] = useState({
    user_id: "",
    age: "",
    income: "",
    debt: "",
    creditScore: "",
    dti: "",
    loanAmount: "",
  });

  const [result, setResult] = useState(null);
  const [consent, setConsent] = useState({
    credit_scoring: true,
    personalization: true,
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleDecision = async () => {
    try {
      const res = await fetch("https://genethix-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const reviewerFeedback = aiReviewer(inputs, consent);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        Explain My Decision
      </h1>

      {/* INPUT FORM */}
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(inputs).map((key) => (
          <input
            key={key}
            name={key}
            value={inputs[key]}
            onChange={handleChange}
            placeholder={key}
            className="p-3 bg-gray-800 text-white rounded-lg"
          />
        ))}
      </div>

      {/* GET DECISION BUTTON */}
      <button
        onClick={handleDecision}
        className="mt-6 px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600"
      >
        Get Decision
      </button>

      {/* DECISION OUTPUT */}
      {result && (
        <div className="mt-10 bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-blue-300 mb-4">
            AI Decision Result
          </h2>

          <p className="text-gray-200">
            <strong>Decision:</strong> {result.prediction}
          </p>

          <p className="text-gray-200">
            <strong>Approval Probability:</strong>{" "}
            {(result.probability * 100).toFixed(2)}%
          </p>

          {/* BIAS INDICATOR */}
          <div className="mt-4 p-4 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-bold text-blue-300 mb-2">
              Fairness / Bias Indicator
            </h3>

            <p className="text-gray-300">
              Confidence Score: {(result.probability * 100).toFixed(2)}%
            </p>

            <p className="mt-1">
              Bias Level:{" "}
              {result.probability > 0.85 ? (
                <span className="text-green-400 font-semibold">Low Bias ✓</span>
              ) : result.probability > 0.6 ? (
                <span className="text-yellow-400 font-semibold">
                  Moderate Bias ⚠️
                </span>
              ) : (
                <span className="text-red-400 font-semibold">
                  High Bias ⚠️⚠️
                </span>
              )}
            </p>
          </div>

          {/* AI REVIEWER */}
          <div className="mt-6 bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              AI Reviewer — Suggestions to Improve Approval
            </h3>

            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {reviewerFeedback.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

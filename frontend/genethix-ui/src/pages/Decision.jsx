import React, { useState } from "react";
import { api } from "../api";

export default function Decision() {
  const userId = localStorage.getItem("userId");

  const [inputData, setInputData] = useState({
    age: "",
    income: "",
    credit_score: "",
    debt: ""
  });

  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const getDecision = async () => {
    try {
      const res = await api.post("/predict", {
        user_id: userId,
        ...inputData
      });

      setResult(res.data.prediction);
      setExplanation(res.data.explanation);
    } catch (err) {
      alert("Error getting decision.");
    }
  };

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
          Explain My Decision
        </h1>

        <p className="text-gray-300 mb-10">
          Understand how GENETHIX AI evaluates your profile.
          <br />
          Logged in as: <span className="text-genethix-primary font-semibold">{userId}</span>
        </p>

        {/* INPUT FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div>
            <label className="text-gray-300 text-sm">Age</label>
            <input
              name="age"
              type="number"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white"
              value={inputData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Income</label>
            <input
              name="income"
              type="number"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white"
              value={inputData.income}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Credit Score</label>
            <input
              name="credit_score"
              type="number"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white"
              value={inputData.credit_score}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Debt</label>
            <input
              name="debt"
              type="number"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white"
              value={inputData.debt}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* PREDICT BUTTON */}
        <button
          onClick={getDecision}
          className="
            w-full py-3 rounded-xl font-semibold text-lg
            bg-gradient-to-r from-genethix-primary to-blue-500
            shadow-[0_0_15px_rgba(0,200,255,0.4)]
            hover:shadow-[0_0_25px_rgba(0,200,255,0.7)]
            transition-all duration-300
          "
        >
          Generate AI Decision →
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-genethix-primary mb-3">
              Decision Outcome
            </h2>

            <p className="text-gray-200 text-lg mb-6">
              Result: <span className="font-semibold">{result}</span>
            </p>
          </div>
        )}

        {/* EXPLANATION BOX */}
        {explanation && (
          <div className="mt-8 bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

            <h3 className="text-xl font-semibold mb-4 text-blue-300">
              Why This Decision?
            </h3>

            <p className="text-gray-300 leading-relaxed mb-6">
              {explanation.reason}
            </p>

            {/* FEATURE IMPORTANCE */}
            <h4 className="text-lg font-semibold text-genethix-primary mb-3">
              Key Factors
            </h4>

            <div className="space-y-4">
              {explanation.factors.map((factor, i) => (
                <div key={i}>
                  <p className="text-gray-300 text-sm mb-1">{factor.name}</p>

                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-genethix-primary h-2 rounded-full"
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

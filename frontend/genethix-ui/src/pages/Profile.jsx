import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [debt, setDebt] = useState("");

  // Load User From LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("genethix_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserId(parsed.userId);

      fetch(`http://127.0.0.1:8000/profile/${parsed.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setAge(data.age);
          setIncome(data.income);
          setCreditScore(data.credit_score);
          setDebt(data.debt);
        });
    }
  }, []);

  const handleUpdate = async () => {
    const payload = {
      user_id: userId,
      age: Number(age),
      income: Number(income),
      credit_score: Number(creditScore),
      debt: Number(debt)
    };

    const res = await fetch("http://127.0.0.1:8000/update_profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.updated) {
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">My Profile</h1>

      <div className="grid grid-cols-2 gap-4 max-w-xl">

        <input
          className="p-3 bg-gray-800 rounded-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />

        <input
          className="p-3 bg-gray-800 rounded-lg"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Income"
        />

        <input
          className="p-3 bg-gray-800 rounded-lg"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
          placeholder="Credit Score"
        />

        <input
          className="p-3 bg-gray-800 rounded-lg"
          value={debt}
          onChange={(e) => setDebt(e.target.value)}
          placeholder="Debt Amount"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="mt-6 px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600"
      >
        Save Profile
      </button>
    </div>
  );
}

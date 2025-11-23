import React, { useState } from "react";
import { api } from "../api";
import { Shield, Eye, Download, Activity } from "lucide-react";

export default function Admin() {
  const [userId, setUserId] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fairnessMsg, setFairnessMsg] = useState("");
  const [summary, setSummary] = useState({ total: 0, avg: 0 });

  const fetchLogs = async () => {
    if (!userId) {
      alert("Enter user ID first.");
      return;
    }
    setLoading(true);
    setFairnessMsg("");

    try {
      const res = await api.get(`/decisions/${userId}`);
      const data = res.data.decisions || [];
      setLogs(data);

      // Summary
      const probs = data.map(d => Number(d.probability) || 0);
      const avg = probs.length ? (probs.reduce((a,b)=>a+b,0)/probs.length) : 0;

      setSummary({ total: data.length, avg });
    } catch (err) {
      console.error(err);
      alert("Error fetching decision logs.");
      setLogs([]);
    }

    setLoading(false);
  };

  const runFairness = async () => {
    if (!userId) {
      alert("Enter user ID first.");
      return;
    }

    setFairnessMsg("Running fairness audit...");

    try {
      const res = await api.get(`/fairness/${userId}`);
      const data = res.data;

      if (data.fairness_issue) {
        setFairnessMsg(`⚠️ Issue Found: ${data.message}`);
      } else {
        setFairnessMsg(`✅ Fairness OK: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setFairnessMsg("Fairness check failed.");
    }
  };

  const downloadLogs = () => {
    if (!logs.length) {
      alert("No logs to export.");
      return;
    }

    const blob = new Blob([JSON.stringify(logs, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `genethix_decisions_${userId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto">

      <div className="
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        rounded-3xl p-10 shadow-2xl 
        text-white
      ">
        
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-4">
          <Shield size={26} className="text-genethix-primary" />
          Governance Dashboard
        </h1>

        <p className="text-gray-300 mb-6">
          Audit AI decisions, check fairness, and export logs.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="col-span-2 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20"
          />

          <button
            onClick={fetchLogs}
            disabled={loading}
            className="
              px-4 py-3 rounded-xl bg-genethix-primary text-black font-semibold
              shadow hover:brightness-110 transition flex items-center justify-center gap-2
            "
          >
            <Eye size={16} /> View
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={runFairness}
            className="
              px-4 py-3 rounded-xl bg-white/10 
              border border-white/20 text-white 
              hover:bg-white/20 transition flex items-center gap-2
            "
          >
            <Activity size={16} /> Run Fairness
          </button>

          <button
            onClick={downloadLogs}
            className="
              px-4 py-3 rounded-xl bg-white/10 
              border border-white/20 text-white 
              hover:bg-white/20 transition flex items-center gap-2
            "
          >
            <Download size={16} /> Export Logs
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-gray-400 text-sm">Total Decisions</div>
            <div className="text-2xl font-bold">{summary.total}</div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-gray-400 text-sm">Avg Score</div>
            <div className="text-2xl font-bold">
              {summary.avg ? summary.avg.toFixed(3) : "—"}
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-gray-400 text-sm">Fairness</div>
            <div className="text-gray-300 mt-1">{fairnessMsg || "—"}</div>
          </div>
        </div>

        {/* Logs Table */}
        <h2 className="text-xl font-semibold mb-4">Decision Logs</h2>

        {logs.length === 0 && (
          <p className="text-gray-400 text-sm">No logs found.</p>
        )}

        {logs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="py-2">Age</th>
                  <th className="py-2">Income</th>
                  <th className="py-2">Credit</th>
                  <th className="py-2">Debt</th>
                  <th className="py-2">Result</th>
                  <th className="py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2">{log.age}</td>
                    <td className="py-2">{log.income}</td>
                    <td className="py-2">{log.credit_score}</td>
                    <td className="py-2">{log.debt}</td>
                    <td className="py-2">{log.prediction}</td>
                    <td className="py-2">{Number(log.probability).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

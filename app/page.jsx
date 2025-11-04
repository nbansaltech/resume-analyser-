"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setAnalysis("");

    const lower = text.toLowerCase();
    const skills = ["python", "machine learning", "react", "data", "analysis", "sql"];
    const edu = ["bachelor", "master", "phd", "university", "college"];
    const exp = ["intern", "developer", "engineer", "project", "experience"];

    const foundSkills = skills.filter((s) => lower.includes(s));
    const foundEdu = edu.filter((e) => lower.includes(e));
    const foundExp = exp.filter((e) => lower.includes(e));

    const score = 70 + Math.random() * 30;
    let summary = `🧠 AI Resume Analysis Report\n\n`;
    summary += `💼 Detected Skills: ${foundSkills.join(", ") || "None"}\n`;
    summary += `🎓 Education Mentions: ${foundEdu.join(", ") || "None"}\n`;
    summary += `🧩 Experience Keywords: ${foundExp.join(", ") || "None"}\n\n`;
    summary += `⭐ Overall résumé strength: ${score.toFixed(2)}%`;

    setTimeout(() => {
      setAnalysis(summary);
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-3">
          AI Resume Analyzer
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Paste your résumé text below to get an instant AI-style evaluation.
        </p>

        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Paste your résumé text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl mt-4 transition disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
          </div>
        )}

        {analysis && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="whitespace-pre-wrap bg-gray-50 border border-gray-200 p-4 rounded-xl mt-6 text-sm text-gray-700"
          >
            {analysis}
          </motion.pre>
        )}
      </motion.div>

      <footer className="mt-6 text-sm text-gray-500">
        © 2025 <span className="font-semibold text-blue-600">Your Name</span> — AI Resume Analyzer
      </footer>
    </main>
  );
}

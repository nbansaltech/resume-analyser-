"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);

    const lower = text.toLowerCase();

    // Simple keyword-based mock AI logic
    const skills = ["python", "machine learning", "react", "data", "analysis", "sql"];
    const edu = ["bachelor", "master", "phd", "university", "college"];
    const exp = ["intern", "developer", "engineer", "project", "experience"];

    const foundSkills = skills.filter((s) => lower.includes(s));
    const foundEdu = edu.filter((e) => lower.includes(e));
    const foundExp = exp.filter((e) => lower.includes(e));

    const score = 70 + Math.random() * 30;
    let summary = `🧠 AI Resume Analysis Report\n\n`;
    summary += `Detected Skills: ${foundSkills.join(", ") || "None"}\n`;
    summary += `Education Mentions: ${foundEdu.join(", ") || "None"}\n`;
    summary += `Experience Keywords: ${foundExp.join(", ") || "None"}\n\n`;
    summary += `Overall résumé strength: ${score.toFixed(2)}%`;

    setTimeout(() => {
      setAnalysis(summary);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">
        🧾 AI Resume Analyzer (Mock)
      </h1>

      <textarea
        className="w-full h-40 p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Paste your résumé text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={!text || loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {analysis && (
        <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg mt-5 shadow">
          {analysis}
        </pre>
      )}
    </div>
  );
}

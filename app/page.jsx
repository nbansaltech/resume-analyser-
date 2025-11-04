"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock AI analysis — purely frontend
const analyzeResume = (text) => {
  const lower = text.toLowerCase();

  const skillsList = [
    "python",
    "machine learning",
    "data analysis",
    "react",
    "sql",
    "deep learning",
    "nlp",
    "javascript",
    "html",
    "css",
  ];

  const categories = {
    Technical: ["python", "react", "javascript", "sql", "html", "css"],
    "AI & ML": ["machine learning", "deep learning", "nlp"],
    "Data Science": ["data analysis"],
  };

  const foundSkills = skillsList.filter((s) => lower.includes(s));
  const score = 70 + Math.random() * 25;

  const recommendations = [];
  if (!lower.includes("project")) recommendations.push("Add more project-based experience.");
  if (!lower.includes("intern")) recommendations.push("Include any internship details.");
  if (foundSkills.length < 4)
    recommendations.push("Highlight more technical or analytical skills.");

  const categoryScores = Object.entries(categories).map(([cat, keys]) => ({
    category: cat,
    score:
      keys.filter((k) => lower.includes(k)).length > 0
        ? 70 + Math.random() * 25
        : 40 + Math.random() * 15,
  }));

  return {
    score: score.toFixed(1),
    foundSkills,
    recommendations,
    categoryScores,
  };
};

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const analysis = analyzeResume(resumeText);
      setResult(analysis);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-white/40 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 md:p-12"
      >
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
            AI Resume Analyzer Pro
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base">
            Upload or paste your résumé text below to get instant AI-powered insights.
          </p>
        </header>

        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none bg-white/70 text-gray-800 placeholder-gray-400 shadow-inner"
              placeholder="Paste your résumé text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90 text-white font-semibold py-3 rounded-2xl shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </motion.button>

            {loading && (
              <div className="flex justify-center mt-6">
                <div className="h-8 w-8 border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 bg-white/70 border border-gray-200 rounded-2xl shadow-inner p-6 overflow-auto"
            >
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">AI Analysis Report</h2>

              {/* Score Section */}
              <div className="mb-5">
                <p className="text-gray-700 mb-2 font-medium">
                  Overall Resume Strength:{" "}
                  <span className="text-indigo-600 font-semibold text-lg">
                    {result.score}%
                  </span>
                </p>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all"
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-800 mb-2">Detected Skills</h3>
                {result.foundSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.foundSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No major skills detected.</p>
                )}
              </div>

              {/* Category Breakdown */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-800 mb-2">Category Breakdown</h3>
                {result.categoryScores.map((cat, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between mb-1 text-sm text-gray-600">
                      <span>{cat.category}</span>
                      <span>{cat.score.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all"
                        style={{ width: `${cat.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Suggestions</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {result.recommendations.length > 0 ? (
                    result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)
                  ) : (
                    <li>Your résumé looks well-balanced. Great work!</li>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </section>
      </motion.div>

      <footer className="mt-8 text-gray-500 text-sm text-center">
        © 2025 <span className="font-semibold text-indigo-600">Your Name</span> — AI Resume Analyzer Pro
      </footer>
    </main>
  );
}

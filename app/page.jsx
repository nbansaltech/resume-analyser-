"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const analyzeResume = async () => {
    if (!file) return alert("Please upload a resume first!");
    setLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        name: "Mock Candidate",
        summary:
          "Strong background in software development, data analysis, and machine learning. Excellent teamwork and communication skills.",
        strengths: [
          "Python, React, and SQL proficiency",
          "Project leadership and problem-solving",
          "Clear and structured resume format",
        ],
        improvements: [
          "Add measurable achievements",
          "Include GitHub/portfolio links",
          "Expand experience section with impact metrics",
        ],
        score: 87,
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-between">
      <div className="w-full max-w-3xl mt-16 mb-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-600">
          AI Resume Analyzer
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Upload your resume and get instant AI-powered feedback.
        </p>

        <div className="border-2 border-dashed border-blue-400 rounded-xl p-6 text-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer text-blue-500 font-semibold"
          >
            {file ? file.name : "Click to upload your resume"}
          </label>
        </div>

        <button
          onClick={analyzeResume}
          disabled={!file || loading}
          className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {loading && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}

        {result && (
          <motion.div
            className="mt-10 p-6 bg-gray-50 rounded-xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Resume Analysis Report
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Candidate:</strong> {result.name}
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Summary:</strong> {result.summary}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-2">
                  Improvements
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.improvements.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-800">
                <strong>AI Fit Score:</strong>{" "}
                <span className="text-blue-600 font-bold">
                  {result.score} / 100
                </span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="pb-8 text-sm text-gray-500 text-center">
        © 2025 <span className="font-semibold">Your Name</span> — AI Resume
        Analyzer Pro <br />
        <span className="text-gray-400">Built with Next.js & TailwindCSS</span>
      </footer>
    </main>
  );
}

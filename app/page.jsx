"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobFile) return alert("Please upload both files.");
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobdesc", jobFile);

    setLoading(true);
    try {
      const res = await axios.post("/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
    }
    setLoading(false);
  };

  return (
    <main className="container">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Resume Analyzer</h1>
      <p className="text-center mb-6 text-gray-600">
        Upload your Resume and Job Description (PDF/DOCX). The AI will analyze match and missing keywords.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-2xl p-6">
        <div>
          <label className="block font-medium mb-1">Resume File</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Job Description File</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setJobFile(e.target.files[0])}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-white p-6 shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p><strong>Match Score:</strong> {result.match_score}%</p>
          <p className="mt-2"><strong>Missing Keywords:</strong> {result.missing_keywords.join(", ")}</p>
          <p className="mt-2"><strong>Feedback:</strong> {result.feedback}</p>
        </div>
      )}
    </main>
  );
}

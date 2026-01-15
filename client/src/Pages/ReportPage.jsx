// ReportPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function ReportPage() {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/reports/${reportId}`);
        setReport(res.data.report);
        console.log("Fetched Report:", res.data.report);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load report.");
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) return <div>Loading report...</div>;
  if (error) return <div>{error}</div>;
  if (!report) return <div>No report found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
      <p>
        <strong>Role:</strong> {report.role} | <strong>Experience:</strong>{" "}
        {report.experience} | <strong>Difficulty:</strong> {report.difficulty}
      </p>
      <p>
        <strong>Skills:</strong> {report.skills.join(", ")}
      </p>
      <p>
        <strong>Success Percentage:</strong> {report.successPercentage}%
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Q&A Analysis</h2>
      {report.qaAnalysis.length === 0 ? (
        <p>No Q&A available</p>
      ) : (
        <div className="space-y-4">
          {report.qaAnalysis.map((qa, idx) => (
            <div
              key={idx}
              className="border p-3 rounded shadow-sm bg-gray-50"
            >
              <p>
                <strong>Q{idx + 1}:</strong> {qa.question}
              </p>
              <p>
                <strong>Answer:</strong> {qa.transcript}
              </p>
              <p>
                <strong>Suggested Answer:</strong> {qa.suggestedAnswer}
              </p>
            </div>
          ))}
        </div>
      )}

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Strengths & Weaknesses</h2>
      <p>
        <strong>Strengths:</strong>{" "}
        {report.strengths.length > 0 ? report.strengths.join(", ") : "N/A"}
      </p>
      <p>
        <strong>Weaknesses:</strong>{" "}
        {report.weaknesses.length > 0 ? report.weaknesses.join(", ") : "N/A"}
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Suggested Improvements</h2>
      <ul className="list-disc list-inside">
        {report.suggestedImprovements.length > 0
          ? report.suggestedImprovements.map((imp, idx) => (
              <li key={idx}>{imp}</li>
            ))
          : "N/A"}
      </ul>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Skill Assessment</h2>
      <ul className="list-disc list-inside">
        {report.skillAssessment.length > 0
          ? report.skillAssessment.map((skill, idx) => (
              <li key={idx}>
                {skill.skill}: {skill.score}%
              </li>
            ))
          : "N/A"}
      </ul>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Summary</h2>
      <p>{report.summary || "N/A"}</p>
    </div>
  );
}
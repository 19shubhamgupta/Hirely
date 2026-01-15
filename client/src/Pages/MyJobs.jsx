import React, { useState } from 'react';
import axios from 'axios';
import { Activity, UploadCloud, Globe2, Brain, Sparkles, ExternalLink } from 'lucide-react';

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState('health');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // State for different forms
  const [resumeFile, setResumeFile] = useState(null);
  const [topN, setTopN] = useState(5);
  const [keyword, setKeyword] = useState('python');
  const [location, setLocation] = useState('Remote');
  const [skills, setSkills] = useState('Python, Django, FastAPI, REST API');

  const API_BASE_URL = 'http://localhost:8000';

  // Health Check API
  const handleHealthCheck = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Upload Resume & Get Recommendations
  const handleUploadResume = async () => {
    if (!resumeFile) {
      setError('Please select a PDF file');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', resumeFile);
      formData.append('top_n', topN);

      const response = await axios.post(`${API_BASE_URL}/upload-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Scrape Remote Jobs
  const handleScrapeJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/scrape-jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`
      );
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Analyze Resume (Skills Only)
  const handleAnalyzeResume = async () => {
    if (!resumeFile) {
      setError('Please select a PDF file');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', resumeFile);

      const response = await axios.post(`${API_BASE_URL}/analyze-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Recommend by Skills
  const handleRecommendBySkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const skillsArray = skills.split(',').map(s => s.trim());
      const response = await axios.post(`${API_BASE_URL}/recommend-by-skills`, {
        skills: skillsArray,
        top_n: topN,
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'health', name: 'Health Check', icon: <Activity className="w-4 h-4" /> },
    { id: 'upload', name: 'Upload Resume', icon: <UploadCloud className="w-4 h-4" /> },
    { id: 'scrape', name: 'Scrape Jobs', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'analyze', name: 'Analyze Resume', icon: <Brain className="w-4 h-4" /> },
    { id: 'recommend', name: 'Recommend by Skills', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 text-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs uppercase tracking-wide text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live API Playground
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Job Recommendation System</h1>
              <p className="text-slate-600 max-w-2xl">
                Test health, upload resumes, scrape remote jobs, and get tailored recommendations in one place.
              </p>
            </div>
            <a
              href="http://127.0.0.1:8000/redoc#tag/Root"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-5 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/30"
            >
              <ExternalLink className="w-4 h-4" />
              API Docs
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-600">Base URL</p>
              <p className="font-semibold text-slate-900">{API_BASE_URL}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-600">Supports</p>
              <p className="font-semibold text-slate-900">PDF uploads & skill JSON</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-600">Endpoints</p>
              <p className="font-semibold text-slate-900">5 integrated actions</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-600">Output</p>
              <p className="font-semibold text-slate-900">Matches, skills, jobs</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-2xl mb-8 overflow-hidden">
          <div className="flex overflow-x-auto border-b bg-slate-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setResult(null);
                  setError(null);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-700 bg-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-700">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 bg-white">
            {/* Health Check */}
            {activeTab === 'health' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">Health Check</h2>
                  <p className="text-gray-600">Confirm the service is online and reachable.</p>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    onClick={handleHealthCheck}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                  >
                    {loading ? 'Checking...' : 'Run Health Check'}
                  </button>
                  <div className="text-sm text-gray-500">GET /</div>
                </div>
              </div>
            )}

            {/* Upload Resume */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">Upload Resume & Get Recommendations</h2>
                  <p className="text-gray-600">Upload a PDF resume and receive top-N matching roles.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-slate-50/60">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Resume PDF</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">Supports .pdf • Processes skills & recommendations</p>
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Top N Results</label>
                      <input
                        type="number"
                        value={topN}
                        onChange={(e) => setTopN(parseInt(e.target.value))}
                        min="1"
                        max="20"
                        className="w-full md:w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="text-sm text-gray-500">POST /upload-resume</div>
                    <button
                      onClick={handleUploadResume}
                      disabled={loading || !resumeFile}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Upload & Get Recommendations'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Scrape Jobs */}
            {activeTab === 'scrape' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">Scrape Remote Jobs</h2>
                  <p className="text-gray-600">Search multiple sources by keyword and location.</p>
                </div>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Keyword</label>
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="e.g., python, javascript"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Remote, New York"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleScrapeJobs}
                      disabled={loading}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-purple-600/20 disabled:opacity-50"
                    >
                      {loading ? 'Scraping...' : 'Scrape Jobs'}
                    </button>
                    <div className="text-sm text-gray-500">POST /scrape-jobs?keyword=&location=</div>
                  </div>
                </div>
              </div>
            )}

            {/* Analyze Resume */}
            {activeTab === 'analyze' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">Analyze Resume (Skills Only)</h2>
                  <p className="text-gray-600">Extract skills from your resume without generating recommendations.</p>
                </div>
                <div className="space-y-4">
                  <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-indigo-400 transition-colors bg-slate-50/60">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Resume PDF</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">POST /analyze-resume</p>
                  </label>
                  <button
                    onClick={handleAnalyzeResume}
                    disabled={loading || !resumeFile}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Resume'}
                  </button>
                </div>
              </div>
            )}

            {/* Recommend by Skills */}
            {activeTab === 'recommend' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">Recommend by Skills</h2>
                  <p className="text-gray-600">Send skills directly without uploading a file.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g., Python, Django, FastAPI, REST API"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Top N Results</label>
                      <input
                        type="number"
                        value={topN}
                        onChange={(e) => setTopN(parseInt(e.target.value))}
                        min="1"
                        max="20"
                        className="w-full md:w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="text-sm text-gray-500">POST /recommend-by-skills</div>
                  </div>
                  <button
                    onClick={handleRecommendBySkills}
                    disabled={loading}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-pink-600/20 disabled:opacity-50"
                  >
                    {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-rose-50 border-l-4 border-rose-500 p-4 mb-6 rounded-lg shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-2xl">❌</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-rose-800">Error</h3>
                <p className="text-sm text-rose-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">Results</h2>
              <span className="text-xs uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Preview</span>
            </div>
            
            {/* Health Check Result */}
            {result.service && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-2xl">✅</span>
                  <span className="font-semibold">Status: {result.status}</span>
                </div>
                <p className="text-sm text-gray-700"><strong>Service:</strong> {result.service}</p>
                <p className="text-sm text-gray-700"><strong>Version:</strong> {result.version}</p>
              </div>
            )}

            {/* Skills Display */}
            {result.extracted_skills && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Extracted Skills ({result.skills_count})</h3>
                <div className="flex flex-wrap gap-2">
                  {result.extracted_skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.skills && result.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Your Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Job Recommendations ({result.recommendations.length})</h3>
                <div className="space-y-4">
                  {result.recommendations.map((job) => (
                    <div key={job.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-white via-white to-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{job.title}</h4>
                          <p className="text-gray-600">{job.company} • {job.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                            {job.match_score?.toFixed(1)}% Match
                          </div>
                          {job.matched_skills_count && (
                            <p className="text-xs text-gray-500 mt-1">{job.matched_skills_count} skills matched</p>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{job.description}</p>
                      {job.salary_range && (
                        <p className="text-sm text-gray-600 mb-2">💰 {job.salary_range}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {job.skills?.map((skill, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scraped Jobs */}
            {result.jobs && result.jobs.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Scraped Jobs ({result.jobs_count}) - {result.keyword} in {result.location}
                </h3>
                <div className="space-y-4 mt-4">
                  {result.jobs.map((job) => (
                    <div key={job.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-white via-white to-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{job.title}</h4>
                          <p className="text-gray-600">{job.company} • {job.location}</p>
                          <p className="text-xs text-gray-500 mt-1">Source: {job.source} • Posted: {new Date(job.posted_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div 
                        className="text-gray-700 mb-2 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: job.description?.substring(0, 300) + '...' }}
                      />
                      <div className="flex flex-wrap gap-2 mb-2">
                        {job.skills?.map((skill, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Job →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw JSON (for debugging) */}
            <details className="mt-6">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">View Raw JSON</summary>
              <pre className="mt-2 bg-gray-100 p-4 rounded-lg overflow-auto text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;

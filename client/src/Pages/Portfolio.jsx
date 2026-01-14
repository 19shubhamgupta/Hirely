import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePortfolioStore } from "../store/usePortfolioStore";
import {
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Twitter,
  Globe,
  Loader2,
  Briefcase,
  Code,
  User,
} from "lucide-react";

const Portfolio = () => {
  const { slug } = useParams();
  const { getPortfolioBySlug, portfolioData, isLoading } = usePortfolioStore();

  useEffect(() => {
    if (slug) {
      getPortfolioBySlug(slug);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Portfolio Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The portfolio you're looking for doesn't exist
          </p>
          <Link
            to="/"
            className="text-blue-600 hover:text-purple-600 underline font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const { user, bio, projects, skills, socialLinks } = portfolioData;

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Hero Section */}
      <section id="about" className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">👋</span>
                <p className="text-xl text-gray-600">Hello, I'm</p>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-3 leading-tight">
                {user?.fullname}
              </h1>

              {/* Common Professional Summary */}
              <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-xl">
                Passionate professional dedicated to creating innovative
                solutions and delivering exceptional results. Combining
                technical expertise with creative problem-solving to build
                meaningful projects that make an impact.
              </p>

              {bio && (
                <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
                  {bio}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {user?.email && (
                  <a
                    href={`mailto:${user.email}`}
                    className="px-8 py-3 bg-[#F9A826] text-white rounded-xl font-semibold hover:bg-[#e89610] transition-colors shadow-md hover:shadow-lg"
                  >
                    Contact Me
                  </a>
                )}
                {projects && projects.length > 0 && (
                  <a
                    href="#projects"
                    className="px-8 py-3 border-2 border-[#F9A826] text-gray-900 rounded-xl font-semibold hover:bg-[#F9A826] hover:text-white transition-all shadow-md hover:shadow-lg"
                  >
                    View Projects
                  </a>
                )}
              </div>

              {/* Social Icons */}
              {socialLinks && Object.values(socialLinks).some((v) => v) && (
                <div className="flex gap-4">
                  {socialLinks?.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-all"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks?.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-all"
                      title="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks?.website && (
                    <a
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-all"
                      title="Website"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Content - Modern Abstract Illustration */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-96 md:w-[500px] h-[500px] md:h-[600px]">
                {/* Main Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD19A] via-[#FFE4B5] to-[#FFF8E7] rounded-full shadow-2xl"></div>

                {/* Geometric Shapes */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {/* Large Circle - Top Right */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#F9A826]/30 to-[#F9A826]/10 rounded-full blur-3xl"></div>

                  {/* Large Circle - Bottom Left */}
                  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-purple-400/20 to-blue-400/10 rounded-full blur-3xl"></div>

                  {/* Multiple Decorative Circles */}
                  <div className="absolute top-20 left-24 w-32 h-32 bg-[#F9A826]/20 rounded-full blur-2xl"></div>
                  <div className="absolute top-40 right-32 w-40 h-40 bg-purple-400/15 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-40 left-16 w-28 h-28 bg-blue-400/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-32 right-24 w-36 h-36 bg-pink-400/15 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
                  <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"></div>
                  <div className="absolute top-1/2 left-12 w-16 h-16 bg-orange-400/25 rounded-full blur-lg"></div>
                  <div className="absolute bottom-1/4 right-16 w-28 h-28 bg-indigo-400/15 rounded-full blur-xl"></div>

                  {/* Smaller solid circles for accent */}
                  <div className="absolute top-16 right-20 w-6 h-6 bg-[#F9A826]/40 rounded-full"></div>
                  <div className="absolute top-28 left-32 w-4 h-4 bg-purple-400/50 rounded-full"></div>
                  <div className="absolute bottom-24 left-28 w-5 h-5 bg-blue-400/45 rounded-full"></div>
                  <div className="absolute bottom-16 right-32 w-7 h-7 bg-pink-400/40 rounded-full"></div>
                  <div className="absolute top-1/2 right-20 w-3 h-3 bg-yellow-400/60 rounded-full"></div>
                  <div className="absolute top-3/4 left-20 w-4 h-4 bg-cyan-400/50 rounded-full"></div>

                  {/* Center Workspace Elements */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-12">
                    {/* Main Code Window */}
                    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      {/* Window Header */}
                      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="inline-block px-3 py-1 bg-gray-700 rounded text-gray-400 text-xs font-mono">
                            portfolio.jsx
                          </div>
                        </div>
                      </div>

                      {/* Code Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-sm font-mono">
                            1
                          </span>
                          <div className="flex gap-2 items-center">
                            <div className="h-3 w-16 bg-purple-500 rounded"></div>
                            <div className="h-3 w-24 bg-blue-400 rounded"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-sm font-mono">
                            2
                          </span>
                          <div className="flex gap-2 items-center pl-4">
                            <div className="h-3 w-20 bg-pink-400 rounded"></div>
                            <div className="h-3 w-16 bg-green-400 rounded"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-sm font-mono">
                            3
                          </span>
                          <div className="flex gap-2 items-center pl-4">
                            <div className="h-3 w-24 bg-cyan-400 rounded"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-sm font-mono">
                            4
                          </span>
                          <div className="flex gap-2 items-center">
                            <div className="h-3 w-12 bg-orange-400 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Browser Window Overlay */}
                    <div className="absolute -bottom-16 -right-8 w-48 bg-white rounded-xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
                      <div className="bg-gray-100 px-3 py-2 rounded-t-xl flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex-1 bg-white rounded px-2 py-0.5">
                          <div className="h-1.5 w-20 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="h-2 w-full bg-[#F9A826] rounded"></div>
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    {/* Terminal Window Overlay */}
                    <div className="absolute -top-12 -left-8 w-40 bg-gray-900 rounded-lg shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform">
                      <div className="p-3">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-green-400 font-mono text-xs">
                            $
                          </span>
                          <div className="h-1 w-16 bg-green-400 rounded"></div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-blue-400 font-mono text-xs">
                            {">"}
                          </span>
                          <div className="h-1 w-12 bg-blue-400 rounded"></div>
                          <div className="w-1 h-3 bg-green-400 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Icon Badges */}
                <div className="absolute top-16 right-8 bg-white rounded-2xl shadow-xl p-3 transform rotate-12 hover:rotate-0 hover:scale-110 transition-all">
                  <Code className="w-10 h-10 text-purple-500" />
                </div>

                <div className="absolute bottom-20 left-12 bg-white rounded-2xl shadow-xl p-3 transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all">
                  <Briefcase className="w-10 h-10 text-[#F9A826]" />
                </div>

                <div className="absolute top-1/3 right-4 bg-white rounded-2xl shadow-xl p-3 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all">
                  <Github className="w-10 h-10 text-gray-800" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-12 left-16 w-3 h-3 rounded-full bg-[#F9A826] animate-pulse"></div>
                <div className="absolute bottom-32 right-20 w-4 h-4 rounded-full bg-purple-400 animate-pulse delay-100"></div>
                <div className="absolute top-2/3 left-8 w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section id="projects" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Featured Projects
              </h2>
              <div className="w-20 h-1 bg-[#F9A826] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Briefcase className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    {/* Project Links */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#F9A826] text-white text-sm font-medium rounded-lg hover:bg-[#e89610] transition-colors flex-1 justify-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 border-2 border-[#F9A826] text-gray-700 text-sm font-medium rounded-lg hover:bg-[#F9A826] hover:text-white transition-all flex-1 justify-center"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {user?.fullname && (
              <div className="text-center md:text-left">
                <p className="text-gray-900 font-semibold mb-1">
                  {user.fullname}
                </p>
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
              </div>
            )}

            {/* Footer Social Links */}
            {socialLinks && Object.values(socialLinks).some((v) => v) && (
              <div className="flex gap-3">
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#F9A826] transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#F9A826] transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#F9A826] transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#F9A826] transition-colors"
                    title="Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

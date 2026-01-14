import React, { useEffect, useState } from "react";
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
  const [displayedName, setDisplayedName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (slug) {
      getPortfolioBySlug(slug);
    }
  }, [slug]);

  // Reset animation when portfolio data changes
  useEffect(() => {
    if (portfolioData?.user?.fullname) {
      setDisplayedName("");
      setCurrentIndex(0);
      setIsDeleting(false);
    }
  }, [portfolioData?.user?.fullname]);

  // Repeating Typewriter effect for name
  useEffect(() => {
    if (portfolioData?.user?.fullname) {
      const fullName = portfolioData.user.fullname;

      const timeout = setTimeout(
        () => {
          if (!isDeleting && currentIndex < fullName.length) {
            // Typing forward
            setDisplayedName(fullName.slice(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
          } else if (!isDeleting && currentIndex === fullName.length) {
            // Finished typing, wait before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          } else if (isDeleting && currentIndex > 0) {
            // Deleting backward
            setDisplayedName(fullName.slice(0, currentIndex - 1));
            setCurrentIndex(currentIndex - 1);
          } else if (isDeleting && currentIndex === 0) {
            // Finished deleting, start typing again
            setIsDeleting(false);
          }
        },
        isDeleting ? 50 : 100
      ); // Faster when deleting

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isDeleting, portfolioData?.user?.fullname]);

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

  const { user, bio, projects, socialLinks } = portfolioData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Meteor Shower Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-b from-cyan-400 via-purple-400 to-transparent rounded-full"
            style={{
              top: `${Math.random() * -20}%`,
              left: `${Math.random() * 100}%`,
              transform: "rotate(45deg)",
              animation: `meteor ${2 + Math.random() * 2}s linear infinite`,
              animationDelay: `${i * 0.2 + Math.random() * 0.5}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* CSS for meteor animation */}
      <style>{`
        @keyframes meteor {
          0% {
            transform: rotate(45deg) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: rotate(45deg) translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="about"
        className="relative py-16 md:py-24 overflow-hidden z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">👋</span>
                <p className="text-xl text-cyan-300">Hello, I'm</p>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 leading-tight drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]">
                {displayedName}
                {currentIndex <
                  (portfolioData?.user?.fullname?.length || 0) && (
                  <span className="inline-block animate-pulse text-cyan-400 ml-1">
                    |
                  </span>
                )}
              </h1>

              {/* Common Professional Summary */}
              <p className="text-purple-200 text-lg leading-relaxed mb-6 max-w-xl">
                Passionate professional dedicated to creating innovative
                solutions and delivering exceptional results. Combining
                technical expertise with creative problem-solving to build
                meaningful projects that make an impact.
              </p>

              {bio && (
                <p className="text-purple-200 text-lg leading-relaxed mb-8 max-w-xl">
                  {bio}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {user?.email && (
                  <a
                    href={`mailto:${user.email}`}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60"
                  >
                    Contact Me
                  </a>
                )}
                {projects && projects.length > 0 && (
                  <a
                    href="#projects"
                    className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-400 hover:text-slate-900 transition-all shadow-lg shadow-cyan-500/30"
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
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-500/30 flex items-center justify-center text-cyan-300 transition-all border border-cyan-500/30"
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
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-500/30 flex items-center justify-center text-cyan-300 transition-all border border-cyan-500/30"
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
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-500/30 flex items-center justify-center text-cyan-300 transition-all border border-cyan-500/30"
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
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-500/30 flex items-center justify-center text-cyan-300 transition-all border border-cyan-500/30"
                      title="Website"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Section - Framed Image */}
            <div className="relative mt-10 md:mt-0 flex justify-center items-center">
              <div className="relative w-[200px] sm:w-[320px] md:w-[380px] lg:w-[460px] h-[340px] sm:h-[400px] md:h-[480px] lg:h-[560px] flex justify-center items-center">
                {/* Outer Square Border */}
                <div className="absolute inset-0 border-[6px] sm:border-[8px] border-cyan-400 rounded-2xl z-0 shadow-2xl shadow-cyan-500/50"></div>

                {/* Glow behind the square */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/30 to-purple-500/20 blur-[60px] -z-10"></div>

                {/* Character/Icon Container */}
                <div className="relative h-full w-full flex items-center justify-center p-6">
                  <img
                    src="/portimg2.png"
                    alt="Portfolio"
                    className="w-full h-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] object-contain mx-auto"
                    style={{
                      imageRendering: "high-quality",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                      filter:
                        "drop-shadow(0 10px 15px rgba(249, 168, 38, 0.15))",
                    }}
                  />
                </div>

                {/* Floating Decorative Glow - Bottom Right */}
                <div className="absolute -bottom-8 right-8 w-24 h-24 bg-cyan-500/40 blur-[60px] rounded-full z-0 animate-pulse"></div>

                {/* Floating Decorative Glow - Top Left */}
                <div
                  className="absolute -top-6 -left-6 w-20 h-20 bg-purple-500/40 blur-[50px] rounded-full z-0 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Small Floating Icons Around Frame */}
                <div className="absolute -top-4 right-12 bg-white/10 backdrop-blur-sm border border-cyan-500/50 rounded-xl shadow-xl shadow-cyan-500/30 p-2 transform rotate-12 hover:rotate-0 transition-all">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                </div>

                <div className="absolute -bottom-4 left-12 bg-white/10 backdrop-blur-sm border border-purple-500/50 rounded-xl shadow-xl shadow-purple-500/30 p-2 transform -rotate-12 hover:rotate-0 transition-all">
                  <Github className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section
          id="projects"
          className="py-16 md:py-20 bg-slate-800/50 backdrop-blur-sm relative z-10"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                Featured Projects
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full shadow-lg shadow-cyan-500/50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Briefcase className="w-16 h-16 text-cyan-400/40" />
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-purple-200 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    {/* Project Links */}
                    <div className="flex gap-3 pt-4 border-t border-cyan-500/20">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30 flex-1 justify-center"
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
                          className="flex items-center gap-2 px-4 py-2 border-2 border-cyan-400 text-cyan-400 text-sm font-medium rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all flex-1 justify-center"
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
      <footer className="border-t border-cyan-500/30 py-8 bg-slate-900/80 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {user?.fullname && (
              <div className="text-center md:text-left">
                <p className="text-white font-semibold mb-1">{user.fullname}</p>
                <p className="text-purple-300 text-sm">
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
                    className="text-purple-300 hover:text-cyan-400 transition-colors"
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
                    className="text-purple-300 hover:text-cyan-400 transition-colors"
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
                    className="text-purple-300 hover:text-cyan-400 transition-colors"
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
                    className="text-purple-300 hover:text-cyan-400 transition-colors"
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

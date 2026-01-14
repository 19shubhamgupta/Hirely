import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// 🔹 Define styles for different node types
const nodeStyles = {
  root: {
    background: "#3B82F6",
    color: "white",
    border: "2px solid #1D4ED8",
    borderRadius: "12px",
    padding: "15px",
    fontWeight: "700",
    fontSize: "16px",
    width: 200,
    textAlign: "center",
  },
  main: {
    background: "#FEF08A",
    border: "2px solid #EAB308",
    borderRadius: "10px",
    padding: "12px",
    fontWeight: "600",
    fontSize: "14px",
    width: 160,
  },
  subtopic: {
    background: "#DCFCE7",
    border: "2px solid #22C55E",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: "500",
    fontSize: "12px",
    width: 140,
  },
  advanced: {
    background: "#FFE4E6",
    border: "2px solid #FB7185",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: "500",
    fontSize: "12px",
    width: 140,
  }
};

// 🔹 Resource data for nodes
const nodeResources = {
  // HTML Section
  html: {
    title: "HTML Fundamentals",
    description: "Learn the basics of structuring web pages with HTML.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=pQN-pnXPaVg", name: "HTML Crash Course" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/HTML", name: "MDN HTML Reference" },
      { type: "Course", link: "https://www.freecodecamp.org/learn/", name: "FreeCodeCamp HTML Course" },
    ],
  },
  htmlSemantic: {
    title: "Semantic HTML",
    description: "Using meaningful HTML tags for better accessibility and SEO.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=kGW8Al_cga4", name: "Semantic HTML Guide" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics", name: "MDN Semantic Elements" },
    ],
  },
  htmlForms: {
    title: "HTML Forms & Validation",
    description: "Creating accessible forms with built-in validation.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=HghuCkDCaOU", name: "Forms Tutorial" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form", name: "MDN Forms Guide" },
    ],
  },
  html5: {
    title: "HTML5 APIs",
    description: "Modern browser APIs for enhanced functionality.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=GYyHVol6MkY", name: "HTML5 APIs Tutorial" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/API", name: "MDN Web APIs" },
    ],
  },

  // CSS Section
  css: {
    title: "CSS Fundamentals",
    description: "Learn styling, layouts, and responsive design.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", name: "CSS Tutorial - Zero to Hero" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/CSS", name: "MDN CSS Reference" },
    ],
  },
  cssLayout: {
    title: "CSS Layout Systems",
    description: "Flexbox, Grid, and other layout techniques.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=JJSoEo8JSnc", name: "Flexbox in 20 Minutes" },
      { type: "YouTube", link: "https://www.youtube.com/watch?v=9zBsdzdE4sM", name: "CSS Grid Tutorial" },
      { type: "Docs", link: "https://css-tricks.com/snippets/css/complete-guide-grid/", name: "CSS Grid Complete Guide" },
    ],
  },
  cssAdvanced: {
    title: "Advanced CSS",
    description: "CSS variables, animations, and modern features.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=PHO6TBq_auI", name: "CSS Variables Tutorial" },
      { type: "YouTube", link: "https://www.youtube.com/watch?v=YszONjKpgg4", name: "CSS Animations Tutorial" },
    ],
  },
  cssArchitecture: {
    title: "CSS Architecture",
    description: "BEM, SMACSS, and other methodologies for scalable CSS.",
    resources: [
      { type: "Docs", link: "http://getbem.com/introduction/", name: "BEM Methodology" },
      { type: "Article", link: "https://smacss.com/", name: "SMACSS Approach" },
    ],
  },

  // JavaScript Section
  js: {
    title: "JavaScript Fundamentals",
    description: "The programming language of the web. Learn core concepts.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=W6NZfCO5SIk", name: "JavaScript Tutorial" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", name: "MDN JavaScript Reference" },
    ],
  },
  jsDom: {
    title: "DOM Manipulation",
    description: "Interacting with web page elements using JavaScript.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=5fb2aPlgoys", name: "DOM Manipulation Tutorial" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", name: "MDN DOM API" },
    ],
  },
  jsAsync: {
    title: "Asynchronous JavaScript",
    description: "Callbacks, Promises, Async/Await, and Fetch API.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=PoRJizFvM7s", name: "Async JS Crash Course" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", name: "MDN Async Guide" },
    ],
  },
  jsEs6: {
    title: "ES6+ Features",
    description: "Modern JavaScript features and syntax.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=NCwa_xi0Uuc", name: "ES6 Tutorial" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla", name: "MDN ES6 Features" },
    ],
  },
  jsAdvanced: {
    title: "Advanced JavaScript",
    description: "Closures, prototypes, and design patterns.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=3Z0V3cvgns8", name: "JavaScript Patterns" },
      { type: "Course", link: "https://javascript30.com/", name: "JavaScript30 Challenge" },
    ],
  },

  // React Section
  react: {
    title: "React Framework",
    description: "A popular library for building interactive UIs.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=bMknfKXIFA8", name: "React Tutorial" },
      { type: "Docs", link: "https://react.dev/", name: "React Official Docs" },
    ],
  },
  reactHooks: {
    title: "React Hooks",
    description: "useState, useEffect, and custom hooks.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=TNhaISOUy6Q", name: "React Hooks Tutorial" },
      { type: "Docs", link: "https://reactjs.org/docs/hooks-intro.html", name: "React Hooks Docs" },
    ],
  },
  reactState: {
    title: "State Management",
    description: "Context API, Redux, Zustand, and other solutions.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=poQXNp9ItL4", name: "Redux Tutorial" },
      { type: "Docs", link: "https://redux.js.org/", name: "Redux Official Docs" },
    ],
  },
  reactPerformance: {
    title: "React Performance",
    description: "Memoization, code splitting, and optimization techniques.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=00lxm_doFYw", name: "React Performance Tutorial" },
      { type: "Docs", link: "https://reactjs.org/docs/optimizing-performance.html", name: "React Performance Docs" },
    ],
  },
  reactTesting: {
    title: "React Testing",
    description: "Jest, React Testing Library, and testing strategies.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=7dTTFW7yACQ", name: "React Testing Tutorial" },
      { type: "Docs", link: "https://testing-library.com/docs/react-testing-library/intro/", name: "Testing Library Docs" },
    ],
  },

  // TypeScript Section
  typescript: {
    title: "TypeScript",
    description: "A strongly typed superset of JavaScript.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=gp5H0Vw39yw", name: "TypeScript Tutorial" },
      { type: "Docs", link: "https://www.typescriptlang.org/docs/", name: "TypeScript Official Docs" },
    ],
  },
  tsBasics: {
    title: "TypeScript Basics",
    description: "Types, interfaces, and basic type annotations.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=d56mG7DezGs", name: "TypeScript Basics" },
      { type: "Docs", link: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html", name: "TypeScript Handbook" },
    ],
  },
  tsAdvanced: {
    title: "Advanced TypeScript",
    description: "Generics, utility types, and advanced patterns.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=nViEqpgwxHE", name: "TypeScript Generics" },
      { type: "Docs", link: "https://www.typescriptlang.org/docs/handbook/2/generics.html", name: "TypeScript Generics Docs" },
    ],
  },

  // Testing Section
  testing: {
    title: "Testing",
    description: "Unit testing, integration testing, and end-to-end testing.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=7r4xVDI2vho", name: "Testing Tutorial" },
      { type: "Docs", link: "https://jestjs.io/docs/getting-started", name: "Jest Docs" },
    ],
  },
  unitTesting: {
    title: "Unit Testing",
    description: "Testing individual components and functions.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=FgnxcUQ5vho", name: "Unit Testing Tutorial" },
      { type: "Docs", link: "https://jestjs.io/docs/getting-started", name: "Jest Getting Started" },
    ],
  },
  e2eTesting: {
    title: "End-to-End Testing",
    description: "Testing complete user flows with tools like Cypress.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=8tL9NY--S6I", name: "Cypress Tutorial" },
      { type: "Docs", link: "https://docs.cypress.io/guides/overview/why-cypress", name: "Cypress Docs" },
    ],
  },

  // Performance Section
  performance: {
    title: "Performance Optimization",
    description: "Learn lazy loading, memoization, and profiling.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=cCOL7MC4Pl0", name: "Performance Tutorial" },
      { type: "Docs", link: "https://web.dev/performance/", name: "Web Performance Guide" },
    ],
  },
  bundleOptimization: {
    title: "Bundle Optimization",
    description: "Code splitting, tree shaking, and bundle analysis.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=0FDyB5h+QdQ", name: "Code Splitting Tutorial" },
      { type: "Docs", link: "https://web.dev/reduce-javascript-payloads-with-code-splitting/", name: "Code Splitting Guide" },
    ],
  },
  renderingOptimization: {
    title: "Rendering Optimization",
    description: "Virtual DOM, efficient re-renders, and optimization techniques.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=YKYig5oO2o8", name: "React Rendering Tutorial" },
      { type: "Docs", link: "https://reactjs.org/docs/optimizing-performance.html", name: "React Performance Docs" },
    ],
  },

  // Security Section
  security: {
    title: "Web Security",
    description: "XSS, CSRF, Content Security Policy, and HTTPS.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=2aQzi3F3T3Q", name: "Web Security Tutorial" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/Security", name: "MDN Web Security" },
    ],
  },
  xss: {
    title: "XSS Prevention",
    description: "Cross-site scripting attacks and prevention techniques.",
    resources: [
      { type: "Article", link: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html", name: "XSS Prevention Cheat Sheet" },
    ],
  },
  csrf: {
    title: "CSRF Protection",
    description: "Cross-site request forgery attacks and prevention.",
    resources: [
      { type: "Article", link: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html", name: "CSRF Prevention Cheat Sheet" },
    ],
  },

  // Build Tools Section
  buildTools: {
    title: "Build Tools",
    description: "Webpack, Vite, Babel, and package managers.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=MpGLUVbqoYQ", name: "Build Tools Tutorial" },
      { type: "Docs", link: "https://webpack.js.org/", name: "Webpack Docs" },
    ],
  },
  webpack: {
    title: "Webpack",
    description: "Module bundler for JavaScript applications.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=GU-2T7k9NfI", name: "Webpack Tutorial" },
      { type: "Docs", link: "https://webpack.js.org/concepts/", name: "Webpack Concepts" },
    ],
  },
  vite: {
    title: "Vite",
    description: "Next generation frontend tooling.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=KCrXgy8qtjM", name: "Vite Tutorial" },
      { type: "Docs", link: "https://vitejs.dev/guide/", name: "Vite Guide" },
    ],
  },

  // DevOps Section
  devops: {
    title: "Frontend DevOps",
    description: "CI/CD pipelines, Docker basics, and deployment.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=9pZ2xmsSDdo", name: "Frontend DevOps Tutorial" },
      { type: "Docs", link: "https://docs.github.com/en/actions", name: "GitHub Actions Docs" },
    ],
  },
  cicd: {
    title: "CI/CD Pipelines",
    description: "Automated testing and deployment workflows.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=scEDHsr3APg", name: "CI/CD Tutorial" },
      { type: "Docs", link: "https://docs.github.com/en/actions/guides/about-continuous-integration", name: "GitHub CI/CD" },
    ],
  },
  docker: {
    title: "Docker for Frontend",
    description: "Containerization for frontend applications.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=3c-iBn73dDE", name: "Docker Tutorial" },
      { type: "Docs", link: "https://docs.docker.com/get-started/", name: "Docker Getting Started" },
    ],
  },
};

// 🔹 Define nodes
const nodes = [
  // Root node
  { id: "root", data: { label: "Frontend Roadmap" }, position: { x: 1000, y: 50 }, style: nodeStyles.root },

  // Main topics
  { id: "html", data: { label: "HTML" }, position: { x: 200, y: 200 }, style: nodeStyles.main },
  { id: "css", data: { label: "CSS" }, position: { x: 500, y: 200 }, style: nodeStyles.main },
  { id: "js", data: { label: "JavaScript" }, position: { x: 800, y: 200 }, style: nodeStyles.main },
  { id: "react", data: { label: "React" }, position: { x: 1100, y: 200 }, style: nodeStyles.main },
  { id: "typescript", data: { label: "TypeScript" }, position: { x: 1400, y: 200 }, style: nodeStyles.main },
  { id: "testing", data: { label: "Testing" }, position: { x: 1700, y: 200 }, style: nodeStyles.main },
  { id: "performance", data: { label: "Performance" }, position: { x: 2000, y: 200 }, style: nodeStyles.main },
  { id: "security", data: { label: "Security" }, position: { x: 2300, y: 200 }, style: nodeStyles.main },
  { id: "buildTools", data: { label: "Build Tools" }, position: { x: 2600, y: 200 }, style: nodeStyles.main },
  { id: "devops", data: { label: "DevOps" }, position: { x: 2900, y: 200 }, style: nodeStyles.main },

  // HTML subtopics
  { id: "htmlSemantic", data: { label: "Semantic HTML" }, position: { x: 100, y: 350 }, style: nodeStyles.subtopic },
  { id: "htmlForms", data: { label: "Forms & Validation" }, position: { x: 250, y: 350 }, style: nodeStyles.subtopic },
  { id: "html5", data: { label: "HTML5 APIs" }, position: { x: 400, y: 350 }, style: nodeStyles.subtopic },

  // CSS subtopics
  { id: "cssLayout", data: { label: "Layout Systems" }, position: { x: 400, y: 350 }, style: nodeStyles.subtopic },
  { id: "cssAdvanced", data: { label: "Advanced CSS" }, position: { x: 550, y: 350 }, style: nodeStyles.subtopic },
  { id: "cssArchitecture", data: { label: "CSS Architecture" }, position: { x: 700, y: 350 }, style: nodeStyles.subtopic },

  // JavaScript subtopics
  { id: "jsDom", data: { label: "DOM Manipulation" }, position: { x: 650, y: 350 }, style: nodeStyles.subtopic },
  { id: "jsAsync", data: { label: "Async JS" }, position: { x: 800, y: 350 }, style: nodeStyles.subtopic },
  { id: "jsEs6", data: { label: "ES6+ Features" }, position: { x: 950, y: 350 }, style: nodeStyles.subtopic },
  { id: "jsAdvanced", data: { label: "Advanced JS" }, position: { x: 1100, y: 350 }, style: nodeStyles.advanced },

  // React subtopics
  { id: "reactHooks", data: { label: "React Hooks" }, position: { x: 950, y: 350 }, style: nodeStyles.subtopic },
  { id: "reactState", data: { label: "State Management" }, position: { x: 1100, y: 350 }, style: nodeStyles.subtopic },
  { id: "reactPerformance", data: { label: "Performance" }, position: { x: 1250, y: 350 }, style: nodeStyles.subtopic },
  { id: "reactTesting", data: { label: "Testing" }, position: { x: 1400, y: 350 }, style: nodeStyles.subtopic },

  // TypeScript subtopics
  { id: "tsBasics", data: { label: "TypeScript Basics" }, position: { x: 1250, y: 350 }, style: nodeStyles.subtopic },
  { id: "tsAdvanced", data: { label: "Advanced TS" }, position: { x: 1400, y: 350 }, style: nodeStyles.advanced },

  // Testing subtopics
  { id: "unitTesting", data: { label: "Unit Testing" }, position: { x: 1550, y: 350 }, style: nodeStyles.subtopic },
  { id: "e2eTesting", data: { label: "E2E Testing" }, position: { x: 1700, y: 350 }, style: nodeStyles.subtopic },

  // Performance subtopics
  { id: "bundleOptimization", data: { label: "Bundle Optimization" }, position: { x: 1850, y: 350 }, style: nodeStyles.subtopic },
  { id: "renderingOptimization", data: { label: "Rendering Optimization" }, position: { x: 2000, y: 350 }, style: nodeStyles.subtopic },

  // Security subtopics
  { id: "xss", data: { label: "XSS Prevention" }, position: { x: 2150, y: 350 }, style: nodeStyles.subtopic },
  { id: "csrf", data: { label: "CSRF Protection" }, position: { x: 2300, y: 350 }, style: nodeStyles.subtopic },

  // Build Tools subtopics
  { id: "webpack", data: { label: "Webpack" }, position: { x: 2450, y: 350 }, style: nodeStyles.subtopic },
  { id: "vite", data: { label: "Vite" }, position: { x: 2600, y: 350 }, style: nodeStyles.subtopic },

  // DevOps subtopics
  { id: "cicd", data: { label: "CI/CD" }, position: { x: 2750, y: 350 }, style: nodeStyles.subtopic },
  { id: "docker", data: { label: "Docker" }, position: { x: 2900, y: 350 }, style: nodeStyles.subtopic },
];

// 🔹 Define edges
const edges = [
  // Connections from root to main topics
  { id: "root-html", source: "root", target: "html" },
  { id: "root-css", source: "root", target: "css" },
  { id: "root-js", source: "root", target: "js" },
  { id: "root-react", source: "root", target: "react" },
  { id: "root-typescript", source: "root", target: "typescript" },
  { id: "root-testing", source: "root", target: "testing" },
  { id: "root-performance", source: "root", target: "performance" },
  { id: "root-security", source: "root", target: "security" },
  { id: "root-buildTools", source: "root", target: "buildTools" },
  { id: "root-devops", source: "root", target: "devops" },

  // HTML subtopics
  { id: "html-semantic", source: "html", target: "htmlSemantic" },
  { id: "html-forms", source: "html", target: "htmlForms" },
  { id: "html-html5", source: "html", target: "html5" },

  // CSS subtopics
  { id: "css-layout", source: "css", target: "cssLayout" },
  { id: "css-advanced", source: "css", target: "cssAdvanced" },
  { id: "css-architecture", source: "css", target: "cssArchitecture" },

  // JavaScript subtopics
  { id: "js-dom", source: "js", target: "jsDom" },
  { id: "js-async", source: "js", target: "jsAsync" },
  { id: "js-es6", source: "js", target: "jsEs6" },
  { id: "js-advanced", source: "js", target: "jsAdvanced" },

  // React subtopics
  { id: "react-hooks", source: "react", target: "reactHooks" },
  { id: "react-state", source: "react", target: "reactState" },
  { id: "react-performance", source: "react", target: "reactPerformance" },
  { id: "react-testing", source: "react", target: "reactTesting" },

  // TypeScript subtopics
  { id: "ts-basics", source: "typescript", target: "tsBasics" },
  { id: "ts-advanced", source: "typescript", target: "tsAdvanced" },

  // Testing subtopics
  { id: "testing-unit", source: "testing", target: "unitTesting" },
  { id: "testing-e2e", source: "testing", target: "e2eTesting" },

  // Performance subtopics
  { id: "performance-bundle", source: "performance", target: "bundleOptimization" },
  { id: "performance-rendering", source: "performance", target: "renderingOptimization" },

  // Security subtopics
  { id: "security-xss", source: "security", target: "xss" },
  { id: "security-csrf", source: "security", target: "csrf" },

  // Build Tools subtopics
  { id: "buildTools-webpack", source: "buildTools", target: "webpack" },
  { id: "buildTools-vite", source: "buildTools", target: "vite" },

  // DevOps subtopics
  { id: "devops-cicd", source: "devops", target: "cicd" },
  { id: "devops-docker", source: "devops", target: "docker" },
];

// 🔹 Main Component
const FrontendRoadmapGraph = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = (_, node) => {
    setSelectedNode(nodeResources[node.id]);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        fitView 
        onNodeClick={onNodeClick}
        style={{ background: "#F9FAFB" }}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>

      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
            width: "450px",
            zIndex: 1000,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h2 style={{ marginBottom: "10px", color: "#3B82F6" }}>{selectedNode.title}</h2>
          <p style={{ marginBottom: "15px", color: "#6B7280" }}>{selectedNode.description}</p>
          <h4 style={{ marginBottom: "10px" }}>Resources:</h4>
          <ul style={{ marginBottom: "15px", paddingLeft: "20px" }}>
            {selectedNode.resources.map((res, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                <a 
                  href={res.link} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ color: "#3B82F6", textDecoration: "underline" }}
                >
                  {res.type}: {res.name}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setSelectedNode(null)}
            style={{
              background: "#EF4444",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FrontendRoadmapGraph;
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
  },
  database: {
    background: "#DDD6FE",
    border: "2px solid #8B5CF6",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: "500",
    fontSize: "12px",
    width: 140,
  },
  devops: {
    background: "#FED7AA",
    border: "2px solid #EA580C",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: "500",
    fontSize: "12px",
    width: 140,
  }
};

// 🔹 Resource data for nodes
const nodeResources = {
  // Root node
  root: {
    title: "Backend Development Roadmap",
    description: "A comprehensive guide to backend development with detailed learning paths.",
    resources: [
      { type: "Roadmap", link: "https://roadmap.sh/backend", name: "Backend Developer Roadmap" },
      { type: "Article", link: "https://github.com/kamranahmedse/developer-roadmap", name: "Developer Roadmaps" },
    ],
  },

  // Programming Languages
  languages: {
    title: "Programming Languages",
    description: "Choose a backend programming language to specialize in.",
    resources: [
      { type: "Article", link: "https://www.freecodecamp.org/news/which-backend-language-should-i-learn-as-a-beginner/", name: "Choosing a Backend Language" },
    ],
  },
  nodejs: {
    title: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=TlB_eWDSMt4", name: "Node.js Tutorial" },
      { type: "Docs", link: "https://nodejs.org/en/docs/", name: "Node.js Official Docs" },
      { type: "Course", link: "https://www.freecodecamp.org/learn/back-end-development-and-apis/", name: "FreeCodeCamp Backend Course" },
    ],
  },
  python: {
    title: "Python",
    description: "Versatile language with strong backend frameworks like Django and Flask.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", name: "Python Tutorial" },
      { type: "Docs", link: "https://docs.python.org/3/", name: "Python Official Docs" },
    ],
  },
  java: {
    title: "Java",
    description: "Popular enterprise language with Spring framework.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=eIrMbAQSU34", name: "Java Tutorial" },
      { type: "Docs", link: "https://docs.oracle.com/javase/tutorial/", name: "Java Official Tutorial" },
    ],
  },
  go: {
    title: "Go",
    description: "Efficient language developed by Google for modern backend needs.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=YS4e4q9oBaU", name: "Go Tutorial" },
      { type: "Docs", link: "https://golang.org/doc/", name: "Go Official Docs" },
    ],
  },

  // Server Frameworks
  frameworks: {
    title: "Server Frameworks",
    description: "Frameworks that simplify backend development.",
    resources: [
      { type: "Article", link: "https://www.freecodecamp.org/news/top-backend-frameworks/", name: "Top Backend Frameworks" },
    ],
  },
  express: {
    title: "Express.js",
    description: "Minimal and flexible Node.js web application framework.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=SccSCuHhOw0", name: "Express.js Tutorial" },
      { type: "Docs", link: "https://expressjs.com/", name: "Express.js Official Docs" },
    ],
  },
  django: {
    title: "Django",
    description: "High-level Python Web framework that encourages rapid development.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=F5mRW0jo-U4", name: "Django Tutorial" },
      { type: "Docs", link: "https://docs.djangoproject.com/", name: "Django Official Docs" },
    ],
  },
  spring: {
    title: "Spring Boot",
    description: "Java-based framework for building microservices and web applications.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=vtPkZShrvXQ", name: "Spring Boot Tutorial" },
      { type: "Docs", link: "https://spring.io/projects/spring-boot", name: "Spring Boot Official Docs" },
    ],
  },

  // Databases
  databases: {
    title: "Databases",
    description: "Learn about different types of databases and their use cases.",
    resources: [
      { type: "Article", link: "https://www.freecodecamp.org/news/database-management-systems-explained/", name: "Database Management Systems" },
    ],
  },
  sql: {
    title: "SQL Databases",
    description: "Relational databases with structured query language.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=HXV3zeQKqGY", name: "SQL Tutorial" },
      { type: "Course", link: "https://www.w3schools.com/sql/", name: "W3Schools SQL Course" },
    ],
  },
  postgresql: {
    title: "PostgreSQL",
    description: "Powerful, open source object-relational database system.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=qw--VYLpxG4", name: "PostgreSQL Tutorial" },
      { type: "Docs", link: "https://www.postgresql.org/docs/", name: "PostgreSQL Official Docs" },
    ],
  },
  mysql: {
    title: "MySQL",
    description: "World's most popular open source database.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=7S_tz1z_5bA", name: "MySQL Tutorial" },
      { type: "Docs", link: "https://dev.mysql.com/doc/", name: "MySQL Official Docs" },
    ],
  },
  mongodb: {
    title: "MongoDB",
    description: "Document-oriented NoSQL database used for high volume data storage.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=ExcRbA7fy_A", name: "MongoDB Tutorial" },
      { type: "Docs", link: "https://docs.mongodb.com/", name: "MongoDB Official Docs" },
    ],
  },
  redis: {
    title: "Redis",
    description: "In-memory data structure store, used as a database, cache and message broker.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=CMdHDHEuOUE", name: "Redis Tutorial" },
      { type: "Docs", link: "https://redis.io/documentation", name: "Redis Official Docs" },
    ],
  },

  // API Development
  api: {
    title: "API Development",
    description: "Building and consuming APIs for web and mobile applications.",
    resources: [
      { type: "Article", link: "https://www.freecodecamp.org/news/what-is-an-api-and-how-to-design-it/", name: "API Design Guide" },
    ],
  },
  rest: {
    title: "REST APIs",
    description: "Architectural style for designing networked applications.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=SLwpqD8n3d0", name: "REST API Tutorial" },
      { type: "Article", link: "https://restfulapi.net/", name: "REST API Tutorial" },
    ],
  },
  graphql: {
    title: "GraphQL",
    description: "Query language for APIs and a runtime for fulfilling those queries.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=ed8SzALpx1Q", name: "GraphQL Tutorial" },
      { type: "Docs", link: "https://graphql.org/learn/", name: "GraphQL Official Docs" },
    ],
  },
  authentication: {
    title: "Authentication",
    description: "Implementing secure user authentication and authorization.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=UBUNrFtufWo", name: "Authentication Tutorial" },
      { type: "Article", link: "https://auth0.com/docs/get-started/authentication-and-authorization-flow", name: "Auth0 Guide" },
    ],
  },
  websockets: {
    title: "WebSockets",
    description: "Protocol for real-time, two-way communication between client and server.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=FduLSXEHLng", name: "WebSockets Tutorial" },
      { type: "Docs", link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", name: "WebSockets API Docs" },
    ],
  },

  // Caching
  caching: {
    title: "Caching",
    description: "Improving application performance through caching strategies.",
    resources: [
      { type: "Article", link: "https://www.freecodecamp.org/news/what-is-caching/", name: "What is Caching?" },
    ],
  },
  cdn: {
    title: "CDN",
    description: "Content Delivery Networks for distributing content globally.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=Bsq5cKkS33I", name: "CDN Explained" },
      { type: "Article", link: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", name: "What is a CDN?" },
    ],
  },
  serverCaching: {
    title: "Server-Side Caching",
    description: "Implementing caching at the server level for improved performance.",
    resources: [
      { type: "Article", link: "https://redis.com/redis-enterprise/use-cases/caching/", name: "Server-Side Caching" },
    ],
  },

  // Security
  security: {
    title: "Security",
    description: "Protecting applications from vulnerabilities and attacks.",
    resources: [
      { type: "Article", link: "https://owasp.org/www-project-top-ten/", name: "OWASP Top 10" },
    ],
  },
  https: {
    title: "HTTPS & SSL/TLS",
    description: "Secure communication over computer networks.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=S2iBR2ZlZf0", name: "HTTPS Explained" },
      { type: "Article", link: "https://letsencrypt.org/how-it-works/", name: "How HTTPS Works" },
    ],
  },
  encryption: {
    title: "Encryption",
    description: "Protecting data through encryption algorithms.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=AQDCe585Lnc", name: "Encryption Tutorial" },
      { type: "Article", link: "https://www.cloudflare.com/learning/ssl/what-is-encryption/", name: "What is Encryption?" },
    ],
  },

  // DevOps
  devops: {
    title: "DevOps",
    description: "Practices that combine software development and IT operations.",
    resources: [
      { type: "Article", link: "https://www.atlassian.com/devops", name: "What is DevOps?" },
    ],
  },
  ciCd: {
    title: "CI/CD",
    description: "Continuous Integration and Continuous Delivery/Deployment.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=scEDHsr3APg", name: "CI/CD Tutorial" },
      { type: "Article", link: "https://www.redhat.com/en/topics/devops/what-is-ci-cd", name: "What is CI/CD?" },
    ],
  },
  docker: {
    title: "Docker",
    description: "Platform for developing, shipping, and running applications in containers.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=3c-iBn73dDE", name: "Docker Tutorial" },
      { type: "Docs", link: "https://docs.docker.com/get-started/", name: "Docker Getting Started" },
    ],
  },
  kubernetes: {
    title: "Kubernetes",
    description: "Container orchestration system for automating deployment, scaling, and management.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=s_o8dwzRlu4", name: "Kubernetes Tutorial" },
      { type: "Docs", link: "https://kubernetes.io/docs/home/", name: "Kubernetes Official Docs" },
    ],
  },

  // Testing
  testing: {
    title: "Testing",
    description: "Ensuring application reliability through various testing methodologies.",
    resources: [
      { type: "Article", link: "https://www.freecodecamp.org/news/types-of-software-testing/", name: "Types of Software Testing" },
    ],
  },
  unitTesting: {
    title: "Unit Testing",
    description: "Testing individual components or functions of the application.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=FgnxcUQ5vho", name: "Unit Testing Tutorial" },
      { type: "Article", link: "https://martinfowler.com/bliki/UnitTest.html", name: "Unit Testing Principles" },
    ],
  },
  integrationTesting: {
    title: "Integration Testing",
    description: "Testing the combination of individual units and their interaction.",
    resources: [
      { type: "Article", link: "https://www.guru99.com/integration-testing.html", name: "Integration Testing Guide" },
    ],
  },

  // Architecture
  architecture: {
    title: "Architecture",
    description: "Designing scalable and maintainable backend systems.",
    resources: [
      { type: "Article", link: "https://www.freecodecamp.org/news/software-architecture-patterns/", name: "Software Architecture Patterns" },
    ],
  },
  microservices: {
    title: "Microservices",
    description: "Architectural style that structures an application as a collection of services.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=rv4LlmLmVWk", name: "Microservices Tutorial" },
      { type: "Article", link: "https://microservices.io/", name: "Microservices Guide" },
    ],
  },
  serverless: {
    title: "Serverless",
    description: "Cloud computing execution model where the cloud provider runs the server.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=9IYRC7gVNCs", name: "Serverless Tutorial" },
      { type: "Article", link: "https://www.serverless.com/learn/overview/", name: "Serverless Overview" },
    ],
  },
  messageBrokers: {
    title: "Message Brokers",
    description: "Middleware that enables services to communicate with each other.",
    resources: [
      { type: "YouTube", link: "https://www.youtube.com/watch?v=SIQYOw5gEUs", name: "Message Brokers Explained" },
      { type: "Article", link: "https://www.cloudamqp.com/blog/what-is-a-message-broker.html", name: "What is a Message Broker?" },
    ],
  },
};

// 🔹 Define nodes
const nodes = [
  // Root node
  { id: "root", data: { label: "Backend Roadmap" }, position: { x: 1000, y: 50 }, style: nodeStyles.root },

  // Main topics
  { id: "languages", data: { label: "Languages" }, position: { x: 200, y: 200 }, style: nodeStyles.main },
  { id: "frameworks", data: { label: "Frameworks" }, position: { x: 500, y: 200 }, style: nodeStyles.main },
  { id: "databases", data: { label: "Databases" }, position: { x: 800, y: 200 }, style: nodeStyles.main },
  { id: "api", data: { label: "API Development" }, position: { x: 1100, y: 200 }, style: nodeStyles.main },
  { id: "caching", data: { label: "Caching" }, position: { x: 1400, y: 200 }, style: nodeStyles.main },
  { id: "security", data: { label: "Security" }, position: { x: 1700, y: 200 }, style: nodeStyles.main },
  { id: "devops", data: { label: "DevOps" }, position: { x: 2000, y: 200 }, style: nodeStyles.main },
  { id: "testing", data: { label: "Testing" }, position: { x: 2300, y: 200 }, style: nodeStyles.main },
  { id: "architecture", data: { label: "Architecture" }, position: { x: 2600, y: 200 }, style: nodeStyles.main },

  // Languages subtopics
  { id: "nodejs", data: { label: "Node.js" }, position: { x: 100, y: 350 }, style: nodeStyles.subtopic },
  { id: "python", data: { label: "Python" }, position: { x: 250, y: 350 }, style: nodeStyles.subtopic },
  { id: "java", data: { label: "Java" }, position: { x: 400, y: 350 }, style: nodeStyles.subtopic },
  { id: "go", data: { label: "Go" }, position: { x: 550, y: 350 }, style: nodeStyles.subtopic },

  // Frameworks subtopics
  { id: "express", data: { label: "Express.js" }, position: { x: 400, y: 350 }, style: nodeStyles.subtopic },
  { id: "django", data: { label: "Django" }, position: { x: 550, y: 350 }, style: nodeStyles.subtopic },
  { id: "spring", data: { label: "Spring Boot" }, position: { x: 700, y: 350 }, style: nodeStyles.subtopic },

  // Databases subtopics
  { id: "sql", data: { label: "SQL Databases" }, position: { x: 650, y: 350 }, style: nodeStyles.database },
  { id: "postgresql", data: { label: "PostgreSQL" }, position: { x: 800, y: 350 }, style: nodeStyles.database },
  { id: "mysql", data: { label: "MySQL" }, position: { x: 950, y: 350 }, style: nodeStyles.database },
  { id: "mongodb", data: { label: "MongoDB" }, position: { x: 1100, y: 350 }, style: nodeStyles.database },
  { id: "redis", data: { label: "Redis" }, position: { x: 1250, y: 350 }, style: nodeStyles.database },

  // API Development subtopics
  { id: "rest", data: { label: "REST APIs" }, position: { x: 950, y: 350 }, style: nodeStyles.subtopic },
  { id: "graphql", data: { label: "GraphQL" }, position: { x: 1100, y: 350 }, style: nodeStyles.subtopic },
  { id: "authentication", data: { label: "Authentication" }, position: { x: 1250, y: 350 }, style: nodeStyles.subtopic },
  { id: "websockets", data: { label: "WebSockets" }, position: { x: 1400, y: 350 }, style: nodeStyles.subtopic },

  // Caching subtopics
  { id: "cdn", data: { label: "CDN" }, position: { x: 1250, y: 350 }, style: nodeStyles.subtopic },
  { id: "serverCaching", data: { label: "Server Caching" }, position: { x: 1400, y: 350 }, style: nodeStyles.subtopic },

  // Security subtopics
  { id: "https", data: { label: "HTTPS & SSL/TLS" }, position: { x: 1550, y: 350 }, style: nodeStyles.subtopic },
  { id: "encryption", data: { label: "Encryption" }, position: { x: 1700, y: 350 }, style: nodeStyles.subtopic },

  // DevOps subtopics
  { id: "ciCd", data: { label: "CI/CD" }, position: { x: 1850, y: 350 }, style: nodeStyles.devops },
  { id: "docker", data: { label: "Docker" }, position: { x: 2000, y: 350 }, style: nodeStyles.devops },
  { id: "kubernetes", data: { label: "Kubernetes" }, position: { x: 2150, y: 350 }, style: nodeStyles.devops },

  // Testing subtopics
  { id: "unitTesting", data: { label: "Unit Testing" }, position: { x: 2150, y: 350 }, style: nodeStyles.subtopic },
  { id: "integrationTesting", data: { label: "Integration Testing" }, position: { x: 2300, y: 350 }, style: nodeStyles.subtopic },

  // Architecture subtopics
  { id: "microservices", data: { label: "Microservices" }, position: { x: 2450, y: 350 }, style: nodeStyles.advanced },
  { id: "serverless", data: { label: "Serverless" }, position: { x: 2600, y: 350 }, style: nodeStyles.advanced },
  { id: "messageBrokers", data: { label: "Message Brokers" }, position: { x: 2750, y: 350 }, style: nodeStyles.advanced },
];

// 🔹 Define edges
const edges = [
  // Connections from root to main topics
  { id: "root-languages", source: "root", target: "languages" },
  { id: "root-frameworks", source: "root", target: "frameworks" },
  { id: "root-databases", source: "root", target: "databases" },
  { id: "root-api", source: "root", target: "api" },
  { id: "root-caching", source: "root", target: "caching" },
  { id: "root-security", source: "root", target: "security" },
  { id: "root-devops", source: "root", target: "devops" },
  { id: "root-testing", source: "root", target: "testing" },
  { id: "root-architecture", source: "root", target: "architecture" },

  // Languages subtopics
  { id: "languages-nodejs", source: "languages", target: "nodejs" },
  { id: "languages-python", source: "languages", target: "python" },
  { id: "languages-java", source: "languages", target: "java" },
  { id: "languages-go", source: "languages", target: "go" },

  // Frameworks subtopics
  { id: "frameworks-express", source: "frameworks", target: "express" },
  { id: "frameworks-django", source: "frameworks", target: "django" },
  { id: "frameworks-spring", source: "frameworks", target: "spring" },

  // Databases subtopics
  { id: "databases-sql", source: "databases", target: "sql" },
  { id: "databases-postgresql", source: "databases", target: "postgresql" },
  { id: "databases-mysql", source: "databases", target: "mysql" },
  { id: "databases-mongodb", source: "databases", target: "mongodb" },
  { id: "databases-redis", source: "databases", target: "redis" },

  // API Development subtopics
  { id: "api-rest", source: "api", target: "rest" },
  { id: "api-graphql", source: "api", target: "graphql" },
  { id: "api-authentication", source: "api", target: "authentication" },
  { id: "api-websockets", source: "api", target: "websockets" },

  // Caching subtopics
  { id: "caching-cdn", source: "caching", target: "cdn" },
  { id: "caching-serverCaching", source: "caching", target: "serverCaching" },

  // Security subtopics
  { id: "security-https", source: "security", target: "https" },
  { id: "security-encryption", source: "security", target: "encryption" },

  // DevOps subtopics
  { id: "devops-ciCd", source: "devops", target: "ciCd" },
  { id: "devops-docker", source: "devops", target: "docker" },
  { id: "devops-kubernetes", source: "devops", target: "kubernetes" },

  // Testing subtopics
  { id: "testing-unit", source: "testing", target: "unitTesting" },
  { id: "testing-integration", source: "testing", target: "integrationTesting" },

  // Architecture subtopics
  { id: "architecture-microservices", source: "architecture", target: "microservices" },
  { id: "architecture-serverless", source: "architecture", target: "serverless" },
  { id: "architecture-messageBrokers", source: "architecture", target: "messageBrokers" },
];

// 🔹 Main Component
const BackendRoadmapGraph = () => {
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

export default BackendRoadmapGraph;
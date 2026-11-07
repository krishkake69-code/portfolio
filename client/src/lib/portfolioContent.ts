/*
 * Portfolio Dynamic Content Store & Types
 * Powers live editing via the hidden /admin desk.
 */
import { useEffect, useState } from "react";

export type ProjectRecord = {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  github: string;
  demo?: string;
};

export type CapabilityRecord = {
  number: string;
  title: string;
  desc: string;
  tags: string[];
};

export type ChronicleRecord = {
  title: string;
  issuer: string;
  date: string;
  detail: string;
  href: string;
  tag: string;
};

export type ProfileData = {
  name: string;
  title: string;
  badge: string;
  location: string;
  tagline: string;
  heroBio: string;
  academicTag: string;
  cgpa: string;
  cgpaMax: string;
  highSchool12: string;
  highSchool10: string;
  schoolName: string;
  collegeName: string;
  collegeDegree: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  availability: string;
};

export type PortfolioContent = {
  profile: ProfileData;
  projects: ProjectRecord[];
  capabilities: CapabilityRecord[];
  chronicle: ChronicleRecord[];
};

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  profile: {
    name: "PRIYANSHU ATTRI",
    title: "Systems Programmer & Full-Stack Engineer",
    badge: "SEEKING SUMMER 2026 INTERNSHIP",
    location: "SRMIST Kattankulathur, Chennai",
    tagline:
      "Crafting resilient distributed backends, algorithmic architectures, and real-time interactive simulations.",
    heroBio:
      "Undergraduate engineer at SRMIST Kattankulathur specializing in Computer Science and Engineering. Dedicated to systems programming, low-latency computing, algorithm design, and real-time visualization.",
    academicTag: "B.Tech CSE @ SRMIST Kattankulathur (2024–2028)",
    cgpa: "9.43",
    cgpaMax: "10.00",
    highSchool12: "82.2%",
    highSchool10: "87.4%",
    schoolName: "G.D. Goenka Public School",
    collegeName: "SRM Institute of Science and Technology",
    collegeDegree: "B.Tech in Computer Science and Engineering (2024–2028)",
    email: "krishkake001@gmail.com",
    githubUrl: "https://github.com/krishkake69-code",
    linkedinUrl: "https://www.linkedin.com/in/priyanshu-attri-8a4a75317/",
    resumeUrl: "/certificates/resume.pdf",
    availability: "Available for Summer 2026 Internships & Open-Source Collaboration",
  },
  projects: [
    {
      id: "ai-heritage",
      code: "P-01",
      name: "AI Heritage Archive",
      type: "TypeScript · AI · Web",
      date: "2026 • AI / Heritage",
      summary:
        "Source-linked, human-verified digital archive preserving India's living heritage through AI-assisted transcription, structuring, search, map exploration, risk scoring and practitioner discovery.",
      problem:
        "India's intangible cultural heritage is scattered across unstructured oral records, handwritten manuscripts, and fragmented local databases with no unified discovery layer.",
      solution:
        "Built a full-stack archive platform with AI-assisted transcription, structured metadata, interactive map exploration, heritage risk scoring, and practitioner discovery.",
      stack: ["TypeScript", "AI", "Web", "APIs"],
      features: [
        "AI-assisted transcription and structured metadata indexing",
        "Interactive map exploration with heritage site risk scoring",
        "Practitioner discovery and source-linked verification",
      ],
      github: "https://github.com/krishkake69-code/ai-heritage-archive",
      demo: "https://github.com/krishkake69-code/ai-heritage-archive",
    },
    {
      id: "traffic-analyser",
      code: "P-02",
      name: "Smart Traffic Analytics Pro",
      type: "HTML · TypeScript · Three.js · Chart.js · TomTom API",
      date: "2026 • Data & Simulation",
      summary:
        "Data-driven road-safety platform for Indian highway zones: real-time 3D traffic simulation, TomTom incident sync, risk indexing, analytics dashboards and CSV action-plan export.",
      problem:
        "Indian highway zones lack accessible, real-time traffic risk analysis tools that combine live incident data with visual simulation for actionable safety planning.",
      solution:
        "Developed a platform combining Three.js 3D traffic simulation with TomTom API live incident sync, risk indexing algorithms, Chart.js analytics dashboards, and exportable CSV action plans.",
      stack: ["HTML", "TypeScript", "Three.js", "Chart.js", "TomTom API"],
      features: [
        "Real-time 3D traffic simulation with Three.js",
        "TomTom API incident sync and risk indexing",
        "Analytics dashboards and CSV action-plan export",
      ],
      github: "https://github.com/krishkake69-code/Traffic-",
      demo: "https://github.com/krishkake69-code/Traffic-",
    },
    {
      id: "attri-classes",
      code: "P-03",
      name: "Attri-classes (Chemistry Coaching Platform)",
      type: "TypeScript · React · Node.js · Vercel · Gemini AI",
      date: "2026 • Full-Stack / EdTech",
      summary:
        "Premium coaching platform for NEET, JEE, Boards and competitive Chemistry exams with admin panel, Gemini-powered AI features and Vercel KV/file storage.",
      problem:
        "Chemistry coaching institutes need a modern, mobile-friendly platform that combines curriculum delivery with AI-powered doubt resolution and administrative control.",
      solution:
        "Engineered a full-stack React + Node.js platform with an admin panel, Gemini AI-powered features for student assistance, and Vercel KV/file storage for reliable content delivery.",
      stack: ["TypeScript", "React", "Node.js", "Vercel", "Gemini AI"],
      features: [
        "NEET, JEE, Boards and competitive Chemistry exam preparation",
        "Gemini-powered AI features for doubt resolution",
        "Admin panel with Vercel KV/file storage",
      ],
      github: "https://github.com/krishkake69-code/Attri-classes",
      demo: "https://github.com/krishkake69-code/Attri-classes",
    },
    {
      id: "universe-portfolio",
      code: "P-04",
      name: "Universe Portfolio",
      type: "React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion · Three.js",
      date: "2026 • Cinematic Web",
      summary:
        "Cinematic, scroll-driven 3D portfolio presenting skills, projects, academics and achievements as a navigable universe.",
      problem:
        "Standard developer portfolios flatten a person's depth into static resume grids that fail to communicate craft, narrative progression, and technical range.",
      solution:
        "Built a scroll-driven 3D experience using React 19, Three.js particle canvas, Framer Motion transitions, and Tailwind CSS 4 with a navigable chapter rail and interactive project dossiers.",
      stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Framer Motion", "Three.js"],
      features: [
        "Cinematic scroll-driven 3D starfield canvas",
        "Interactive chapter rail with scroll-synced progress",
        "Slide-out project dossiers with verified credential links",
      ],
      github: "https://github.com/krishkake69-code/portfolio",
      demo: "https://portfolio-attri.vercel.app",
    },
  ],
  capabilities: [
    {
      number: "01",
      title: "Programming Languages",
      desc: "Proficient in C, C++, Python, JavaScript, TypeScript, and Java — from low-level systems programming and algorithmic problem-solving to full-stack application development.",
      tags: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java"],
    },
    {
      number: "02",
      title: "Web Development",
      desc: "Building responsive, performant web applications with React, Node.js, Tailwind CSS, HTML, and CSS — from coaching platforms to cinematic 3D portfolio experiences.",
      tags: ["React", "HTML", "CSS", "Node.js", "Tailwind CSS"],
    },
    {
      number: "03",
      title: "AI & Generative AI",
      desc: "Exploring artificial intelligence, APIs, and generative AI — integrating Gemini AI into production platforms and building AI-assisted heritage archives.",
      tags: ["AI", "APIs", "Generative AI", "Gemini"],
    },
    {
      number: "04",
      title: "Tools & Cybersecurity",
      desc: "Practical cybersecurity tasks and security fundamentals, with daily workflows powered by Git, GitHub, VS Code, and Three.js for 3D visualization.",
      tags: ["Git", "GitHub", "VS Code", "Three.js", "Cybersecurity"],
    },
  ],
  chronicle: [
    {
      title: "A Happy Little Somewhere",
      issuer: "Cloudoffthoughts",
      date: "PUBLICATION",
      detail: "Co-author of a published literary anthology; registered with ISBN 978-81-998233-4-1.",
      href: "/certificates/book1.pdf",
      tag: "BOOK",
    },
    {
      title: "Love at Minus One",
      issuer: "Cloudoffthoughts",
      date: "PUBLICATION",
      detail: "Co-author of a published literary anthology; registered with ISBN 978-81-998233-8-9.",
      href: "/certificates/book2.pdf",
      tag: "BOOK",
    },
    {
      title: "Tata Cybersecurity Analyst Simulation",
      issuer: "Tata / Forage",
      date: "JUN 2026",
      detail: "Practical tasks in cyber security — hands-on simulation covering security controls and incident response.",
      href: "/certificates/cyber-job-simulation.pdf",
      tag: "CERTIFICATION",
    },
    {
      title: "C Fundamentals",
      issuer: "Certificate of Completion",
      date: "13 JUN 2026",
      detail: "Completed C Fundamentals section. Certificate ID: i5IUHu-c-0xW5Z9.",
      href: "/certificates/c-fundamentals.pdf",
      tag: "CERTIFICATION",
    },
    {
      title: "ENDURO Workshop",
      issuer: "ENDURO × IIT Hyderabad",
      date: "AUG–SEP 2025",
      detail: "Software training and inner personality development program. Certificate ID: EN251157.",
      href: "/certificates/enduro-workshop.pdf",
      tag: "IIT HYDERABAD",
    },
    {
      title: "Confluence 1.0",
      issuer: "Team Coding Dakaits / Unstop",
      date: "28–29 DEC 2025",
      detail: "36-hour online hackathon (Idea Submission track).",
      href: "/certificates/confluence-hackathon.pdf",
      tag: "HACKATHON",
    },
    {
      title: "SRMIST Hackathon",
      issuer: "Team Byte Brigade",
      date: "31 JUL–01 AUG 2026",
      detail: "Collaborative engineering hackathon building software prototypes for real-world impact.",
      href: "/certificates/srmist-hackathon.pdf",
      tag: "HACKATHON",
    },
    {
      title: "Adobe University Hackathon",
      issuer: "Adobe / SRMIST Kattankulathur",
      date: "2026",
      detail: "Participation certificate organised by Adobe at SRMIST, Kattankulathur.",
      href: "/certificates/adobe-hackathon.pdf",
      tag: "HACKATHON",
    },
    {
      title: "Omnikon National Hackathon 2026",
      issuer: "Omnikon / SRMIST Kattankulathur",
      date: "2026",
      detail: "Participation certificate organised by Omnikon at SRMIST, Kattankulathur.",
      href: "/certificates/omnikon-hackathon.pdf",
      tag: "HACKATHON",
    },
    {
      title: "MINEVERSE 2.0 Coding Contest",
      issuer: "SQAC",
      date: "24–25 AUG 2026",
      detail: "Coding contest participation. Certificate ID: SQAC-MNV088-26-0001.",
      href: "/certificates/mineverse.pdf",
      tag: "COMPETITION",
    },
    {
      title: "International Mathematics Olympiad 2018",
      issuer: "Ingraham Institute English School, Ghaziabad",
      date: "2018",
      detail: "Class 6 participation — Olympiad rank 7,097.",
      href: "/certificates/imo-2018.pdf",
      tag: "OLYMPIAD",
    },
  ],
};

const STORAGE_KEY = "universe_portfolio_custom_content_v1";
const CONTENT_UPDATE_EVENT = "universe_portfolio_content_updated";

export function loadSavedContent(): PortfolioContent {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO_CONTENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_CONTENT;
    const parsed = JSON.parse(raw);
    return {
      profile: { ...DEFAULT_PORTFOLIO_CONTENT.profile, ...(parsed.profile || {}) },
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PORTFOLIO_CONTENT.projects,
      capabilities: Array.isArray(parsed.capabilities) ? parsed.capabilities : DEFAULT_PORTFOLIO_CONTENT.capabilities,
      chronicle: Array.isArray(parsed.chronicle) ? parsed.chronicle : DEFAULT_PORTFOLIO_CONTENT.chronicle,
    };
  } catch (err) {
    console.error("Failed to parse cached portfolio content:", err);
    return DEFAULT_PORTFOLIO_CONTENT;
  }
}

export async function saveContent(content: PortfolioContent, adminKey?: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new CustomEvent(CONTENT_UPDATE_EVENT, { detail: content }));

    // Sync with server if key provided or available
    const key = adminKey || sessionStorage.getItem("admin_auth_key") || "Krish#001";
    await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": key,
      },
      body: JSON.stringify(content),
    }).catch(() => {
      // Server sync error is tolerated; localStorage still holds source of truth
    });

    return true;
  } catch (err) {
    console.error("Failed to save content:", err);
    return false;
  }
}

export async function resetContentToDefault(adminKey?: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_UPDATE_EVENT, { detail: DEFAULT_PORTFOLIO_CONTENT }));

    const key = adminKey || sessionStorage.getItem("admin_auth_key") || "Krish#001";
    await fetch("/api/content/reset", {
      method: "POST",
      headers: { "x-admin-key": key },
    }).catch(() => {});

    return true;
  } catch (err) {
    console.error("Failed to reset content:", err);
    return false;
  }
}

export function usePortfolioContent(): PortfolioContent {
  const [content, setContent] = useState<PortfolioContent>(loadSavedContent);

  useEffect(() => {
    // 1. Initial background fetch from server
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((serverData) => {
        if (serverData && typeof serverData === "object" && serverData.profile) {
          const merged: PortfolioContent = {
            profile: { ...DEFAULT_PORTFOLIO_CONTENT.profile, ...(serverData.profile || {}) },
            projects: Array.isArray(serverData.projects) ? serverData.projects : DEFAULT_PORTFOLIO_CONTENT.projects,
            capabilities: Array.isArray(serverData.capabilities) ? serverData.capabilities : DEFAULT_PORTFOLIO_CONTENT.capabilities,
            chronicle: Array.isArray(serverData.chronicle) ? serverData.chronicle : DEFAULT_PORTFOLIO_CONTENT.chronicle,
          };
          setContent(merged);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch {}
        }
      })
      .catch(() => {});

    // 2. Listen to custom update events across windows/tabs/admin updates
    const handleUpdate = (e: Event) => {
      const custom = (e as CustomEvent).detail as PortfolioContent;
      if (custom) {
        setContent(custom);
      } else {
        setContent(loadSavedContent());
      }
    };

    window.addEventListener(CONTENT_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        setContent(loadSavedContent());
      }
    });

    return () => {
      window.removeEventListener(CONTENT_UPDATE_EVENT, handleUpdate);
    };
  }, []);

  return content;
}

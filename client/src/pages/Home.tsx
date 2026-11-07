/*
 * Priyanshu Attri — Universe Portfolio
 * Scroll-Based Storytelling Experience:
 * An interactive, cinematic flight path through Priyanshu's genesis, academia,
 * architectural capabilities, open-source artifacts, and verified chronicle.
 */
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Mail,
  FileText,
  Sparkles,
  X,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Download,
  BookOpen,
  Award,
  CheckCircle2,
  MoveDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ChapterRail, type Chapter } from "@/components/ChapterRail";
import { UniverseCanvas } from "@/components/UniverseCanvas";
import { buildContactMailto, validateContactFields } from "@/lib/contact";
import { usePortfolioContent, type ProjectRecord } from "@/lib/portfolioContent";

export { type ProjectRecord };

const chapters: Chapter[] = [
  { id: "hero", number: "00", label: "TRAJECTORY" },
  { id: "genesis", number: "01", label: "GENESIS" },
  { id: "orbit", number: "02", label: "ORBIT" },
  { id: "artifacts", number: "03", label: "ARTIFACTS" },
  { id: "chronicle", number: "04", label: "CHRONICLE" },
  { id: "portal", number: "05", label: "PORTAL" },
];

export default function Home() {
  const { profile, projects, capabilities, chronicle: chronicleItems } = usePortfolioContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [contactStatus, setContactStatus] = useState<"idle" | "invalid" | "opened">("idle");

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const deckRef = useRef<HTMLElement | null>(null);

  const activeChapter = chapters[activeIndex] ?? chapters[0];

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      company: String(form.get("company") ?? ""),
    };
    if (validateContactFields(fields)) {
      setContactStatus("invalid");
      return;
    }
    setContactStatus("opened");

    // Dispatch transmission to backend API for /admin desk
    try {
      fetch("/api/transmissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      }).catch((e) => console.warn("API transmission warning:", e));
    } catch {}

    window.location.href = buildContactMailto(fields);
    event.currentTarget.reset();
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const maxScroll = Math.max(1, docHeight - viewportHeight);

        // 1. Precise 0 - 100% scroll progress for the flight rail & laser
        const overallProgress = (scrollY / maxScroll) * 100;
        setScrollProgress(Math.max(0, Math.min(100, overallProgress)));

        // 2. Active Chapter focal line detection (at 42% viewport height)
        const focalLine = viewportHeight * 0.42;
        let detected = 0;

        for (let i = 0; i < sectionRefs.current.length; i++) {
          const sec = sectionRefs.current[i];
          if (!sec) continue;
          const rect = sec.getBoundingClientRect();
          if (rect.top <= focalLine && rect.bottom > focalLine) {
            detected = i;
            break;
          }
          if (rect.top <= focalLine) {
            detected = i;
          }
        }

        if (scrollY <= 60) {
          detected = 0;
        } else if (scrollY + viewportHeight >= docHeight - 40) {
          detected = chapters.length - 1;
        }

        setActiveIndex(detected);

        // 3. Active Chapter index tracking for telemetry HUD
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToChapter = (index: number) => {
    const section = sectionRefs.current[index];
    if (!section) return;
    setActiveIndex(index);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        scrollToChapter(Math.min(activeIndex + 1, chapters.length - 1));
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        scrollToChapter(Math.max(activeIndex - 1, 0));
      }
      if (event.key === "ArrowLeft") {
        setActiveDeckIndex((prev) => Math.max(0, prev - 1));
      }
      if (event.key === "ArrowRight") {
        setActiveDeckIndex((prev) => Math.min(projects.length - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const circumference = 219.91;
  const strokeOffset = circumference * (1 - (activeDeckIndex + 1) / projects.length);

  return (
    <main className="portfolio-story-root">
      {/* 1. Atmospheric Canvas Layer */}
      <UniverseCanvas activeIndex={activeIndex} />
      <div className="scene-vignette" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />

      {/* 2. Fixed Top Navigation & Story Status HUD */}
      <header className="story-header">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToChapter(0);
          }}
          className="story-brand"
        >
          {/* Note: Black square badge completely removed per user request */}
          <div className="story-brand-text">
            <span className="story-brand-name">PRIYANSHU ATTRI</span>
            <span className="story-brand-sub">SRM UNIVERSITY &bull; 9.65 CGPA &bull; STUDENT DEVELOPER</span>
          </div>
        </a>

        <div className="story-header-hud">
          <div className="hud-signal-pill">
            <span className="hud-signal-dot" />
            <span>ORBIT LOCKED // {activeChapter.number} &bull; {activeChapter.label}</span>
          </div>
          <a
            href="/resume.pdf"
            download="Priyanshu-Attri-Resume.pdf"
            className="story-btn-secondary"
            style={{ padding: "8px 18px", fontSize: "10.5px" }}
          >
            <Download size={13} /> DOWNLOAD RESUME
          </a>
        </div>
      </header>

      {/* 3. Left-Side Scroll Flight Path Rail (Text & Numbers strictly aligned) */}
      <ChapterRail
        chapters={chapters}
        activeIndex={activeIndex}
        scrollProgress={scrollProgress}
        onSelect={scrollToChapter}
      />

      {/* 4. Right Edge Flight Progress Laser Line */}
      <div
        className="flight-progress"
        style={{ transform: `scaleY(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      {/* 5. Floating Live Signal Beacon */}
      <a
        href="#portal"
        onClick={(e) => {
          e.preventDefault();
          scrollToChapter(5);
        }}
        className="cta-connect"
        aria-label="Jump to transmission channel"
      >
        <span className="cta-connect-pulse" />
        <span className="cta-connect-text">SIGNAL ACTIVE // INITIALIZE TRANSMISSION</span>
      </a>

      {/* 6. Story Chapters (Vertical Scroll-Based Narrative) */}
      <div className="story-content">
        {/* ============================================================== */}
        {/* ACT 00 // TRAJECTORY */}
        {/* ============================================================== */}
        <section
          id="hero"
          ref={(node) => {
            sectionRefs.current[0] = node;
          }}
          className="story-stage"
        >
          <div className="story-act-label">
            <span className="story-act-line" /> ACT 00 // TRAJECTORY & IDENTITY
          </div>

          <h1 className="story-headline">
            <span className="story-hero-name">PRIYANSHU ATTRI</span>
            Builds Systems That Leave An <span className="fancy">Orbit.</span>
          </h1>

          <p className="story-deck">
            I am <strong>Priyanshu Attri</strong> — a second-year B.Tech student at
            <strong> SRM University</strong> with a <strong>9.65 CGPA</strong> (Semester 1: 9.82, Semester 2: 9.48),
            passionate about building technology, experimenting with AI, and turning ideas into real-world projects.
            Proficient in C, C++, Python, JavaScript and TypeScript; exploring cybersecurity and generative AI.
          </p>

          <div className="story-actions-row">
            <button
              type="button"
              onClick={() => scrollToChapter(3)}
              className="story-btn-primary"
            >
              EXPLORE ARTIFACTS <ArrowUpRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => scrollToChapter(1)}
              className="story-btn-secondary"
            >
              BEGIN THE GENESIS <MoveDown size={14} />
            </button>
            <a
              href="/resume.pdf"
              download="Priyanshu-Attri-Resume.pdf"
              className="story-btn-secondary"
            >
              <Download size={14} /> DOWNLOAD RESUME
            </a>
          </div>
        </section>

        {/* Marquee Story Ticker */}
        <div className="marquee-bar">
          <div className="marquee-content">
            <span>STUDENT DEVELOPER &bull; AI &amp; TECHNOLOGY ENTHUSIAST</span>
            <span>&bull;</span>
            <span>SRM UNIVERSITY &bull; 9.65 CGPA</span>
            <span>&bull;</span>
            <span>C &bull; C++ &bull; PYTHON &bull; JAVASCRIPT &bull; TYPESCRIPT</span>
            <span>&bull;</span>
            <span>PUBLISHED AUTHOR IN TWO ANTHOLOGIES</span>
            <span>&bull;</span>
            <span>STUDENT DEVELOPER &bull; AI &amp; TECHNOLOGY ENTHUSIAST</span>
            <span>&bull;</span>
            <span>SRM UNIVERSITY &bull; 9.65 CGPA</span>
            <span>&bull;</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ACT 01 // GENESIS */}
        {/* ============================================================== */}
        <section
          id="genesis"
          ref={(node) => {
            sectionRefs.current[1] = node;
          }}
          className="story-stage"
        >
          <div className="story-act-label">
            <span className="story-act-line" /> ACT 01 // GENESIS & DUAL MIND
          </div>

          <h2 className="story-headline">
            Before I Compiled Code, I Structured <span className="fancy">Thought.</span>
          </h2>

          <div className="genesis-grid">
            <div className="genesis-prose">
              <p>
                True software engineering is an editorial discipline. Long before architecting distributed systems or
                profiling algorithms, I learned the weight of precision by writing and publishing as a co-author in two
                printed literary anthologies: <em>A Happy Little Somewhere</em> (ISBN 978-81-998233-4-1) and{" "}
                <em>Love at Minus One</em>.
              </p>
              <p>
                Writing taught me that every paragraph must earn its place; coding taught me that every pointer, type definition,
                and algorithmic bound must be mathematically sound.
              </p>
              <p>
                This dual mindset translates directly into my academic rigor at <strong>SRM University</strong>, maintaining
                a <strong>9.65 CGPA</strong> across data structures, object-oriented paradigms, discrete mathematics, and
                systems programming, building on high distinction at <strong>Ingraham Institute (92.4%)</strong> and{" "}
                <strong>St. Xavier High School (88.8%)</strong>.
              </p>
            </div>

            <div className="genesis-stats-column">
              <div className="genesis-stat-card">
                <div className="stat-num">9.65</div>
                <div className="stat-desc">SRM University CGPA (Sem 1: 9.82, Sem 2: 9.48)</div>
              </div>
              <div className="genesis-stat-card">
                <div className="stat-num">09+</div>
                <div className="stat-desc">Public Repositories & Builds</div>
              </div>
              <div className="genesis-stat-card">
                <div className="stat-num">02</div>
                <div className="stat-desc">Published Literary Books</div>
              </div>
              <div className="genesis-stat-card">
                <div className="stat-num">09</div>
                <div className="stat-desc">Hackathons &amp; Certifications</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ACT 02 // ORBIT (Capabilities) */}
        {/* ============================================================== */}
        <section
          id="orbit"
          ref={(node) => {
            sectionRefs.current[2] = node;
          }}
          className="story-stage"
        >
          <div className="story-act-label">
            <span className="story-act-line" /> ACT 02 // THE ARCHITECTURAL ORBIT
          </div>

          <h2 className="story-headline">
            Translating Logic Into Living <span className="fancy">Architectures.</span>
          </h2>

          <p className="story-deck">
            A software system is more than syntax — it is a durable orbit designed to withstand scale, unexpected traffic,
            and complex boundary states. Here are the core quadrants of my technical craft.
          </p>

          <div className="capabilities-grid">
            {capabilities.map((cap) => (
              <div key={cap.number} className="capability-card">
                <div className="capability-header">
                  <span className="cap-code">{cap.number} // QUADRANT</span>
                  <Code2 size={18} className="text-cyan-300" />
                </div>
                <h3 className="cap-title">{cap.title}</h3>
                <p className="cap-desc">{cap.desc}</p>
                <div className="tag-pills-row">
                  {cap.tags.map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* ACT 03 // ARTIFACTS — INTERACTIVE STORYTELLING DECK */}
        {/* ============================================================== */}
        <section
          id="artifacts"
          ref={(node) => {
            sectionRefs.current[3] = node;
            deckRef.current = node;
          }}
          className="scroll-work-deck-container"
        >
          <div className="scroll-work-deck-sticky">
            <div className="work-deck-top-row">
              <div>
                <div className="story-act-label" style={{ marginBottom: "8px" }}>
                  <span className="story-act-line" /> ACT 03 // ARTIFACTS IN THE VOID
                </div>
                <h2
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--soft-white)",
                  }}
                >
                  Interactive Exhibit <span className="fancy">Deck.</span>
                </h2>
              </div>

              <div className="work-deck-step-counter">
                <svg width="68" height="68" viewBox="0 0 80 80" className="step-circle-svg">
                  <circle cx="40" cy="40" r="35" strokeWidth="3" fill="none" className="step-circle-bg" />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    strokeWidth="3.5"
                    fill="none"
                    className="step-circle-bar"
                    style={{ strokeDashoffset: strokeOffset }}
                  />
                </svg>
                <div>
                  <div className="step-number-text">
                    0{activeDeckIndex + 1}{" "}
                    <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)" }}>
                      / 0{projects.length}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      color: "var(--signal-cyan)",
                      textTransform: "uppercase",
                    }}
                  >
                    EXHIBIT SELECTOR
                  </div>
                </div>

                <div className="deck-nav-arrows">
                  <button
                    type="button"
                    className="deck-nav-arrow-btn"
                    onClick={() => setActiveDeckIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeDeckIndex === 0}
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="deck-nav-arrow-btn"
                    onClick={() => setActiveDeckIndex((prev) => Math.min(projects.length - 1, prev + 1))}
                    disabled={activeDeckIndex === projects.length - 1}
                    aria-label="Next project"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Project Select Tabs */}
            <div className="deck-tabs-nav">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  className={`deck-tab-btn ${activeDeckIndex === idx ? "is-active" : ""}`}
                  onClick={() => setActiveDeckIndex(idx)}
                >
                  <span>0{idx + 1} &bull; {proj.name}</span>
                </button>
              ))}
            </div>

            {/* Interactive 3D Card Stage */}
            <div className="work-deck-stage-area">
              {projects.map((proj, i) => {
                const diff = i - activeDeckIndex;
                const isSelected = diff === 0;

                let translateY = 0;
                let scale = 1;
                let opacity = 1;
                let filter = "none";
                let zIndex = 10;

                if (isSelected) {
                  translateY = 0;
                  scale = 1;
                  opacity = 1;
                  filter = "none";
                  zIndex = 20;
                } else if (diff > 0) {
                  translateY = Math.min(diff * 14, 28);
                  scale = Math.max(0.92, 1 - diff * 0.04);
                  opacity = Math.max(0.15, 0.45 - diff * 0.15);
                  filter = "blur(2px)";
                  zIndex = 10 - diff;
                } else {
                  translateY = -24;
                  scale = 0.94;
                  opacity = 0;
                  filter = "blur(6px)";
                  zIndex = 5;
                }

                return (
                  <div
                    key={proj.id}
                    className="work-card-deck-item"
                    onClick={() => !isSelected && setActiveDeckIndex(i)}
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      filter,
                      pointerEvents: isSelected ? "auto" : diff > 0 ? "auto" : "none",
                      zIndex,
                      cursor: isSelected ? "default" : "pointer",
                    }}
                  >
                    <div>
                      <div className="deck-item-topline">
                        <span>{proj.date}</span>
                      </div>
                      <h3 className="deck-item-title">{proj.name}</h3>
                      <p className="deck-item-summary">{proj.summary}</p>
                    </div>

                    <div className="deck-item-bottom">
                      <div className="tag-pills-row">
                        {proj.stack.map((stk) => (
                          <span key={stk} className="tag-pill">{stk}</span>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <button
                          type="button"
                          className="deck-inspect-btn"
                          onClick={() => setSelectedProject(proj)}
                        >
                          INSPECT FULL DOSSIER <ArrowUpRight size={13} />
                        </button>
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="story-btn-secondary"
                          style={{ padding: "10px 18px", fontSize: "11px" }}
                        >
                          <Github size={13} /> GITHUB
                        </a>
                        {proj.demo && (
                          <a
                            href={proj.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="story-btn-secondary"
                            style={{ padding: "10px 18px", fontSize: "11px" }}
                          >
                            <ExternalLink size={13} /> DEMO
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comprehensive All-in-One Catalog */}
            <div style={{ marginTop: "30px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="story-act-line" style={{ width: "24px" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.18em", color: "var(--signal-cyan)", textTransform: "uppercase" }}>
                ALL 4 RESUME ARTIFACTS AT A GLANCE
              </span>
            </div>

            <div className="artifacts-grid">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="artifact-card"
                  onClick={() => setSelectedProject(proj)}
                >
                  <div>
                    <div className="deck-item-topline" style={{ marginBottom: "12px" }}>
                      <span>{proj.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: "1.35rem", fontWeight: 700, margin: "0 0 10px", color: "var(--soft-white)" }}>
                      {proj.name}
                    </h3>
                    <p style={{ fontSize: "13.5px", lineHeight: "1.7", color: "var(--muted-text)", margin: "0 0 16px" }}>
                      {proj.summary}
                    </p>
                  </div>

                  <div>
                    <div className="tag-pills-row" style={{ marginBottom: "16px" }}>
                      {proj.stack.map((stk) => (
                        <span key={stk} className="tag-pill">{stk}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <button
                        type="button"
                        className="deck-inspect-btn"
                        style={{ padding: "8px 16px", fontSize: "10px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                      >
                        INSPECT <ArrowUpRight size={12} />
                      </button>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="story-btn-secondary"
                        style={{ padding: "8px 14px", fontSize: "10px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={12} /> GITHUB
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ACT 04 // CHRONICLE (Field Notes & Publications) */}
        {/* ============================================================== */}
        <section
          id="chronicle"
          ref={(node) => {
            sectionRefs.current[4] = node;
          }}
          className="story-stage"
        >
          <div className="story-act-label">
            <span className="story-act-line" /> ACT 04 // THE VERIFIED CHRONICLE
          </div>

          <h2 className="story-headline">
            The Journey Recorded In Print & <span className="fancy">Proof.</span>
          </h2>

          <p className="story-deck">
            Every technical claim and achievement is backed by public verification — registered book ISBNs, certified
            industry incident simulations, and intensive hackathon sprints.
          </p>

          <div className="chronicle-grid">
            {chronicleItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="chronicle-card"
              >
                <div className="chronicle-date">{item.date} &bull; {item.tag}</div>
                <h3 className="chronicle-title">{item.title}</h3>
                <div className="chronicle-issuer">{item.issuer}</div>
                <p className="chronicle-desc">{item.detail}</p>
                <div className="chronicle-verify-link">
                  INSPECT DOCUMENT / VERIFY <ArrowUpRight size={13} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* ACT 05 // PORTAL (The Transmission) */}
        {/* ============================================================== */}
        <section
          id="portal"
          ref={(node) => {
            sectionRefs.current[5] = node;
          }}
          className="story-stage"
          style={{ minHeight: "90vh", paddingBottom: "160px" }}
        >
          <div className="story-act-label">
            <span className="story-act-line" /> ACT 05 // INITIALIZE TRANSMISSION
          </div>

          <h2 className="story-headline">
            Every Great System Begins With A <span className="fancy">Conversation.</span>
          </h2>

          <p className="story-deck">
            Whether you are scouting an ambitious engineering intern, looking for a collaborator on high-performance systems,
            or simply want to explore ideas that leave an orbit — my direct channel is open.
          </p>

          <div className="portal-form-wrapper">
            <form onSubmit={handleContactSubmit} className="portal-form-grid">
              <input type="text" name="company" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name / Organization"
                  required
                  className="portal-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  required
                  className="portal-input"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject / Topic / Opportunity"
                required
                className="portal-input"
              />

              <textarea
                name="message"
                placeholder="Your transmission message..."
                required
                className="portal-textarea"
              />

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", marginTop: "10px" }}>
                <button type="submit" className="portal-submit-btn">
                  SEND TRANSMISSION <ArrowUpRight size={15} />
                </button>
                <a
                  href="/resume.pdf"
                  download="Priyanshu-Attri-Resume.pdf"
                  className="story-btn-secondary"
                >
                  <Download size={14} /> DOWNLOAD RESUME
                </a>
              </div>

              {contactStatus === "opened" && (
                <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--live-green)", margin: "10px 0 0" }}>
                  ✓ Email client initialized with your prefilled transmission.
                </p>
              )}
              {contactStatus === "invalid" && (
                <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--crimson)", margin: "10px 0 0" }}>
                  Please provide a valid name, email address, and message.
                </p>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(155, 231, 232, 0.12)" }}>
                <a href="mailto:krishkake69@gmail.com" className="story-btn-secondary" style={{ padding: "8px 16px", fontSize: "11px" }}>
                  <Mail size={13} /> krishkake69@gmail.com
                </a>
                <a href="https://github.com/krishkake69-code" target="_blank" rel="noreferrer" className="story-btn-secondary" style={{ padding: "8px 16px", fontSize: "11px" }}>
                  <Github size={13} /> github.com/krishkake69-code
                </a>
                <a href="https://instagram.com/priyanshu_.attri" target="_blank" rel="noreferrer" className="story-btn-secondary" style={{ padding: "8px 16px", fontSize: "11px" }}>
                  <span>IG: @priyanshu_.attri</span>
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* 7. Slide-out Project Dossier Drawer */}
      <div
        className={`dossier-drawer-backdrop ${selectedProject ? "is-open" : ""}`}
        onClick={() => setSelectedProject(null)}
      >
        <div className="dossier-drawer" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="dossier-close-btn"
            onClick={() => setSelectedProject(null)}
            aria-label="Close project dossier"
          >
            <X size={20} />
          </button>

          {selectedProject && (
            <>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "var(--signal-cyan)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                {selectedProject.code} // {selectedProject.date}
              </div>
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
                  fontWeight: 700,
                  margin: "0 0 16px",
                  color: "var(--soft-white)",
                }}
              >
                {selectedProject.name}
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.8",
                  color: "var(--muted-text)",
                  marginBottom: "28px",
                }}
              >
                {selectedProject.summary}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    color: "rgba(255, 255, 255, 0.45)",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  Problem Statement
                </h4>
                <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "rgba(237, 244, 250, 0.85)", margin: 0 }}>
                  {selectedProject.problem}
                </p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    color: "rgba(255, 255, 255, 0.45)",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  Architectural Solution
                </h4>
                <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "rgba(237, 244, 250, 0.85)", margin: 0 }}>
                  {selectedProject.solution}
                </p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    color: "rgba(255, 255, 255, 0.45)",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  Key Features & Contributions
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "18px",
                    color: "rgba(237, 244, 250, 0.8)",
                    fontSize: "14px",
                    lineHeight: "1.8",
                  }}
                >
                  {selectedProject.features.map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    color: "rgba(255, 255, 255, 0.45)",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  Technologies & Systems Stack
                </h4>
                <div className="tag-pills-row">
                  {selectedProject.stack.map((stk) => (
                    <span key={stk} className="tag-pill">{stk}</span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(155, 231, 232, 0.15)",
                }}
              >
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="story-btn-primary"
                  style={{ padding: "12px 22px", fontSize: "11px" }}
                >
                  <Github size={15} /> VISIT REPOSITORY
                </a>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="story-btn-secondary"
                    style={{ padding: "12px 22px", fontSize: "11px" }}
                  >
                    <ExternalLink size={15} /> LIVE EVIDENCE
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
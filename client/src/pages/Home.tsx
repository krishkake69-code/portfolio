/*
 * Cinematic Astral Editorial — Home
 * The main narrative is a vertical flight path through Priyanshu's universe.
 * Keep each stage asymmetrical, atmospheric, and readable before adding spectacle.
 */
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Download,
  AtSign,
  BrainCircuit,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Globe2,
  LockKeyhole,
  Orbit,
  Sparkles,
  Send,
  Terminal,
  Zap,
} from "lucide-react";
import { ChapterRail, type Chapter } from "@/components/ChapterRail";
import { ProjectDossier, type ProjectRecord } from "@/components/ProjectDossier";
import { UniverseCanvas } from "@/components/UniverseCanvas";
import { buildContactMailto, validateContactFields } from "@/lib/contact";

const ASSETS = {
  reference: "/manus-storage/astral-reference_949007dc.png",
  mark: "/manus-storage/orbital-mark_81abcd6f.png",
};

const chapters: Chapter[] = [
  { id: "hero", number: "00", label: "DEEP SPACE" },
  { id: "origin", number: "01", label: "ORIGIN" },
  { id: "skills", number: "02", label: "SKILLS" },
  { id: "projects", number: "03", label: "PROJECTS" },
  { id: "academics", number: "04", label: "ACADEMICS" },
  { id: "achievements", number: "05", label: "FIELD NOTES" },
  { id: "contact", number: "06", label: "CONTACT" },
];

const projects: ProjectRecord[] = [
  {
    id: "ai-tutor",
    code: "P-01",
    name: "AI Tutor",
    type: "Learning system",
    color: "#9be7e8",
    summary: "A concept orbit for turning complex topics into clear, adaptive learning moments.",
    problem: "Students often need an explanation to change shape before an idea becomes intuitive.",
    solution: "An AI-led tutor direction that pairs structured prompts with a calm, human-readable interface.",
    stack: ["Python", "Generative AI", "React"],
    features: ["Context-aware explanations", "Learning-path experiments", "Prompt-led interaction"],
    github: "https://github.com/",
    demo: "https://github.com/",
  },
  {
    id: "heritage-archive",
    code: "P-02",
    name: "AI Heritage Archive",
    type: "Cultural interface",
    color: "#d6a56e",
    summary: "An archive direction where memory, language, and place become searchable signals.",
    problem: "Cultural material can be difficult to explore when it is separated from context and story.",
    solution: "A visual archive concept that connects fragments through metadata, narrative, and AI-assisted discovery.",
    stack: ["TypeScript", "APIs", "Figma"],
    features: ["Story-first browsing", "Semantic discovery", "Layered archive metadata"],
    github: "https://github.com/",
    demo: "https://github.com/",
  },
  {
    id: "portfolio-system",
    code: "P-03",
    name: "Universe Portfolio",
    type: "Web experience",
    color: "#a8a7ff",
    summary: "This portfolio: a living map of interests, built as a cinematic flight path instead of a resume grid.",
    problem: "Traditional portfolios flatten a person’s curiosity into a list of links.",
    solution: "A responsive narrative system that uses space, motion, and focused dossiers to give each thread room to breathe.",
    stack: ["React", "CSS", "Interaction design"],
    features: ["Scroll-linked camera language", "Accessible chapter rail", "Project dossier interaction"],
    github: "https://github.com/",
    demo: "#hero",
  },
  {
    id: "open-orbit",
    code: "P-04",
    name: "Open Orbit",
    type: "Experimental field",
    color: "#b8a0ff",
    summary: "A deliberately open orbit for the next build: an experiment waiting for the right question.",
    problem: "The best projects often begin before the shape of the answer is known.",
    solution: "A reserved slot for a future collaboration, hackathon build, or small tool that earns its place here.",
    stack: ["C++", "Node.js", "Git"],
    features: ["Open-ended prototyping", "Fast technical loops", "Room for collaboration"],
    github: "https://github.com/",
    demo: "https://github.com/",
  },
];

const skillGroups = [
  { label: "Programming", code: "PRG", icon: Code2, items: ["C", "C++", "Python", "JavaScript", "TypeScript"] },
  { label: "Web", code: "WEB", icon: Globe2, items: ["React", "HTML", "CSS", "Node.js"] },
  { label: "AI / Technology", code: "AI", icon: BrainCircuit, items: ["AI", "Machine Learning", "APIs", "Generative AI"] },
  { label: "Cybersecurity", code: "SEC", icon: LockKeyhole, items: ["Cyber Security", "Security Fundamentals", "Practical Tasks"] },
  { label: "Tools", code: "OPS", icon: Terminal, items: ["Git", "GitHub", "VS Code", "Figma"] },
];

const githubRepos = [
  { name: "HHGOA-TASK2", language: "AI / Python", detail: "Voice RAG over ai4bharat/MSMARCO-XI", stars: 0, forks: 0, href: "https://github.com/krishkake69-code/HHGOA-TASK2" },
  { name: "Attri-classes", language: "TypeScript", detail: "A website for teacher", stars: 1, forks: 0, href: "https://github.com/krishkake69-code/Attri-classes" },
  { name: "krishkake69-code", language: "Profile README", detail: "Personal developer profile and technical identity", stars: 0, forks: 0, href: "https://github.com/krishkake69-code/krishkake69-code" },
  { name: "Traffic-", language: "HTML", detail: "Traffic analyser / Smart Traffic Analytics Pro", stars: 0, forks: 0, href: "https://github.com/krishkake69-code/Traffic-" },
  { name: "nitro", language: "TypeScript", detail: "NitroStack Pizzaz Template", stars: 1, forks: 1, href: "https://github.com/krishkake69-code/nitro" },
  { name: "leetcode", language: "C++", detail: "LeetCode problem-solving practice", stars: 1, forks: 0, href: "https://github.com/krishkake69-code/leetcode" },
  { name: "nitrostack", language: "TypeScript", detail: "Framework for MCP servers and AI-native apps", stars: 1, forks: 0, href: "https://github.com/krishkake69-code/nitrostack" },
  { name: "step-weekly", language: "Java", detail: "Weekly Java learning workspace", stars: 0, forks: 0, href: "https://github.com/krishkake69-code/step-weekly" },
  { name: "OOPSBannerApp", language: "Java", detail: "Object-Oriented Programming learning project", stars: 0, forks: 0, href: "https://github.com/krishkake69-code/OOPSBannerApp" },
];

const githubSignals = ["9 PUBLIC REPOSITORIES", "6 FOLLOWERS", "3 STARS", "RECENT ACTIVITY LOGGED"];

const githubOrbProjects: ProjectRecord[] = githubRepos.map((repo, index) => {
  const colors = ["#9be7e8", "#d6a56e", "#a8a7ff", "#7fc8d7", "#b8a0ff", "#8ab6ef", "#d2b4ff", "#95d7c0", "#c5c7ff"];
  return {
    id: `github-${repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    code: `GH-${String(index + 1).padStart(2, "0")}`,
    name: repo.name,
    type: repo.language,
    color: colors[index],
    summary: repo.detail,
    problem: "A public repository in Priyanshu’s GitHub constellation, documented through its visible repository identity and README signals.",
    solution: repo.detail,
    stack: [repo.language, "GitHub"],
    features: ["Public repository", `${repo.stars} stars`, `${repo.forks} forks`],
    github: repo.href,
    demo: repo.href,
  };
});

const certificates = [
  { title: "Cyber Job Simulation", issuer: "Forage / Deloitte", date: "02 JUN 2026", detail: "Practical tasks in cyber security", href: "/manus-storage/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_6a1e62146fdb6fe76b0d14f8_1780376591908_completion_certificate_260602103556_cbd92045.pdf" },
  { title: "C Fundamentals", issuer: "Certificate of Completion", date: "13 JUN 2026", detail: "Completed C Fundamentals section", href: "/manus-storage/i5IUHu-c-0xW5Z9(1)(1)_792dd291.pdf" },
  { title: "ENDURO Workshop", issuer: "ENDURO × IIT Hyderabad", date: "AUG–SEP 2025", detail: "Software training & inner personality development", href: "/manus-storage/ENDURO25_EN251157_867646e1.pdf" },
  { title: "Confluence 1.0", issuer: "The Helper / Unstop", date: "28–29 DEC 2025", detail: "36-hour online hackathon participation", href: "/manus-storage/hackathon_885711f1.pdf" },
  { title: "SRMIST Hackathon", issuer: "Team Byte brigade", date: "31 JUL–01 AUG 2026", detail: "Hackathon participation certificate", href: "/manus-storage/priyanshu-attri-srmist-certificate(1)_4e7c1b75.pdf" },
  { title: "A Happy Little Somewhere", issuer: "Cloudoffthoughts", date: "PUBLICATION", detail: "Co-author of an anthology; ISBN 978-81-998233-4-1", href: "/manus-storage/book1_e888f390.pdf" },
  { title: "Love at Minus One", issuer: "Inkfetish Publication", date: "15 FEB 2026", detail: "Published contributing author in an anthology", href: "/manus-storage/book2_712dc548.pdf" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>("Python");
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelDirection, setTravelDirection] = useState<"forward" | "backward">("forward");
  const [contactStatus, setContactStatus] = useState<"idle" | "invalid" | "opened">("idle");
  const travelTimer = useRef<number | null>(null);
  const previousActiveIndex = useRef(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const activeChapter = chapters[activeIndex];
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
    window.location.href = buildContactMailto(fields);
    event.currentTarget.reset();
  };
  const selectedSkillDescription = useMemo(() => {
    const descriptions: Record<string, string> = {
      Python: "A dependable orbit for AI experiments and rapid prototypes.",
      React: "Turning interface systems into thoughtful, responsive tools.",
      "Generative AI": "Exploring what happens when language becomes an interface.",
      TypeScript: "Making ambitious ideas easier to reason about as they grow.",
      Figma: "Sketching the shape of a product before the code catches up.",
    };
    return descriptions[selectedSkill] ?? "A current tool in the learning orbit.";
  }, [selectedSkill]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.32) setActiveIndex(index);
        },
        { threshold: [0.32, 0.55], rootMargin: "-10% 0px -18%" },
      );
      observer.observe(section);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const previousIndex = previousActiveIndex.current;
    const isOriginSkillsTravel = (previousIndex === 1 && activeIndex === 2) || (previousIndex === 2 && activeIndex === 1);
    if (isOriginSkillsTravel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTravelDirection(activeIndex > previousIndex ? "forward" : "backward");
      setIsTraveling(true);
      if (travelTimer.current) window.clearTimeout(travelTimer.current);
      travelTimer.current = window.setTimeout(() => setIsTraveling(false), 760);
    }
    previousActiveIndex.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => () => {
    if (travelTimer.current) window.clearTimeout(travelTimer.current);
  }, []);

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
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const scrollToChapter = (index: number) => {
    const section = sectionRefs.current[index];
    if (!section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (index !== activeIndex && !reducedMotion) {
      setTravelDirection(index > activeIndex ? "forward" : "backward");
      setIsTraveling(true);
      if (travelTimer.current) window.clearTimeout(travelTimer.current);
      travelTimer.current = window.setTimeout(() => setIsTraveling(false), 760);
    }
    section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <main className={`universe-shell ${isTraveling ? "is-traveling" : ""} travel-${travelDirection}`}>
      <UniverseCanvas activeIndex={activeIndex} />
      <div className="scene-vignette" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#hero" onClick={(event) => { event.preventDefault(); scrollToChapter(0); }}>
          <img src={ASSETS.mark} alt="" className="wordmark-mark" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling?.classList.add("is-visible"); }} />
          <span className="wordmark-mark-fallback" aria-hidden="true"><Orbit size={18} strokeWidth={1.5} /></span>
          <span><strong>PRIYANSHU</strong><em>ATTRI / UNIVERSE LOG</em></span>
        </a>
        <div className="header-signal"><span className="signal-dot" /> SIGNAL LOCKED <span className="header-divider" /> {activeChapter.number} / 06</div>
      </header>

      <ChapterRail chapters={chapters} activeIndex={activeIndex} onSelect={scrollToChapter} />

      <div className="mobile-status" aria-label="Current universe chapter">
        <span className="signal-dot" /> {activeChapter.number} / {activeChapter.label}
      </div>

      <div className="flight-progress" style={{ transform: `scaleY(${activeIndex / (chapters.length - 1)})` }} aria-hidden="true" />

      <div className="universe-content">
        <section id="hero" ref={(node) => { sectionRefs.current[0] = node; }} className="chapter-stage hero-stage">
          <div className="stage-copy hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> SECTOR 00 / DEEP SPACE</p>
            <div className="stage-stamp"><span className="stamp-mark"><span /></span><span>FIELD LOG / ENTRY 00</span><span>STATUS: SIGNAL LOCKED</span></div>
            <h1>Builds ideas<br /><span>that leave an orbit.</span></h1>
            <p className="hero-name">PRIYANSHU ATTRI</p>
            <p className="hero-deck">Student developer, AI enthusiast, and second-year SRM University explorer. I turn questions into systems, experiments, and real-world builds.</p>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => scrollToChapter(1)}>Begin exploration <ArrowDownRight size={17} /></button>
              <span className="hero-caption">2ND YEAR @ SRM UNIVERSITY <span className="caption-separator">/</span> 9.65 CGPA</span>
            </div>
          </div>
          <div className="hero-orbit-visual" aria-hidden="true">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-planet hero-planet-main"><img src={ASSETS.reference} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>
            <div className="hero-moon moon-one" />
            <div className="hero-moon moon-two" />
            <span className="visual-coordinate">17° 23′ N<br />72° 51′ E</span>
          </div>
          <div className="stage-footnote"><span>SCROLL TO TRAVEL</span><span className="footnote-line" /><span>EST. 2026</span></div>
        </section>

        <section id="origin" ref={(node) => { sectionRefs.current[1] = node; }} className="chapter-stage split-stage origin-stage">
          <div className="stage-copy origin-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> 01 / ORIGIN WORLD</p>
            <div className="stage-stamp"><span className="stamp-mark"><span /></span><span>PLANETARY RECORD / ORIGIN</span><span>STATUS: STABLE ORBIT</span></div>
            <h2>A curious mind<br /><span>with a stable orbit.</span></h2>
            <p className="section-lede">I’m Priyanshu Attri, a second-year student at SRM University, passionate about building technology, experimenting with AI, and turning ideas into real-world projects.</p>
            <div className="status-note"><span className="status-index">FIELD NOTE 01</span><span>Learning in public. Building with intent.</span></div>
          </div>
          <div className="origin-planet-visual" aria-hidden="true">
            <div className="planet-halo" />
            <div className="planet-orbit-line" />
            <div className="origin-planet" />
            <div className="avatar-astronaut"><span className="avatar-aura" /><div className="avatar-helmet"><img src="/manus-storage/priyanshu-github-avatar_5f600a9f.png" alt="" /></div><span className="avatar-tether" /><span className="avatar-label">PILOT / PA-01</span></div>
            <div className="github-activity-pulse"><div className="activity-pulse-head"><span><Github size={11} /> LIVE ACTIVITY</span><i /></div><img src="https://github.com/users/krishkake69-code/contributions?from=2026-01-01&amp;to=2026-12-31" alt="GitHub contribution activity for Priyanshu Attri" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling?.classList.add("is-visible"); }} /><span className="activity-fallback">ACTIVITY PULSE / VIEW PROFILE</span><a href="https://github.com/krishkake69-code" target="_blank" rel="noreferrer">OPEN GITHUB <ExternalLink size={10} /></a></div>
            <span className="planet-label origin-label"><Orbit size={13} /> ORIGIN / PA-01</span>
          </div>
          <div className="metrics-panel" aria-label="Academic performance">
            <div className="metric-primary"><span className="metric-label">CURRENT SIGNAL</span><strong>9.65</strong><span>CGPA / 10.00</span></div>
            <div className="metric-row"><span>SEMESTER 01</span><strong>9.82</strong><span>SGPA</span></div>
            <div className="metric-row"><span>SEMESTER 02</span><strong>9.48</strong><span>SGPA</span></div>
            <div className="metric-footer"><Check size={14} /> ACADEMIC STATION STABLE</div>
          </div>
        </section>

        <section id="skills" ref={(node) => { sectionRefs.current[2] = node; }} className="chapter-stage skills-stage">
          <div className="stage-copy skills-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> 02 / SKILLS ORBIT</p>
            <div className="stage-stamp"><span className="stamp-mark"><span /></span><span>INSTRUMENT SET / ACTIVE</span><span>STATUS: IN MOTION</span></div>
            <h2>Tools in motion.<br /><span>Always learning.</span></h2>
            <p className="section-lede">A working orbit of languages, frameworks, and creative tools. Hover a signal to bring it closer.</p>
          </div>
          <div className="skill-orbit-stage">
            <div className="skill-planet"><span>SKILLS</span><small>ACTIVE ORBIT</small></div>
            <div className="skill-orbit-ring ring-a" />
            <div className="skill-orbit-ring ring-b" />
            <div className="skill-orbit-nodes">
              {skillGroups.flatMap((group, groupIndex) => group.items.slice(0, 2).map((skill, index) => ({ skill, group, index, groupIndex }))).map(({ skill, group, index, groupIndex }) => (
                <button type="button" key={skill} className={`skill-node node-${groupIndex}-${index} ${selectedSkill === skill ? "is-active" : ""}`} onMouseEnter={() => setSelectedSkill(skill)} onFocus={() => setSelectedSkill(skill)} onClick={() => setSelectedSkill(skill)}>
                  <span className="node-icon"><group.icon size={17} /></span><span>{skill}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.label}>
                <div className="skill-group-head"><group.icon size={15} /><span>{group.code}</span><small>{group.label}</small></div>
                <div className="skill-list">{group.items.map((item) => <button type="button" key={item} className={selectedSkill === item ? "is-selected" : ""} onMouseEnter={() => setSelectedSkill(item)} onFocus={() => setSelectedSkill(item)} onClick={() => setSelectedSkill(item)}>{item}</button>)}</div>
              </div>
            ))}
          </div>
          <div className="skill-signal"><span className="signal-dot" /> {selectedSkill.toUpperCase()} / {selectedSkillDescription}</div>
        </section>

        <section id="projects" ref={(node) => { sectionRefs.current[3] = node; }} className="chapter-stage projects-stage">
          <div className="stage-copy projects-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> 03 / PROJECT GALAXY</p>
            <div className="stage-stamp"><span className="stamp-mark"><span /></span><span>ORBIT MAP / 04 BODIES</span><span>STATUS: DOSSIERS OPEN</span></div>
            <h2>Ideas get<br /><span>their own planets.</span></h2>
            <p className="section-lede">A solar system of explorations. Select a planet to open its dossier, then return to orbit when you’re done.</p>
          </div>
          <div className="galaxy-visual" aria-label="Project galaxy">
            
            <div className="galaxy-star"><Sparkles size={20} /><span>PROJECTS</span></div>
            {githubOrbProjects.map((project, index) => (
              <button type="button" key={project.id} className={`project-planet project-planet-${index + 1}`} onClick={() => setSelectedProject(project)} aria-label={`Open ${project.name} project dossier`}>
                <span className="project-planet-surface" style={{ background: `radial-gradient(circle at 32% 28%, ${project.color} 0%, ${project.color}aa 22%, #10152f 72%)` }} />
                <span className="project-planet-label"><small>{project.code}</small>{project.name}</span>
              </button>
            ))}
          </div>
          <div className="project-strip"><span><span className="signal-dot" /> 09 REPOSITORIES IN RANGE</span><button type="button" onClick={() => setSelectedProject(githubOrbProjects[0])}>Open first dossier <ArrowRight size={14} /></button></div>
        </section>

        <section id="academics" ref={(node) => { sectionRefs.current[4] = node; }} className="chapter-stage academics-stage">
          <div className="station-visual" aria-hidden="true">
            <div className="station-ring ring-a" /><div className="station-ring ring-b" /><div className="station-core"><span>SRM</span><small>UNIVERSITY</small></div>
            <div className="station-beam beam-one" /><div className="station-beam beam-two" />
            <span className="station-coordinate">13° 04′ N<br />80° 17′ E</span>
          </div>
          <div className="stage-copy station-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> 04 / ACADEMIC STATION</p>
            <div className="stage-stamp"><span className="stamp-mark"><span /></span><span>STATION LOG / SRM</span><span>STATUS: GROUNDED</span></div>
            <h2>Grounded in<br /><span>good questions.</span></h2>
            <p className="section-lede">The station behind the signal: a 2nd-year SRM University student with a 9.65 CGPA and a steady appetite for learning across code, AI, and technology.</p>
            <div className="academic-ledger">
              <div className="ledger-row"><span>SEMESTER 01</span><strong>9.82</strong><em>SGPA</em></div>
              <div className="ledger-row"><span>SEMESTER 02</span><strong>9.48</strong><em>SGPA</em></div>
              <div className="ledger-row is-locked"><LockKeyhole size={15} /><span>FUTURE MODULE</span><em>LOCKED / NOT YET RECORDED</em></div>
            </div>
          </div>
        </section>

        <section id="achievements" ref={(node) => { sectionRefs.current[5] = node; }} className="chapter-stage field-stage">
          <div className="stage-copy field-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> 05 / FIELD NOTES</p>
            <div className="stage-stamp"><span className="stamp-mark"><span /></span><span>ASTEROID FIELD / UNLOGGED</span><span>STATUS: FORMING</span></div>
            <h2>The next signal<br /><span>is still forming.</span></h2>
            <p className="section-lede">Some work deserves a name only after it has happened. This asteroid field holds the categories Priyanshu is actively exploring, without inventing milestones that have not been logged yet.</p>
            <div className="field-list">
              {[
                ["HACKATHONS", "Confluence 1.0 · SRMIST Hackathon"],
                ["CYBER SECURITY", "Forage / Deloitte job simulation"],
                ["PUBLICATIONS", "Two verified anthology contributions"],
                ["SOFTWARE TRAINING", "C Fundamentals · ENDURO × IIT Hyderabad"],
              ].map(([label, note], index) => <div className="field-row" key={label}><span>0{index + 1}</span><strong>{label}</strong><em>{note}</em><ChevronRight size={15} /></div>)}
            </div>
            <div className="certificate-ledger">
              <div className="certificate-ledger-head"><span><Orbit size={13} /> VERIFIED CREDENTIALS / 07</span><small>OPEN ORIGINAL</small></div>
              {certificates.map((certificate) => <a className="certificate-row" key={certificate.title} href={certificate.href} target="_blank" rel="noreferrer"><span className="certificate-seal"><Check size={12} /></span><span><strong>{certificate.title}</strong><small>{certificate.issuer} · {certificate.detail}</small></span><em>{certificate.date}</em><ExternalLink size={13} /></a>)}
            </div>
            <div className="github-ledger">
              <div className="github-ledger-head"><span><Github size={13} /> PUBLIC CODE CONSTELLATION / 09</span><a href="https://github.com/krishkake69-code" target="_blank" rel="noreferrer">VIEW PROFILE <ExternalLink size={12} /></a></div>
              <div className="github-signal-grid">{githubSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
              {githubRepos.map((repo) => <a className="repo-row" key={repo.name} href={repo.href} target="_blank" rel="noreferrer"><span className="repo-index">{String(githubRepos.indexOf(repo) + 1).padStart(2, "0")}</span><span><strong>{repo.name}</strong><small>{repo.detail}</small></span><em>{repo.language}</em><span className="repo-metrics">★ {repo.stars} · ⑂ {repo.forks}</span><ExternalLink size={13} /></a>)}
            </div>
          </div>
          <div className="asteroid-field" aria-hidden="true">
            <span className="asteroid asteroid-a" /><span className="asteroid asteroid-b" /><span className="asteroid asteroid-c" /><span className="asteroid asteroid-d" /><span className="asteroid asteroid-e" />
            <div className="field-orbit" /><div className="field-signal"><Zap size={13} /> LOGGING NEXT</div>
          </div>
        </section>

        <section id="contact" ref={(node) => { sectionRefs.current[6] = node; }} className="chapter-stage contact-stage">
          
          <div className="stage-copy contact-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> 06 / COSMIC PORTAL</p>
            <div className="stage-stamp"><span className="stamp-mark"><span /></span><span>CHANNEL 06 / OPEN</span><span>STATUS: READY TO RECEIVE</span></div>
            <h2>Let’s build<br /><span>something with gravity.</span></h2>
            <p className="section-lede">Every great project starts somewhere. If you have a question, an idea, or a problem worth orbiting, send a signal.</p>
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="contact-form-grid"><label className="contact-field"><span>YOUR NAME</span><input name="name" type="text" placeholder="Name" maxLength={80} autoComplete="name" required /></label><label className="contact-field"><span>YOUR EMAIL</span><input name="email" type="email" placeholder="you@example.com" maxLength={160} autoComplete="email" required /></label></div>
              <label className="contact-field"><span>SUBJECT</span><input name="subject" type="text" placeholder="What should we orbit?" maxLength={120} required /></label>
              <label className="contact-field"><span>MESSAGE</span><textarea name="message" placeholder="Tell me a little about the idea..." maxLength={2000} rows={4} required /></label>
              <label className="contact-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
              <div className="contact-form-footer"><button className="contact-submit" type="submit"><Send size={14} /> SEND SIGNAL</button><span className={`contact-form-status ${contactStatus}`} role="status">{contactStatus === "opened" ? "MAIL CLIENT OPENED" : contactStatus === "invalid" ? "CHECK THE SIGNAL FIELDS" : "PREFILLED EMAIL / READY"}</span></div>
            </form>
            <div className="contact-actions contact-links">
              <a className="contact-link" href="mailto:krishkake69@gmail.com"><AtSign size={17} /><span><small>EMAIL</small>krishkake69@gmail.com</span><ExternalLink size={14} /></a>
              <a className="contact-link" href="https://github.com/krishkake69-code" target="_blank" rel="noreferrer"><Github size={17} /><span><small>GITHUB</small>github.com / krishkake69-code</span><ExternalLink size={14} /></a>
              <a className="contact-link resume-download" href="/manus-storage/priyanshu-attri-resume_6f4cde77.pdf" download="Priyanshu-Attri-Resume.pdf"><FileText size={17} /><span><small>RESUME / DOWNLOAD</small>Priyanshu Attri / Resume PDF</span><Download size={14} /></a>
            </div>
          </div>
          <div className="portal-core" aria-hidden="true"><span className="portal-mark"><span /></span><div className="portal-ring ring-one" /><div className="portal-ring ring-two" /><div className="portal-ring ring-three" /><span>OPEN<br />CHANNEL</span></div>
          <footer className="site-footer"><span>PRIYANSHU ATTRI / UNIVERSE LOG</span><span>BUILT WITH CURIOSITY <Sparkles size={13} /></span></footer>
        </section>
      </div>

      <ProjectDossier project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}

/*
 * Hidden Admin Command Desk (/admin)
 * Access Key: Krish#001
 * Allows live editing of all frontend contents and inspection of transmissions.
 */
import { useEffect, useState } from "react";
import {
  Lock,
  Unlock,
  Radio,
  FileEdit,
  Save,
  RotateCcw,
  ExternalLink,
  Trash2,
  Plus,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Award,
  Cpu,
  User,
  LogOut,
  RefreshCw,
  Copy,
} from "lucide-react";
import {
  type PortfolioContent,
  type ProjectRecord,
  type ChronicleRecord,
  type CapabilityRecord,
  DEFAULT_PORTFOLIO_CONTENT,
  loadSavedContent,
  saveContent,
  resetContentToDefault,
} from "@/lib/portfolioContent";

type Transmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  receivedAt: string;
};

const ADMIN_PASSWORD = "Krish#001";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "transmissions" | "profile" | "projects" | "chronicle" | "capabilities"
  >("transmissions");

  // Transmissions state
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [isLoadingTx, setIsLoadingTx] = useState<boolean>(false);
  const [txNotice, setTxNotice] = useState<string>("");

  // Content state
  const [content, setContent] = useState<PortfolioContent>(loadSavedContent);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    const savedKey = sessionStorage.getItem("admin_auth_key");
    if (savedKey === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch transmissions and content when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchTransmissions();
    loadContentFromServer();
  }, [isAuthenticated]);

  const loadContentFromServer = async () => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        if (data && data.profile) {
          setContent({
            profile: { ...DEFAULT_PORTFOLIO_CONTENT.profile, ...(data.profile || {}) },
            projects: Array.isArray(data.projects) ? data.projects : DEFAULT_PORTFOLIO_CONTENT.projects,
            capabilities: Array.isArray(data.capabilities) ? data.capabilities : DEFAULT_PORTFOLIO_CONTENT.capabilities,
            chronicle: Array.isArray(data.chronicle) ? data.chronicle : DEFAULT_PORTFOLIO_CONTENT.chronicle,
          });
        }
      }
    } catch (e) {
      console.log("Using cached content");
    }
  };

  const fetchTransmissions = async () => {
    setIsLoadingTx(true);
    try {
      const res = await fetch("/api/transmissions", {
        headers: { "x-admin-key": ADMIN_PASSWORD },
      });
      if (res.ok) {
        const data = await res.json();
        setTransmissions(data.transmissions || []);
      }
    } catch (err) {
      console.error("Failed to fetch transmissions:", err);
    } finally {
      setIsLoadingTx(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth_key", ADMIN_PASSWORD);
      setLoginError("");
    } else {
      setLoginError("Invalid clearance key. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth_key");
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    const success = await saveContent(content, ADMIN_PASSWORD);
    if (success) {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Reset all content back to factory defaults? Any custom edits will be reverted.")) {
      await resetContentToDefault(ADMIN_PASSWORD);
      setContent(DEFAULT_PORTFOLIO_CONTENT);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const handleDeleteTx = async (id: string) => {
    try {
      await fetch(`/api/transmissions/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": ADMIN_PASSWORD },
      });
      setTransmissions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAllTx = async () => {
    if (window.confirm("Purge all transmissions permanently from the inbox?")) {
      try {
        await fetch("/api/transmissions", {
          method: "DELETE",
          headers: { "x-admin-key": ADMIN_PASSWORD },
        });
        setTransmissions([]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSendTestTx = async () => {
    try {
      const res = await fetch("/api/transmissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Dr. Elena Rostova",
          email: "elena.rostova@quantum-labs.io",
          company: "Quantum Distributed Systems Lab",
          subject: "Research Collaboration & Fellowship Inquiry",
          message:
            "Hello Priyanshu, we reviewed your work on high-frequency simulation and the AI Heritage Archive. We would love to discuss a research fellowship position for Fall 2026.",
        }),
      });
      if (res.ok) {
        setTxNotice("Test transmission dispatched and logged successfully!");
        fetchTransmissions();
        setTimeout(() => setTxNotice(""), 3500);
      }
    } catch {
      setTxNotice("Failed to send test transmission.");
    }
  };

  // Helper updaters
  const updateProfile = (field: keyof typeof content.profile, val: string) => {
    setContent((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: val },
    }));
  };

  const updateProject = (index: number, patch: Partial<ProjectRecord>) => {
    setContent((prev) => {
      const copy = [...prev.projects];
      copy[index] = { ...copy[index], ...patch };
      return { ...prev, projects: copy };
    });
  };

  const addProject = () => {
    const newProj: ProjectRecord = {
      id: "project-" + Date.now(),
      code: `P-0${content.projects.length + 1}`,
      name: "New System Artifact",
      type: "TypeScript · React · Systems",
      date: "2026 • Engineering",
      summary: "Description of the architectural solution and real-time mechanics.",
      problem: "Key operational or theoretical challenge addressed.",
      solution: "Algorithmic and structural implementation developed.",
      stack: ["TypeScript", "React", "Node.js"],
      features: ["Low-latency streaming pipeline", "Deterministic state model"],
      github: "https://github.com/krishkake69-code",
      demo: "https://github.com/krishkake69-code",
    };
    setContent((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const removeProject = (index: number) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateChronicle = (index: number, patch: Partial<ChronicleRecord>) => {
    setContent((prev) => {
      const copy = [...prev.chronicle];
      copy[index] = { ...copy[index], ...patch };
      return { ...prev, chronicle: copy };
    });
  };

  const addChronicle = () => {
    const item: ChronicleRecord = {
      title: "New Certification / Milestone",
      issuer: "Issuing Organization / Institution",
      date: "2026",
      detail: "Details regarding the verification, score, rank, or award description.",
      href: "/certificates/adobe-hackathon.pdf",
      tag: "ACHIEVEMENT",
    };
    setContent((prev) => ({ ...prev, chronicle: [item, ...prev.chronicle] }));
  };

  const removeChronicle = (index: number) => {
    setContent((prev) => ({
      ...prev,
      chronicle: prev.chronicle.filter((_, i) => i !== index),
    }));
  };

  const updateCapability = (index: number, patch: Partial<CapabilityRecord>) => {
    setContent((prev) => {
      const copy = [...prev.capabilities];
      copy[index] = { ...copy[index], ...patch };
      return { ...prev, capabilities: copy };
    });
  };

  // 1. Password Protection Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-4 selection:bg-cyan-500/30">
        <div className="w-full max-w-md bg-[#0d121d] border border-cyan-900/40 rounded-xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm tracking-[0.25em] font-mono text-cyan-400 uppercase">
                Restricted Terminal
              </h1>
              <p className="text-xs text-white/50 font-mono">KRISH // ORBITAL COMMAND DESK</p>
            </div>
          </div>

          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            Enter the authorized administrator clearance key to unlock real-time content modification and incoming transmission feeds.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-2">
                Access Key
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                className="w-full bg-[#080b12] border border-cyan-900/50 rounded-lg px-4 py-2.5 text-sm font-mono text-cyan-300 placeholder:text-white/20 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-2.5 bg-red-950/40 border border-red-800/50 rounded-lg text-red-400 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20 active:scale-[0.99]"
            >
              <Unlock className="w-3.5 h-3.5" />
              Authenticate Desk
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
            <span>SECURE PROXY 4096-BIT</span>
            <span>NODE // ENCRYPTED</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Admin Command Desk UI
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-200 font-sans selection:bg-cyan-500/30 pb-24">
      {/* Top Telemetry Header */}
      <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-cyan-950/60 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-400 font-semibold">
                COMMAND DESK // KRISH
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                ACTIVE ROOT
              </span>
            </div>
            <p className="text-[11px] text-white/40 font-mono">Live portfolio content & transmission control</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-500/50 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/80 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white text-xs font-mono font-medium transition shadow-lg shadow-cyan-950/40"
          >
            {saveStatus === "saved" ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Changes Saved!</span>
              </>
            ) : saveStatus === "saving" ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            title="Reset to factory defaults"
            className="p-1.5 rounded-lg border border-white/10 hover:border-amber-500/40 text-white/50 hover:text-amber-400 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            title="Lock desk & sign out"
            className="p-1.5 rounded-lg border border-white/10 hover:border-red-500/40 text-white/50 hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("transmissions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
              activeTab === "transmissions"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transmissions</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
              {transmissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
              activeTab === "profile"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Identity & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
              activeTab === "projects"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Projects Desk ({content.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("chronicle")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
              activeTab === "chronicle"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Chronicle & Certificates ({content.chronicle.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("capabilities")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
              activeTab === "capabilities"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Capabilities & Skills</span>
          </button>
        </div>

        {/* TAB 1: TRANSMISSIONS FEED */}
        {activeTab === "transmissions" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl bg-[#0b0f19] border border-cyan-950/60">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  Incoming Transmissions Radar
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  Messages submitted by visitors, recruiters, and collaborators via the Transmission Beacon on the home page.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchTransmissions}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-white/70 hover:text-cyan-300 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTx ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={handleSendTestTx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-400 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate Transmission</span>
                </button>
                {transmissions.length > 0 && (
                  <button
                    onClick={handleClearAllTx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-900/40 bg-red-950/20 hover:bg-red-950/40 text-xs font-mono text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Inbox</span>
                  </button>
                )}
              </div>
            </div>

            {txNotice && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{txNotice}</span>
              </div>
            )}

            {transmissions.length === 0 ? (
              <div className="p-16 rounded-xl border border-dashed border-white/10 text-center bg-[#090c14]">
                <Radio className="w-8 h-8 text-cyan-500/30 mx-auto mb-3" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-white/70">
                  Radar Horizon Clear
                </h3>
                <p className="text-xs text-white/40 max-w-md mx-auto mt-2">
                  No transmissions currently stored. Submissions from the home page contact form are captured here immediately. You can click "Simulate Transmission" above to test.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {transmissions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-5 rounded-xl bg-[#0c101b] border border-cyan-950/60 hover:border-cyan-800/50 transition relative overflow-hidden group"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-sm font-semibold text-white tracking-wide">
                            {tx.name}
                          </h3>
                          {tx.company && (
                            <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                              <Building className="w-3 h-3" />
                              {tx.company}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-white/50">
                          <a
                            href={`mailto:${tx.email}?subject=Re: ${encodeURIComponent(tx.subject)}`}
                            className="flex items-center gap-1 text-cyan-400 hover:underline"
                          >
                            <Mail className="w-3 h-3" />
                            {tx.email}
                          </a>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(tx.email);
                              setCopiedId(tx.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="text-[10px] font-mono text-white/40 hover:text-white flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedId === tx.id ? "Copied!" : "Copy"}
                          </button>
                          <span className="text-[11px] font-mono text-white/30">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {new Date(tx.receivedAt).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteTx(tx.id)}
                        className="opacity-60 group-hover:opacity-100 p-1.5 text-white/40 hover:text-red-400 transition rounded hover:bg-white/5"
                        title="Delete transmission"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5">
                      <div className="text-xs font-mono text-cyan-300 font-medium mb-1.5">
                        Subject: {tx.subject}
                      </div>
                      <p className="text-xs text-white/80 whitespace-pre-wrap leading-relaxed bg-[#080b12] p-3.5 rounded-lg border border-white/5 font-sans">
                        {tx.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROFILE & HERO */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-[#0b0f19] border border-cyan-950/60 rounded-xl p-6">
              <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Hero Trajectory & Genesis Identity
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={content.profile.name}
                    onChange={(e) => updateProfile("name", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Primary Title / Role
                  </label>
                  <input
                    type="text"
                    value={content.profile.title}
                    onChange={(e) => updateProfile("title", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Internship Badge Text
                  </label>
                  <input
                    type="text"
                    value={content.profile.badge}
                    onChange={(e) => updateProfile("badge", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-emerald-400 font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Academic Tag
                  </label>
                  <input
                    type="text"
                    value={content.profile.academicTag}
                    onChange={(e) => updateProfile("academicTag", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={content.profile.tagline}
                    onChange={(e) => updateProfile("tagline", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Hero Bio Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={content.profile.heroBio}
                    onChange={(e) => updateProfile("heroBio", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white leading-relaxed focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Academic Stats */}
            <div className="bg-[#0b0f19] border border-cyan-950/60 rounded-xl p-6">
              <h2 className="text-sm font-mono uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Academic Records & Verification
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Current CGPA
                  </label>
                  <input
                    type="text"
                    value={content.profile.cgpa}
                    onChange={(e) => updateProfile("cgpa", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Class XII Percentage
                  </label>
                  <input
                    type="text"
                    value={content.profile.highSchool12}
                    onChange={(e) => updateProfile("highSchool12", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Class X Percentage
                  </label>
                  <input
                    type="text"
                    value={content.profile.highSchool10}
                    onChange={(e) => updateProfile("highSchool10", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    value={content.profile.collegeName}
                    onChange={(e) => updateProfile("collegeName", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={content.profile.collegeDegree}
                    onChange={(e) => updateProfile("collegeDegree", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={content.profile.schoolName}
                    onChange={(e) => updateProfile("schoolName", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Links & Channels */}
            <div className="bg-[#0b0f19] border border-cyan-950/60 rounded-xl p-6">
              <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Channels, Dossier & Coordinates
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Primary Email
                  </label>
                  <input
                    type="text"
                    value={content.profile.email}
                    onChange={(e) => updateProfile("email", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Location / Base
                  </label>
                  <input
                    type="text"
                    value={content.profile.location}
                    onChange={(e) => updateProfile("location", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={content.profile.githubUrl}
                    onChange={(e) => updateProfile("githubUrl", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={content.profile.linkedinUrl}
                    onChange={(e) => updateProfile("linkedinUrl", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Resume / Dossier Path or URL
                  </label>
                  <input
                    type="text"
                    value={content.profile.resumeUrl}
                    onChange={(e) => updateProfile("resumeUrl", e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">System Artifacts (Projects)</h2>
                <p className="text-xs text-white/50">
                  Manage the projects shown in the scroll deck and catalog grid.
                </p>
              </div>
              <button
                onClick={addProject}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {content.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="bg-[#0b0f19] border border-cyan-950/60 rounded-xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                        {proj.code}
                      </span>
                      <span className="text-sm font-semibold text-white">{proj.name}</span>
                    </div>
                    <button
                      onClick={() => removeProject(idx)}
                      className="text-xs text-red-400/70 hover:text-red-400 p-1 flex items-center gap-1 font-mono transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Code
                      </label>
                      <input
                        type="text"
                        value={proj.code}
                        onChange={(e) => updateProject(idx, { code: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Title / Name
                      </label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(idx, { name: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Date & Classification (Top-Right Tag)
                      </label>
                      <input
                        type="text"
                        value={proj.date}
                        onChange={(e) => updateProject(idx, { date: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Executive Summary
                      </label>
                      <textarea
                        rows={2}
                        value={proj.summary}
                        onChange={(e) => updateProject(idx, { summary: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Problem Statement (Dossier)
                      </label>
                      <textarea
                        rows={2}
                        value={proj.problem}
                        onChange={(e) => updateProject(idx, { problem: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Architectural Solution (Dossier)
                      </label>
                      <textarea
                        rows={2}
                        value={proj.solution}
                        onChange={(e) => updateProject(idx, { solution: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Tech Stack (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={proj.stack.join(", ")}
                        onChange={(e) =>
                          updateProject(idx, {
                            stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        GitHub Repo URL
                      </label>
                      <input
                        type="text"
                        value={proj.github}
                        onChange={(e) => updateProject(idx, { github: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="text"
                        value={proj.demo || ""}
                        onChange={(e) => updateProject(idx, { demo: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CHRONICLE & CERTIFICATES */}
        {activeTab === "chronicle" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">Chronicle & Certificates</h2>
                <p className="text-xs text-white/50">
                  Manage the verified certificates, publications, hackathon awards, and workshops.
                </p>
              </div>
              <button
                onClick={addChronicle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.chronicle.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0f19] border border-cyan-950/60 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/40">
                      {item.tag || "CREDENTIAL"}
                    </span>
                    <button
                      onClick={() => removeChronicle(idx)}
                      className="text-xs text-red-400/70 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-0.5">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateChronicle(idx, { title: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1 text-xs text-white font-medium focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/50 mb-0.5">
                          Issuer
                        </label>
                        <input
                          type="text"
                          value={item.issuer}
                          onChange={(e) => updateChronicle(idx, { issuer: e.target.value })}
                          className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/50 mb-0.5">
                          Date
                        </label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => updateChronicle(idx, { date: e.target.value })}
                          className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-0.5">
                        Detail Description
                      </label>
                      <input
                        type="text"
                        value={item.detail}
                        onChange={(e) => updateChronicle(idx, { detail: e.target.value })}
                        className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1 text-xs text-white/80 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/50 mb-0.5">
                          Tag Category
                        </label>
                        <input
                          type="text"
                          value={item.tag}
                          onChange={(e) => updateChronicle(idx, { tag: e.target.value })}
                          className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/50 mb-0.5">
                          PDF File Link
                        </label>
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => updateChronicle(idx, { href: e.target.value })}
                          className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CAPABILITIES */}
        {activeTab === "capabilities" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-white">Capabilities & Skill Pillars</h2>
              <p className="text-xs text-white/50">
                Edit the 4 core capability pillars rendered in the Orbit section.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0f19] border border-cyan-950/60 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                    <span className="font-mono text-xs text-cyan-400 font-bold">{cap.number}</span>
                    <input
                      type="text"
                      value={cap.title}
                      onChange={(e) => updateCapability(idx, { title: e.target.value })}
                      className="bg-transparent text-sm font-semibold text-white focus:outline-none focus:border-b border-cyan-400 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={cap.desc}
                      onChange={(e) => updateCapability(idx, { desc: e.target.value })}
                      className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white leading-relaxed focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={cap.tags.join(", ")}
                      onChange={(e) =>
                        updateCapability(idx, {
                          tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

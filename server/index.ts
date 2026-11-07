import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADMIN_PASSWORD = "Krish#001";
const DATA_DIR = path.resolve(__dirname, "data");
const TRANSMISSIONS_FILE = path.join(DATA_DIR, "transmissions.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON<T>(file: string, fallback: T): T {
  try {
    if (!fs.existsSync(file)) return fallback;
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return fallback;
  }
}

function writeJSON<T>(file: string, data: T): boolean {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

export type TransmissionMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  receivedAt: string;
};

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // --- API Endpoints ---

  // Admin login check
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body || {};
    if (password === ADMIN_PASSWORD) {
      return res.json({ success: true, token: ADMIN_PASSWORD });
    }
    return res.status(401).json({ success: false, error: "Invalid access key" });
  });

  // Verify auth middleware helper
  const requireAdmin = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const authHeader = req.headers["x-admin-key"] || req.headers["authorization"];
    const token =
      typeof authHeader === "string"
        ? authHeader.replace(/^Bearer\s+/i, "").trim()
        : "";
    if (token === ADMIN_PASSWORD) {
      return next();
    }
    return res.status(401).json({ error: "Unauthorized access" });
  };

  // Submit a transmission (public)
  app.post("/api/transmissions", (req, res) => {
    const { name, email, subject, message, company } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields (name, email, message)" });
    }

    const current = readJSON<TransmissionMessage[]>(TRANSMISSIONS_FILE, []);
    const newTransmission: TransmissionMessage = {
      id: "tx-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      subject: String(subject || "General Inquiry").slice(0, 300),
      message: String(message).slice(0, 5000),
      company: company ? String(company).slice(0, 200) : undefined,
      receivedAt: new Date().toISOString(),
    };

    current.unshift(newTransmission);
    writeJSON(TRANSMISSIONS_FILE, current);

    return res.status(201).json({ success: true, transmission: newTransmission });
  });

  // Get all transmissions (admin only)
  app.get("/api/transmissions", requireAdmin, (_req, res) => {
    const items = readJSON<TransmissionMessage[]>(TRANSMISSIONS_FILE, []);
    return res.json({ transmissions: items });
  });

  // Delete a transmission (admin only)
  app.delete("/api/transmissions/:id", requireAdmin, (req, res) => {
    const { id } = req.params;
    let items = readJSON<TransmissionMessage[]>(TRANSMISSIONS_FILE, []);
    items = items.filter((item) => item.id !== id);
    writeJSON(TRANSMISSIONS_FILE, items);
    return res.json({ success: true });
  });

  // Clear all transmissions (admin only)
  app.delete("/api/transmissions", requireAdmin, (_req, res) => {
    writeJSON(TRANSMISSIONS_FILE, []);
    return res.json({ success: true });
  });

  // Get custom portfolio content
  app.get("/api/content", (_req, res) => {
    const content = readJSON<Record<string, unknown> | null>(CONTENT_FILE, null);
    return res.json(content || {});
  });

  // Update portfolio content (admin only)
  app.post("/api/content", requireAdmin, (req, res) => {
    const content = req.body;
    if (!content || typeof content !== "object") {
      return res.status(400).json({ error: "Invalid content body" });
    }
    writeJSON(CONTENT_FILE, content);
    return res.json({ success: true });
  });

  // Reset portfolio content (admin only)
  app.post("/api/content/reset", requireAdmin, (_req, res) => {
    if (fs.existsSync(CONTENT_FILE)) {
      try {
        fs.unlinkSync(CONTENT_FILE);
      } catch {}
    }
    return res.json({ success: true, reset: true });
  });

  // --- Static & SPA Routing ---

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Application not built. Run npm run build first.");
    }
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Universe Server running on http://localhost:${port}/`);
    console.log(`Admin desk available securely at /admin (password: Krish#001)`);
  });
}

startServer().catch(console.error);

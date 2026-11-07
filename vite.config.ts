import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { type Plugin, defineConfig } from "vite";

const ADMIN_PASSWORD = "Krish#001";
const DATA_DIR = path.resolve(import.meta.dirname, "server", "data");
const TRANSMISSIONS_FILE = path.join(DATA_DIR, "transmissions.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON<T>(file: string, fallback: T): T {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(file: string, data: T): void {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Vite dev API write error:", e);
  }
}

function apiDevPlugin(): Plugin {
  return {
    name: "api-dev-server",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split("?")[0] : "";

        // Admin login check
        if (url === "/api/admin/login" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const data = JSON.parse(body || "{}");
              if (data.password === ADMIN_PASSWORD) {
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ success: true, token: ADMIN_PASSWORD }));
              }
              res.writeHead(401, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ success: false, error: "Invalid access key" }));
            } catch {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
          return;
        }

        // Public submit transmission
        if (url === "/api/transmissions" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const { name, email, subject, message, company } = JSON.parse(body || "{}");
              if (!name || !email || !message) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Missing required fields" }));
              }
              const current = readJSON<any[]>(TRANSMISSIONS_FILE, []);
              const newTx = {
                id: "tx-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
                name: String(name).slice(0, 200),
                email: String(email).slice(0, 200),
                subject: String(subject || "General Inquiry").slice(0, 300),
                message: String(message).slice(0, 5000),
                company: company ? String(company).slice(0, 200) : undefined,
                receivedAt: new Date().toISOString(),
              };
              current.unshift(newTx);
              writeJSON(TRANSMISSIONS_FILE, current);
              res.writeHead(201, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ success: true, transmission: newTx }));
            } catch {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
          return;
        }

        // Admin check helper
        const isAdmin = () => {
          const key = (req.headers["x-admin-key"] as string) || (req.headers["authorization"] as string);
          return key === ADMIN_PASSWORD || key === `Bearer ${ADMIN_PASSWORD}`;
        };

        // Transmissions list
        if (url === "/api/transmissions" && req.method === "GET") {
          if (!isAdmin()) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Unauthorized" }));
          }
          const items = readJSON(TRANSMISSIONS_FILE, []);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ transmissions: items }));
        }

        // Delete single transmission
        if (url.startsWith("/api/transmissions/") && req.method === "DELETE") {
          if (!isAdmin()) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Unauthorized" }));
          }
          const id = url.split("/")[3];
          let items = readJSON<any[]>(TRANSMISSIONS_FILE, []);
          items = items.filter((item) => item.id !== id);
          writeJSON(TRANSMISSIONS_FILE, items);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: true }));
        }

        // Clear all transmissions
        if (url === "/api/transmissions" && req.method === "DELETE") {
          if (!isAdmin()) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Unauthorized" }));
          }
          writeJSON(TRANSMISSIONS_FILE, []);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: true }));
        }

        // Get content
        if (url === "/api/content" && req.method === "GET") {
          const content = readJSON(CONTENT_FILE, null);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(content || {}));
        }

        // Save content
        if (url === "/api/content" && req.method === "POST") {
          if (!isAdmin()) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Unauthorized" }));
          }
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const data = JSON.parse(body || "{}");
              writeJSON(CONTENT_FILE, data);
              res.writeHead(200, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ success: true }));
            } catch {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
          return;
        }

        // Reset content
        if (url === "/api/content/reset" && req.method === "POST") {
          if (!isAdmin()) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Unauthorized" }));
          }
          if (fs.existsSync(CONTENT_FILE)) {
            try {
              fs.unlinkSync(CONTENT_FILE);
            } catch {}
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: true, reset: true }));
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});

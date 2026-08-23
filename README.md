# 🌌 Priyanshu Attri — Universe Portfolio

A cinematic, space-themed personal portfolio built as an interactive flight path through my universe of skills, projects, and achievements.

> _"Builds ideas that leave an orbit."_

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Overview

This isn't a typical resume site — it's a **scroll-driven cinematic experience** where each section is a chapter in a cosmic narrative. The portfolio uses space metaphors (orbits, planets, star fields) to present my work in an immersive, story-first way.

### 🚀 Live Chapters

| Chapter | Section | Description |
|---------|---------|-------------|
| `00` | **Deep Space** | Hero landing with animated orbital visuals |
| `01` | **Origin** | About me, academic stats & GitHub activity |
| `02` | **Skills Orbit** | Interactive skill constellation with hover states |
| `03` | **Project Galaxy** | Clickable planet system — each project opens a detailed dossier |
| `04` | **Academic Station** | SRM University grades & semester breakdown |
| `05` | **Field Notes** | Certificates, hackathons, publications & GitHub repos |
| `06` | **Cosmic Portal** | Contact form with email integration |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, TypeScript, Framer Motion, Wouter (routing) |
| **Styling** | Tailwind CSS 4, CSS animations, custom cinematic theme |
| **UI Components** | Radix UI primitives, shadcn/ui, Lucide icons |
| **Backend** | Express.js (static server with SPA fallback) |
| **Build** | Vite 7, esbuild, pnpm |
| **Quality** | Prettier, Vitest |

---

## 🎯 Key Features

- 🌑 **Dark cinematic theme** — immersive astral editorial design
- 🎥 **Scroll-linked camera** — chapter rail navigation with travel animations
- 🪐 **Interactive project galaxy** — click planets to open detailed project dossiers
- ⌨️ **Keyboard navigation** — Arrow keys / Page Up/Down to travel between chapters
- 📱 **Fully responsive** — adapts from desktop to mobile
- ♿ **Accessible** — ARIA labels, reduced-motion support, semantic HTML
- ✉️ **Contact form** — prefills a mailto link with form data
- 📄 **Resume download** — one-click PDF download

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v10+)

### Installation

```bash
# Clone the repository
git clone https://github.com/krishkake69-code/portfolio.git
cd portfolio/priyanshu-universe-portfolio

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
# Build client + server
pnpm build

# Start production server
pnpm start
```

---

## 📁 Project Structure

```
priyanshu-universe-portfolio/
├── client/                  # Frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ChapterRail.tsx       # Side navigation rail
│   │   │   ├── ProjectDossier.tsx    # Project detail modal
│   │   │   ├── UniverseCanvas.tsx    # Animated star background
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── contexts/        # Theme context provider
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities & helpers
│   │   ├── pages/           # Route pages (Home, NotFound)
│   │   ├── App.tsx          # App shell & router
│   │   └── main.tsx         # Entry point
│   └── index.html           # HTML template
├── server/
│   └── index.ts             # Express server (SPA fallback)
├── shared/
│   └── const.ts             # Shared constants
├── drizzle/                 # Database schema (future use)
├── resume-pdf/              # Typst resume source & PDF
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 👤 About Me

**Priyanshu Attri** — 2nd year student at **SRM University** | **9.65 CGPA**

- 🧠 AI enthusiast & student developer
- 💻 Languages: C, C++, Python, JavaScript, TypeScript
- 🔐 Exploring cybersecurity fundamentals
- 📚 Published author in two anthologies

---

## 🔗 Links

- 🌐 **GitHub**: [github.com/krishkake69-code](https://github.com/krishkake69-code)
- 📧 **Email**: krishkake69@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  <em>Built with curiosity ✨</em>
</p>

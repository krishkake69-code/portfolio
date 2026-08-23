# Smart Traffic Analytics Pro

**AI-Powered Accident Prevention Dashboard with Real-Time Incident Monitoring**

A data-driven road safety platform built for Indian highway zones. The application provides AI-generated safety recommendations, a live TypeScript-powered incident fetching engine, an interactive 3D traffic simulation viewport, and an analytical dashboard for monitoring violations and accident prevention.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [TypeScript Build](#typescript-build)
- [TomTom API Integration](#tomtom-api-integration)
- [Contributing](#contributing)

---

## Overview

Smart Traffic Analytics Pro is a single-page application designed to assist traffic management authorities and road safety researchers in tracking, visualising, and responding to high-risk road zones across India. The platform correlates violations, accidents, and speeding incidents to generate a risk index, produce prioritised recommendations, and simulate real-world traffic conditions in a 3D environment.

---

## Key Features

### 3D Traffic Simulation

- Real-time 3D highway rendered using Three.js with animated vehicles, lane markings, and streetlights.
- Scene parameters adapt dynamically to the selected zone: higher violation counts increase vehicle density; higher speeding incidents raise vehicle velocity.
- Risk-level visualisations:
  - **High Risk:** Spawns a hazard zone with warning barriers and a stationary police patrol vehicle with alternating red-blue strobe lighting.
  - **Medium Risk:** Renders an automated radar speed-detection arch across the carriageway.
  - **Low Risk:** Displays standard steady traffic flow with no incident indicators.
- Camera modes: **Orbit View** (free navigation), **Chase Camera** (follows a selected vehicle), and **Overhead Traffic Camera** (top-down aerial perspective).
- Toggleable **Day/Night lighting cycle** affecting ambient scene illumination, street lamp activation, and vehicle headlights.

### Real-Time Incident Sync (TypeScript)

- Modular TypeScript service class (`TrafficService`) with strongly typed `Incident` and `FetchConfig` interfaces.
- Integrates with the **TomTom Traffic Incident Details API** using configurable bounding box parameters.
- Automatic fallback to a configurable mock incident stream when no API key is present, ensuring continuous demonstration capability.
- Active polling scheduler (`startLiveSync` / `stopLiveSync`) with configurable interval (default: 8 seconds).
- Live incidents are mapped to zone entries, automatically populating the sidebar and updating the 3D scene.

### Dashboard and Analytics

- Glassmorphic UI with translucent panel containers, glowing focus states, and dark gradient backgrounds.
- Sidebar zone selector with real-time risk estimation preview updating as form values are entered.
- Chart.js visualisations:
  - **Risk Breakdown:** Doughnut chart distributing tracked zones across High, Medium, and Low risk categories.
  - **Safety Impact Margin:** Bar chart showing the estimated percentage reduction in accident risk per zone.
- Sortable data grid listing all tracked zones with full metadata and top recommendations.
- CSV export generating a structured action plan for operational use.

---

## Project Structure

```
Traffic-/
├── index.html               # Application entry point, layout, styles, and main script
├── package.json             # Node.js project configuration and build scripts
├── tsconfig.json            # TypeScript compiler configuration
├── src/
│   └── traffic-service.ts   # TypeScript source — real-time incident fetching service
└── dist/
    └── traffic-service.js   # Transpiled JavaScript module loaded by index.html
```

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A modern web browser (Chrome, Edge, or Firefox recommended)

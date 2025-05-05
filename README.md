# 🧠 DMA Toolkit – All-in-One Web-Based DMA Utility Platform

**DMA Toolkit** is a modern, web-first platform that simplifies and automates the entire workflow of working with **Direct Memory Access (DMA)** setups — from device flashing to speed testing. It provides users with a clean, intuitive UI while offering powerful backend and agent-driven features, eliminating the need for complex local setup and CLI gymnastics.

---

## 🚀 What It Is

DMA Toolkit is a **full-stack platform** designed to centralize every DMA-related action through a **browser-based interface**, supported by a lightweight **local companion agent** for hardware-level tasks.

It removes the need to manually configure DMA tools, juggle binaries, or debug in the dark — the browser becomes your control center.

---

## 🧩 Key Features

| Feature             | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| 🏠 **Homepage / Setup Wizard** | A stunning landing page + first-time user guide for agent setup and connection. |
| 🧰 **Tool Downloader**         | Auto-select and download required binaries, drivers, and dependencies. |
| 🧠 **DMA ID Getter**           | Instantly fetch unique DMA device identifiers.                        |
| 🚀 **Speed Test**             | Real-time throughput benchmarks between host and target.              |
| 💾 **Firmware Flasher**       | Web-based firmware upload to connected devices.                        |
| 🔍 **System Checkup**         | Pre-flight diagnostics to verify all DMA components are working.      |
| 📜 **Logs Viewer**            | Unified logging interface from the agent and backend.                 |
| 💬 **Forum**                  | Built-in discussion board for users to ask questions and share setups. |

---

## 🌐 Architecture Overview

```
Frontend (Vite + React + Tailwind + Framer Motion)
    ↓ REST/WebSocket
Backend (Java Spring Boot + PostgreSQL)
    ↓ Agent RPC
Local Companion Agent (Rust)
```

---

## 🛠 Tech Stack

| Layer       | Tech Stack                        |
|-------------|-----------------------------------|
| Frontend    | Vite · React · TypeScript · TailwindCSS · Framer Motion |
| Backend     | Java · Spring Boot · WebSocket · PostgreSQL |
| Forum       | Flarum (Docker-based)             |
| Agent       | Rust (CLI + WebSocket client)     |
| Infrastructure | Docker · GitHub Actions · Docker Compose |

---

## 🖥️ Intended Use Cases

- Flash DMA devices across different platforms
- Benchmark performance for different hardware setups
- Provide user-friendly setup for DMA newcomers
- Troubleshoot DMA driver/firmware issues through UI
- Encourage community collaboration via a built-in forum

---

## ⚡ Project Philosophy

> "DMA installation can be hard — but it doesn't have to be. I am building a bridge between raw hardware control and intuitive UI to make the lives of many DMA newcomers easier."  
> – *Paradox.*

DMA Toolkit aims to revolutionize how we interface with hardware — not by simplifying capabilities, but by simplifying access to them.

---

## 🔐 Licensing

- Open source under the **MIT License**
- Encouraged for hobbyist, educational, and even professional use
- Companion agent is auditable and built with security in mind (minimal local privileges)

---

## 🗺️ Roadmap & Progress

### Current Status: Front-End Development (Phase 1)

- [x] Project scaffold complete
- [x] Heroic homepage with scroll-based sections
- [x] UI Components and Navigation
- [x] Framer Motion Animations
- [x] Responsive Layout
- [x] Setup Wizard UI
- [x] Tool Downloader UI
- [x] DMA ID Getter UI
- [x] Speed Test UI
- [x] Firmware Flasher UI
- [x] System Checkup UI
- [x] Logs Viewer UI
- [x] DMA Information Page
- [x] About Page
- [ ] Forum Integration with Flarum
- [ ] Backend API Connection
- [ ] WebSocket backend for live speed tests
- [ ] Agent Installation and Connection
- [ ] First stable release

---

## 🌟 Recent Updates

### v0.2.0 (Frontend Milestone)
- Completed all core UI pages with responsive design
- Implemented smooth animations using Framer Motion
- Fixed page transition animation issues
- Added comprehensive DMA information guide
- Interactive setup wizard with step-by-step process
- Tool download simulation with progress indicators
- Speed test UI with real-time graphs
- System checkup visualization with diagnostic results
- Logs viewer with filtering capabilities
- Firmware flasher with drag-and-drop support

### v0.1.0 (Initial Scaffold)
- Created project structure
- Set up monorepo architecture
- Initialized frontend with Vite + React + TypeScript
- Configured TailwindCSS
- Created main layout and navigation

---

## 📁 Structure

- `apps/frontend`: Web UI
- `apps/backend`: API and database logic
- `tools/agent`: Local Rust companion app
- `infra`: Docker + deployment
- `docs`: Architecture, API, setup

---

## 🚦 Getting Started

```bash
# Frontend
cd apps/frontend && npm install && npm run dev

# Backend
cd apps/backend && ./gradlew bootRun

# Local Agent
cd tools/agent && cargo run

# Start the Forum (Flarum)
cd infra && docker-compose -f docker-compose.yml -f ../forum/docker-compose.yml up -d
# The forum will be available at http://localhost:8888
```

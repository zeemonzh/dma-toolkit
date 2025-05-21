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

### Current Status: Early Development Phase

#### Frontend (70% Complete)
- [x] Project scaffold complete
- [x] Modern UI framework setup (Vite + React + TypeScript)
- [x] Responsive layout system with TailwindCSS
- [x] Beautiful animations with Framer Motion
- [x] Homepage with interactive elements
- [x] Navigation system with keyboard shortcuts
- [x] Basic UI components for all main features
- [x] Dark theme implementation
- [ ] Real-time data visualization components
- [ ] WebSocket connection handling
- [ ] Error handling and feedback systems
- [ ] Agent connection status management

#### Backend (20% Complete)
- [x] Project structure setup with Spring Boot
- [x] Basic API endpoints structure
- [ ] Database schema and migrations
- [ ] WebSocket server implementation
- [ ] Authentication system
- [ ] Device management logic
- [ ] Speed test orchestration
- [ ] Firmware management
- [ ] Logging system

#### Agent (30% Complete)
- [x] Basic Rust project structure
- [x] WebSocket client implementation
- [x] Command handling system
- [ ] Hardware interaction layer
- [ ] Device detection
- [ ] Speed test implementation
- [ ] Firmware flashing capability
- [ ] System diagnostics

#### Infrastructure (10% Complete)
- [x] Basic Docker setup
- [ ] CI/CD pipeline
- [ ] Development environment
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Backup system

---

## 📁 Structure

- `apps/frontend`: Web UI built with React
- `apps/backend`: Spring Boot API server
- `agent`: Rust-based local companion
- `infra`: Docker and deployment configs
- `docs`: Architecture and API documentation
- `forum`: Flarum-based community platform

---

## 🚦 Getting Started

```bash
# Frontend
cd apps/frontend && npm install && npm run dev

# Backend
cd apps/backend && ./gradlew bootRun

# Local Agent
cd agent && cargo run

# Start the Forum (Flarum)
cd infra && docker-compose -f docker-compose.yml -f ../forum/docker-compose.yml up -d
# The forum will be available at http://localhost:8888
```

---

## 🌟 Recent Updates

### v0.3.0 (In Progress)
- Implementing core functionality in all components
- Building real-time communication between components
- Developing hardware interaction layer in agent

### v0.2.0 (Frontend Foundation)
- Completed modern UI framework setup
- Implemented responsive layout system
- Added beautiful animations and transitions
- Created interactive homepage
- Developed navigation system with keyboard shortcuts
- Built UI shells for all main features

### v0.1.0 (Initial Scaffold)
- Created project structure
- Set up monorepo architecture
- Initialized all major components
- Configured basic build systems

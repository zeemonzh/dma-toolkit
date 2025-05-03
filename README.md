# DMA Web Toolkit

All-in-one web-based toolkit for DMA-related diagnostics, firmware flashing, speed tests, and setup automation.

## Structure

- `apps/frontend`: Web UI
- `apps/backend`: API and database logic
- `tools/agent`: Local Rust companion app
- `infra`: Docker + deployment
- `docs`: Architecture, API, setup

## Getting Started

```bash
cd apps/frontend && npm install && npm run dev
cd apps/backend && ./gradlew bootRun
cd tools/agent && cargo run

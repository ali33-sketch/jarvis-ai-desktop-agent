# JARVIS AI Desktop Agent

A JARVIS-like Windows desktop AI assistant built for voice, memory, file operations, browser actions, system monitoring, and autonomous task execution.

## Purpose

This project aims to create a desktop AI that can:

- take natural-language commands
- interpret user intent
- work with local files and folders
- open and control apps on Windows
- query system state and process information
- use browser automation when needed
- store memory about user preferences and workflows
- delegate work to specialized agents
- present a futuristic command-center interface

## Core Product Idea

The product is not just a chatbot. It is an agent operating environment for a Windows PC.

Users should be able to say things like:

- "Open VS Code and my project folder"
- "Start my work setup"
- "Find all video files from today and organize them"
- "What's using all my RAM?"
- "Research the latest React changes and summarize them in my notes"

## Current Scope

This repository starts with the documentation and architecture foundation for a Stonic-like experience and will evolve toward a working prototype.

## Documentation

- [Architecture Overview](docs/architecture.md)
- [Product Requirements / Specification](docs/product-spec.md)
- [Roadmap](docs/roadmap.md)
- [Implementation Backlog](docs/backlog.md)

## Recommended Tech Stack

- Desktop App: Tauri + React
- Backend: Rust
- AI Layer: OpenAI / Claude / Gemini
- Voice STT: Whisper or cloud transcription
- Voice TTS: ElevenLabs / Azure / local TTS
- Memory: SQLite + vector search layer
- Automation: PowerShell, Windows UI Automation, Playwright
- Browser Control: Playwright
- Data Storage: SQLite/PostgreSQL
- Auth: Supabase or custom auth
- Realtime: WebSocket or Server-Sent Events

## Project Positioning

This software sits between:

- a normal AI chatbot
- a Windows automation assistant
- a multi-agent desktop command center
- a personalized desktop copilot

## Future State

The final product should include:

- speech-based interaction
- tool-calling agent loop
- file and system automation
- memory and personalization
- multi-agent system for specialized tasks
- browser-based workflows
- desktop control and visual monitoring
- polished futuristic UI

---

This repository is currently in the planning and architecture phase.

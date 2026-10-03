# Issue Backlog Draft

## Epic 1: Build JARVIS AI Desktop Agent

### Feature 1: Build the desktop shell and app layout
- Setup Tauri + React shell
- Basic sidebar and navigation
- chat panel layout
- status bar and runtime indicators
- theme and command-center UI foundation

Relevant starter code:

```tsx
export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>JARVIS</h2>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <span>System Ready</span>
        </header>
      </main>
    </div>
  );
}
```

### Feature 2: Implement the AI orchestrator and tool-calling loop
- parse user intent
- decide whether to use tools
- structure agent steps
- return results to UI

Relevant starter code:

```ts
export async function runOrchestrator(input: string) {
  const intent = await classifyIntent(input);
  return {
    tool: "open_app",
    args: { appName: intent.appName }
  };
}
```

### Feature 3: Create local command and file operation tools
- app launch tool
- folder creation
- file listing
- PowerShell wrappers
- system query interface

Relevant starter code:

```ts
export async function openApp(appName: string) {
  return { ok: true, message: `Opened ${appName}` };
}
```

### Feature 4: Implement persistent memory and personalization
- SQLite memory table
- save preferences
- remember project folder
- context retrieval

Relevant starter code:

```sql
CREATE TABLE IF NOT EXISTS memories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);
```

### Feature 5: Add browser automation and web task support
- open web pages
- navigate search queries
- extract results
- summarize webpages

Relevant starter code:

```ts
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("https://github.com");
```

### Feature 6: Add voice interaction and spoken responses
- STT model setup
- wake word support
- TTS responses
- voice-controlled flow

Relevant starter code:

```ts
export async function transcribeAudio(audio: ArrayBuffer) {
  return "Open VS Code";
}
```

### Feature 7: Add multi-agent orchestration and delegation
- research agent
- system agent
- coding agent
- files agent
- shared context

Relevant starter code:

```ts
export type AgentName = "research" | "coding" | "files" | "system";
```

### Feature 8: Add safety, verification, and trust controls
- confirmation gate for destructive actions
- validate tool results
- log actions and outcomes
- allow user override

Relevant starter code:

```ts
export function requiresConfirmation(action: string) {
  return ["delete_folder", "install_app"].includes(action);
}
```

### Feature 9: Create the futuristic command-center UI
- world monitor visual layer
- status cards
- animated AI state
- themed dashboards

Relevant starter code:

```tsx
export function StatusCard({ label, value }: { label: string; value: string }) {
  return <div className="status-card">{label}: {value}</div>;
}
```

## Deliverables

- working Tauri desktop shell
- orchestrator service
- local tool layer
- browser automation
- voice interface
- memory
- multi-agent delegation
- safety pipeline
- polished visual UI

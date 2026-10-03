# Getting Started with JARVIS AI Desktop Agent

## Prerequisites

- Node.js 18+ (download from https://nodejs.org/)
- npm (comes with Node.js)
- A code editor (VS Code recommended)
- Git (to clone the repo)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ali33-sketch/jarvis-ai-desktop-agent.git
cd jarvis-ai-desktop-agent
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- React 18
- React DOM
- Vite (development server)
- TypeScript
- Build tools

### 3. Run the Development Server

```bash
npm run dev
```

You'll see output like:

```
  VITE v5.4.10  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### 4. Open in Browser

Click the link or open your browser and go to:

```
http://localhost:5173/
```

You should see:

- A dark themed command-center interface
- "JARVIS" branding on the left sidebar
- Navigation menu (Overview, Agents, Memory, System, Settings)
- A status panel showing "Status: Ready" and "Agent: Idle"
- A chat area with a message input
- A blue "Voice" button in the top right

## Try the App

In the input field at the bottom, type one of these:

1. **"Open VS Code"** → System will pretend to open VS Code
2. **"Show my files"** → System will list files
3. **"What's using memory?"** → System will check processes
4. **"Remember my favorite editor"** → System will save to memory

You'll see:
- Your message appears in the chat
- Status changes to "Thinking..." then "Executing"
- Agent status updates in the sidebar
- Assistant responds with what happened

## Project Structure

```
jarvis-ai-desktop-agent/
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Main UI component
│   ├── styles.css            # Global styles
│   ├── types.ts              # TypeScript types
│   ├── agent/
│   │   └── orchestrator.ts   # Intent parsing logic
│   ├── safety/
│   │   └── safety.ts         # Safety gate for actions
│   ├── memory/
│   │   └── memory.ts         # In-memory store
│   └── tools/
│       └── localTools.ts     # Tool stubs (open_app, etc)
├── index.html                # HTML entry
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Build config
└── docs/                      # Architecture docs
```

## Understanding the Flow

When you type a command:

```
User Input
    ↓
Orchestrator.runOrchestrator()
    ↓
Classify intent ("Open VS Code" → tool: 'open_app')
    ↓
Safety.executeWithSafety()
    ↓
Check if safe ("open_app" is safe)
    ↓
Run the tool (localTools.openApp)
    ↓
Return result to UI
    ↓
Display response in chat
```

## Development Tips

### Edit the Orchestrator

To add more commands, edit `src/agent/orchestrator.ts`:

```ts
if (lower.includes('chrome')) {
  return {
    tool: 'open_app',
    args: { appName: 'Chrome' }
  };
}
```

### Add a New Tool

Edit `src/tools/localTools.ts`:

```ts
export async function closeApp(appName: string) {
  return { success: true, result: `Closed ${appName}` };
}
```

Then add it to the safety layer in `src/safety/safety.ts`:

```ts
case 'close_app': {
  return { success: true, result: `Closed ${args.appName}` };
}
```

### Update Styles

Edit `src/styles.css` to change colors, layout, or fonts. The app uses:

- A dark blue color scheme (`#07111f` background)
- Cyan accents (`#66d9ff`, `#72d9ff`)
- Rounded corners for modern look
- Glassmorphism (transparent with borders)

### Hot Reload

Vite automatically reloads when you save files. Just edit and the browser will update instantly.

## Stopping the Server

Press `Ctrl+C` in the terminal to stop the development server.

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files ready to deploy.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will try the next port (5174, 5175, etc).

### Dependencies Not Installing

```bash
rm -rf node_modules package-lock.json
npm install
```

### Errors in Terminal

Make sure you're in the correct directory:

```bash
cd jarvis-ai-desktop-agent
pwd  # should show the project path
```

## Next Steps

Once the app is running:

1. Explore the UI and test the basic commands
2. Read the docs in `docs/` folder (architecture, design patterns)
3. Start integrating:
   - Real LLM API (OpenAI, Claude, etc.)
   - Browser automation (Playwright)
   - Windows tools (PowerShell integration)
4. Add more agents and specialized tools
5. Build the multi-agent coordination layer

## Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Project docs: `docs/architecture.md`, `docs/safety-architecture.md`, `docs/multi-agent-design.md`

## Questions?

Check the issues or documentation in the repository for more details about the architecture and design patterns.

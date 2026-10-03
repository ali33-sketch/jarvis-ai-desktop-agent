import { useMemo, useState } from 'react';
import { runOrchestrator } from './agent/orchestrator';
import { openApp, listFiles, runPowerShell } from './tools/localTools';
import { executeWithSafety } from './safety/safety';
import { getMemory, saveMemory } from './memory/memory';

type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};

export default function App() {
  const [input, setInput] = useState('Open VS Code');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: 'System ready. How can I help?' }
  ]);
  const [status, setStatus] = useState('Ready');
  const [agentStatus, setAgentStatus] = useState('Idle');

  const memory = useMemo(() => ({
    preferredEditor: 'VS Code',
    projectRoot: 'D:/Projects'
  }), []);

  const appendMessage = (role: Message['role'], text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role, text }
    ]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;

    appendMessage('user', value);
    setStatus('Thinking...');
    setAgentStatus('Planning');

    try {
      const intent = await runOrchestrator(value, memory);

      if (intent.tool === 'chat_reply') {
        appendMessage('assistant', intent.args.message);
        setStatus('Complete');
        setAgentStatus('Idle');
        return;
      }

      setAgentStatus('Executing');

      if (intent.tool === 'open_app') {
        const result = await executeWithSafety('open_app', { appName: intent.args.appName });
        appendMessage('assistant', result.success ? `Opened ${intent.args.appName}.` : `Could not open app: ${result.error}`);
      }

      if (intent.tool === 'list_files') {
        const result = await executeWithSafety('list_files', { path: intent.args.path });
        appendMessage('assistant', result.success ? `Files found: ${result.result.join(', ')}` : `Could not list files: ${result.error}`);
      }

      if (intent.tool === 'run_powershell') {
        const result = await executeWithSafety('run_powershell', { command: intent.args.command });
        appendMessage('assistant', result.success ? `Command output: ${result.result}` : `Command failed: ${result.error}`);
      }

      if (intent.tool === 'remember') {
        await saveMemory(intent.args.key, intent.args.value);
        appendMessage('assistant', `Stored memory: ${intent.args.key} = ${intent.args.value}`);
      }

      setStatus('Complete');
      setAgentStatus('Idle');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      appendMessage('assistant', `I hit an error: ${message}`);
      setStatus('Error');
      setAgentStatus('Error');
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">◉</span>
          <h1>JARVIS</h1>
        </div>

        <nav className="nav">
          <button className="nav-item active">Overview</button>
          <button className="nav-item">Agents</button>
          <button className="nav-item">Memory</button>
          <button className="nav-item">System</button>
          <button className="nav-item">Settings</button>
        </nav>

        <div className="status-panel">
          <div className="metric">
            <span>Status</span>
            <strong>{status}</strong>
          </div>
          <div className="metric">
            <span>Agent</span>
            <strong>{agentStatus}</strong>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">AI Command Center</div>
            <h2>Desktop Operating Layer</h2>
          </div>
          <button className="voice-button">Voice</button>
        </header>

        <section className="banner">
          <div className="signal" />
          <div>
            <strong>System Ready</strong>
            <span>Monitoring tasks, memory, and local automation</span>
          </div>
        </section>

        <section className="chat-panel">
          <div className="message-list">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.role}`}>
                {message.text}
              </div>
            ))}
          </div>

          <form className="composer" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask JARVIS to open an app, inspect files, or summarize work..."
            />
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
    </div>
  );
}

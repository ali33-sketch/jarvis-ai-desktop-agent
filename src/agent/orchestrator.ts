import type { MemoryEntry, ToolExecution } from '../types';

export async function runOrchestrator(userInput: string, memory: Record<string, string>) {
  const lower = userInput.toLowerCase();

  if (lower.includes('open') && lower.includes('vscode')) {
    return {
      tool: 'open_app',
      args: { appName: 'VS Code' }
    } satisfies ToolExecution;
  }

  if (lower.includes('list') && (lower.includes('files') || lower.includes('folder'))) {
    return {
      tool: 'list_files',
      args: { path: memory.projectRoot || 'C:/Users/Default/Documents' }
    } satisfies ToolExecution;
  }

  if (lower.includes('memory') || lower.includes('remember')) {
    const key = 'favorite_task';
    return {
      tool: 'remember',
      args: { key, value: userInput }
    } satisfies ToolExecution;
  }

  if (lower.includes('powershell') || lower.includes('process') || lower.includes('ram')) {
    return {
      tool: 'run_powershell',
      args: { command: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, Id' }
    } satisfies ToolExecution;
  }

  return {
    tool: 'chat_reply',
    args: {
      message: 'I am ready to open apps, inspect files, and monitor your system. Try: "Open VS Code" or "Show my files".'
    }
  };
}

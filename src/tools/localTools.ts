export async function openApp(appName: string) {
  return { success: true, result: `Opened ${appName}` };
}

export async function listFiles(path: string) {
  return {
    success: true,
    result: ['notes.md', 'project.json', 'summary.txt']
  };
}

export async function runPowerShell(command: string) {
  return {
    success: true,
    result: `PowerShell command executed: ${command}`
  };
}

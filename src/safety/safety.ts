import type { ToolResult } from '../types';

const safeOperations = ['open_app', 'list_files', 'get_system_info'] as const;
const dangerousOperations = ['delete_file', 'delete_folder', 'install_app', 'run_unknown_executable'];

export async function executeWithSafety(action: string, args: Record<string, any>): Promise<ToolResult> {
  if (dangerousOperations.includes(action)) {
    return { success: false, error: 'This action requires explicit user approval.' };
  }

  if (safeOperations.includes(action as typeof safeOperations[number])) {
    return executeSafeAction(action, args);
  }

  return { success: false, error: 'Action is not supported yet.' };
}

async function executeSafeAction(action: string, args: Record<string, any>): Promise<ToolResult> {
  switch (action) {
    case 'open_app': {
      return { success: true, result: `Opened ${args.appName}` };
    }
    case 'list_files': {
      return { success: true, result: ['notes.md', 'project.json', 'summary.txt'] };
    }
    case 'get_system_info': {
      return {
        success: true,
        result: 'CPU: 34%, Memory: 5.8 GB / 16 GB, Disk: 70% used'
      };
    }
    default:
      return { success: false, error: 'No safe action matched.' };
  }
}

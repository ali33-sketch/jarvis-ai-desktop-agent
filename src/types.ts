export type ToolName = 'open_app' | 'list_files' | 'run_powershell' | 'remember';

export type ToolExecution = {
  tool: ToolName;
  args: Record<string, any>;
};

export type MemoryEntry = {
  key: string;
  value: string;
};

export type ToolResult = {
  success: boolean;
  result?: any;
  error?: string;
};

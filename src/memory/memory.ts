const memoryStore = new Map<string, string>();

export function saveMemory(key: string, value: string) {
  memoryStore.set(key, value);
  return { success: true, key, value };
}

export function getMemory(key: string) {
  return memoryStore.get(key) ?? null;
}

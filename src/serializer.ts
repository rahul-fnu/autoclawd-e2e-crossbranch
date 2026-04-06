import type { Task, TaskStore } from './types.js';

export function serializeTasks(tasks: Task[]): string {
  return JSON.stringify(tasks);
}

export function deserializeTasks(json: string): Task[] {
  const parsed = JSON.parse(json) as Array<Record<string, unknown>>;
  return parsed.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt as string),
    updatedAt: new Date(item.updatedAt as string),
  })) as Task[];
}

export function exportStore(store: TaskStore): string {
  return serializeTasks(store.list());
}

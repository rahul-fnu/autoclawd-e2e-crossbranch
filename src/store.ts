import type { Task, TaskStore } from './types.js';

export class InMemoryTaskStore implements TaskStore {
  private tasks = new Map<string, Task>();

  add(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const now = new Date();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  get(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  list(): Task[] {
    return [...this.tasks.values()];
  }

  update(id: string, changes: Partial<Pick<Task, 'title' | 'status'>>): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new Error(`Task not found: ${id}`);
    }
    const updated: Task = {
      ...task,
      ...changes,
      updatedAt: new Date(),
    };
    this.tasks.set(id, updated);
    return updated;
  }

  remove(id: string): boolean {
    return this.tasks.delete(id);
  }
}

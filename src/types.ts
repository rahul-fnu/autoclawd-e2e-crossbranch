/** Core types for the task tracker */

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskStore {
  add(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task;
  get(id: string): Task | undefined;
  list(): Task[];
  update(id: string, changes: Partial<Pick<Task, 'title' | 'status'>>): Task;
  remove(id: string): boolean;
}

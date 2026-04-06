import type { Task } from './types.js';

export function filterByStatus(tasks: Task[], status: Task['status']): Task[] {
  return tasks.filter((task) => task.status === status);
}

export function searchByTitle(tasks: Task[], query: string): Task[] {
  const lower = query.toLowerCase();
  return tasks.filter((task) => task.title.toLowerCase().includes(lower));
}

export function sortByDate(
  tasks: Task[],
  field: 'createdAt' | 'updatedAt',
  order: 'asc' | 'desc',
): Task[] {
  return [...tasks].sort((a, b) => {
    const diff = a[field].getTime() - b[field].getTime();
    return order === 'asc' ? diff : -diff;
  });
}

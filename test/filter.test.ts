import { describe, it, expect } from 'vitest';
import type { Task } from '../src/types.js';
import { filterByStatus, searchByTitle, sortByDate } from '../src/filter.js';

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    title: 'Default Task',
    status: 'todo',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    ...overrides,
  };
}

const tasks: Task[] = [
  makeTask({ id: '1', title: 'Write tests', status: 'done', createdAt: new Date('2026-01-03'), updatedAt: new Date('2026-01-05') }),
  makeTask({ id: '2', title: 'Fix bug', status: 'in-progress', createdAt: new Date('2026-01-01'), updatedAt: new Date('2026-01-04') }),
  makeTask({ id: '3', title: 'Write docs', status: 'todo', createdAt: new Date('2026-01-02'), updatedAt: new Date('2026-01-02') }),
  makeTask({ id: '4', title: 'Deploy app', status: 'todo', createdAt: new Date('2026-01-04'), updatedAt: new Date('2026-01-06') }),
];

describe('filterByStatus', () => {
  it('returns tasks matching the given status', () => {
    const result = filterByStatus(tasks, 'todo');
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.status === 'todo')).toBe(true);
  });

  it('returns empty array when no tasks match', () => {
    expect(filterByStatus([], 'done')).toEqual([]);
  });
});

describe('searchByTitle', () => {
  it('returns tasks whose title contains the query (case-insensitive)', () => {
    const result = searchByTitle(tasks, 'write');
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(['1', '3']);
  });

  it('returns empty array when no titles match', () => {
    expect(searchByTitle(tasks, 'nonexistent')).toEqual([]);
  });
});

describe('sortByDate', () => {
  it('sorts by createdAt ascending', () => {
    const result = sortByDate(tasks, 'createdAt', 'asc');
    expect(result.map((t) => t.id)).toEqual(['2', '3', '1', '4']);
  });

  it('sorts by createdAt descending', () => {
    const result = sortByDate(tasks, 'createdAt', 'desc');
    expect(result.map((t) => t.id)).toEqual(['4', '1', '3', '2']);
  });

  it('sorts by updatedAt ascending', () => {
    const result = sortByDate(tasks, 'updatedAt', 'asc');
    expect(result.map((t) => t.id)).toEqual(['3', '2', '1', '4']);
  });

  it('does not mutate the original array', () => {
    const original = [...tasks];
    sortByDate(tasks, 'createdAt', 'asc');
    expect(tasks).toEqual(original);
  });
});

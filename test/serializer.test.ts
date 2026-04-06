import { describe, it, expect } from 'vitest';
import type { Task, TaskStore } from '../src/types.js';
import { serializeTasks, deserializeTasks, exportStore } from '../src/serializer.js';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'First task',
    status: 'todo',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  },
  {
    id: '2',
    title: 'Second task',
    status: 'done',
    createdAt: new Date('2026-02-01T00:00:00.000Z'),
    updatedAt: new Date('2026-02-03T00:00:00.000Z'),
  },
];

describe('serializeTasks', () => {
  it('converts tasks to a JSON string', () => {
    const json = serializeTasks(sampleTasks);
    const parsed = JSON.parse(json);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].title).toBe('First task');
  });

  it('handles an empty array', () => {
    expect(serializeTasks([])).toBe('[]');
  });
});

describe('deserializeTasks', () => {
  it('parses JSON back to Task objects with Date fields', () => {
    const json = serializeTasks(sampleTasks);
    const tasks = deserializeTasks(json);
    expect(tasks).toHaveLength(2);
    expect(tasks[0].createdAt).toBeInstanceOf(Date);
    expect(tasks[0].updatedAt).toBeInstanceOf(Date);
    expect(tasks[0].createdAt.toISOString()).toBe('2026-01-01T00:00:00.000Z');
    expect(tasks[1].updatedAt.toISOString()).toBe('2026-02-03T00:00:00.000Z');
  });

  it('preserves all task properties', () => {
    const json = serializeTasks(sampleTasks);
    const tasks = deserializeTasks(json);
    expect(tasks[0].id).toBe('1');
    expect(tasks[0].title).toBe('First task');
    expect(tasks[0].status).toBe('todo');
    expect(tasks[1].status).toBe('done');
  });

  it('handles an empty array', () => {
    const tasks = deserializeTasks('[]');
    expect(tasks).toEqual([]);
  });
});

describe('exportStore', () => {
  it('serializes all tasks from a store', () => {
    const mockStore: TaskStore = {
      add: () => sampleTasks[0],
      get: () => undefined,
      list: () => sampleTasks,
      update: () => sampleTasks[0],
      remove: () => false,
    };

    const json = exportStore(mockStore);
    const tasks = deserializeTasks(json);
    expect(tasks).toHaveLength(2);
    expect(tasks[0].createdAt).toBeInstanceOf(Date);
  });
});

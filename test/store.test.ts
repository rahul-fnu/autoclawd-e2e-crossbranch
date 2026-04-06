import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTaskStore } from '../src/store.js';

describe('InMemoryTaskStore', () => {
  let store: InMemoryTaskStore;

  beforeEach(() => {
    store = new InMemoryTaskStore();
  });

  describe('add', () => {
    it('creates a task with generated id and timestamps', () => {
      const task = store.add({ title: 'Test task', status: 'todo' });

      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test task');
      expect(task.status).toBe('todo');
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
      expect(task.createdAt).toEqual(task.updatedAt);
    });

    it('generates unique ids', () => {
      const a = store.add({ title: 'A', status: 'todo' });
      const b = store.add({ title: 'B', status: 'todo' });
      expect(a.id).not.toBe(b.id);
    });
  });

  describe('get', () => {
    it('returns a task by id', () => {
      const added = store.add({ title: 'Find me', status: 'todo' });
      expect(store.get(added.id)).toEqual(added);
    });

    it('returns undefined for unknown id', () => {
      expect(store.get('nonexistent')).toBeUndefined();
    });
  });

  describe('list', () => {
    it('returns all tasks', () => {
      store.add({ title: 'A', status: 'todo' });
      store.add({ title: 'B', status: 'in-progress' });
      expect(store.list()).toHaveLength(2);
    });

    it('returns empty array when no tasks', () => {
      expect(store.list()).toEqual([]);
    });
  });

  describe('update', () => {
    it('updates title', () => {
      const task = store.add({ title: 'Old', status: 'todo' });
      const updated = store.update(task.id, { title: 'New' });
      expect(updated.title).toBe('New');
      expect(updated.status).toBe('todo');
    });

    it('updates status', () => {
      const task = store.add({ title: 'Task', status: 'todo' });
      const updated = store.update(task.id, { status: 'done' });
      expect(updated.status).toBe('done');
    });

    it('updates the updatedAt timestamp', () => {
      const task = store.add({ title: 'Task', status: 'todo' });
      const original = task.updatedAt;
      const updated = store.update(task.id, { title: 'Changed' });
      expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(original.getTime());
    });

    it('throws for unknown id', () => {
      expect(() => store.update('nonexistent', { title: 'X' })).toThrow('Task not found');
    });
  });

  describe('remove', () => {
    it('removes an existing task and returns true', () => {
      const task = store.add({ title: 'Delete me', status: 'todo' });
      expect(store.remove(task.id)).toBe(true);
      expect(store.get(task.id)).toBeUndefined();
    });

    it('returns false for unknown id', () => {
      expect(store.remove('nonexistent')).toBe(false);
    });
  });
});

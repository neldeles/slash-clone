import { TTask } from "../types/tasks";

/**
 * Used to sort an array of tasks by their `priority`.
 */
export function sortByAscPriority(a: TTask, b: TTask) {
  return a.priority! - b.priority!;
}

export function sortByDescPriority(a: TTask, b: TTask) {
  return b.priority! - a.priority!;
}

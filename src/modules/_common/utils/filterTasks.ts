import { TTask, TStatus } from "../types/tasks";

export function filterTasks(tasks: TTask[], status: TStatus) {
  return tasks.filter((task: TTask) => task.status === status);
}

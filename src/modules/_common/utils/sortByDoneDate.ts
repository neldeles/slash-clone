import { TTask } from "../types/tasks";

export function sortByDoneDate(a: TTask, b: TTask) {
  const dateA = a.date_done!;
  const dateB = b.date_done!;

  return dateA > dateB ? 1 : -1;
}

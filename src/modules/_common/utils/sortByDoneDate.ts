import { TTask } from "../types/tasks";

export function sortByDoneDate(a: TTask, b: TTask) {
  const dateA = new Date(a.date_done!).getTime();
  const dateB = new Date(b.date_done!).getTime();
  return dateA > dateB ? 1 : -1;
}

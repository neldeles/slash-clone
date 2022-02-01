export type TTaskOld = {
  id: string;
  task: string;
};

export type TTasks = {
  thisWeek: TTaskOld[];
  today: TTaskOld[];
  done: TTaskOld[];
};

export type TStatus = TTask["status"];

type TTaskBase = {
  id: string;
  task: string;
  priority: number | null;
  date_done: string | null;
  user_id: string;
};

export type TTaskThisWeek = TTaskBase & {
  status: "thisWeek";
};

export type TTaskToday = TTaskBase & {
  status: "today";
};

export type TTaskDone = TTaskBase & {
  status: "done";
};

export type TTask = TTaskThisWeek | TTaskToday | TTaskDone;

export type TNewTask = Omit<TTask, "id" | "user_id" | "priority" | "date_done">;

// Type Predicates
export function isTaskThisWeek(task: TTask): task is TTaskThisWeek {
  return (task as TTaskThisWeek).status === "thisWeek";
}
export function isTaskToday(task: TTask): task is TTaskToday {
  return (task as TTaskToday).status === "today";
}
export function isTaskDone(task: TTask): task is TTaskDone {
  return (task as TTaskDone).status === "done";
}

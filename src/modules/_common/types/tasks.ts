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
  date_done: Date | null;
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

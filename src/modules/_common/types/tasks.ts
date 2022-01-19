export type TTaskOld = {
  id: string;
  task: string;
};

export type TTasks = {
  thisWeek: TTaskOld[];
  today: TTaskOld[];
  done: TTaskOld[];
};

export type TStatus = "thisWeek" | "today" | "done";

export type TTask = {
  id: string;
  task: string;
  status: TStatus;
  user_id: string;
};

export type TNewTask = Omit<TTask, "id" | "user_id">;
export type TUpdateTask = Partial<Omit<TTask, "id" | "user_id">>;

export type TTaskOld = {
  id: string;
  task: string;
};

export type TTasks = {
  thisWeek: TTaskOld[];
  today: TTaskOld[];
  done: TTaskOld[];
};

export type TTask = {
  id: string;
  task: string;
  status: string;
  user_id: string;
};

export type TTask = {
  id: string;
  task: string;
};

export type TTasks = {
  thisWeek: TTask[];
  today: TTask[];
  done: TTask[];
};

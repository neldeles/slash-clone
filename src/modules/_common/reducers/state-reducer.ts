import { TTasks } from "../types/tasks";

type TEntryAnimation = "fromRight" | "fromLeft" | "inPlace";
type TExitAnimation = "toRight" | "toLeft" | "inPlace";

type TState = {
  tasks: TTasks;
  entryAnimation: TEntryAnimation;
  exitAnimation: TExitAnimation;
};

type TThisWeek = "thisWeek";
type TToday = "today";
type TDone = "done";

type TMoveToToday = {
  type: "moveToToday";
  payload: {
    id: string;
    taskCategory: TThisWeek | TDone;
  };
};

type TMarkDone = {
  type: "markDone";
  payload: {
    id: string;
    taskCategory: TThisWeek | TToday;
  };
};

type TMoveToThisWeek = {
  type: "moveToThisWeek";
  payload: {
    id: string;
    taskCategory: TToday | TDone;
  };
};

type TDelete = {
  type: "deleteTask";
  payload: {
    id: string;
    taskCategory: TThisWeek | TToday | TDone;
  };
};

type TAction = TMoveToToday | TMarkDone | TMoveToThisWeek | TDelete;

export const reducer = (state: TState, action: TAction): TState | undefined => {
  const { tasks } = state;
  switch (action.type) {
    case "moveToToday": {
      const { taskCategory, id } = action.payload;

      if (taskCategory === "thisWeek") {
        const updatedTasks = {
          thisWeek: tasks.thisWeek.filter((task: any) => task.id !== id),
          today: [
            ...tasks.today,
            ...tasks.thisWeek.filter((task: any) => task.id === id),
          ],
          done: [...tasks.done],
        };

        return {
          tasks: updatedTasks,
          exitAnimation: "toRight",
          entryAnimation: "fromRight",
        };
      }

      if (taskCategory === "done") {
        return state;
      }
      break;
    }

    case "markDone": {
      const { taskCategory, id } = action.payload;
      if (taskCategory === "thisWeek") {
        const updatedTasks = {
          thisWeek: tasks.thisWeek.filter((task: any) => task.id !== id),
          today: [...tasks.today],
          done: [
            ...tasks.done,
            ...tasks.thisWeek.filter((task: any) => task.id === id),
          ],
        };
        return {
          tasks: updatedTasks,
          exitAnimation: "inPlace",
          entryAnimation: "inPlace",
        };
      }
      return state;
    }

    case "moveToThisWeek": {
      return state;
    }

    case "deleteTask": {
      const { taskCategory, id } = action.payload;

      if (taskCategory === "thisWeek") {
        const updatedTasks = {
          thisWeek: tasks.thisWeek.filter((task: any) => task.id !== id),
          today: [...tasks.today],
          done: [...tasks.done],
        };

        return {
          tasks: updatedTasks,
          entryAnimation: "inPlace",
          exitAnimation: "inPlace",
        };
      }

      return state;
    }

    default:
      return state;
  }
};

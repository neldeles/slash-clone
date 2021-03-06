import { useCallback, useState } from "react";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../mutations/task-mutations";
import { TTask } from "../types/tasks";

export function useMoveTaskToToday() {
  const updateTaskMutation = useUpdateTaskMutation();

  const moveTaskToToday = (task: TTask) => {
    const payload: TTask = {
      ...task,
      status: "TODAY",
    };
    updateTaskMutation.mutate(payload);
  };

  return moveTaskToToday;
}

export function useDeleteTask() {
  const deleteTaskMutation = useDeleteTaskMutation();

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  return deleteTask;
}

export function useMarkTaskDone() {
  const [startAnimation, setStartAnimation] = useState(false);
  const updateTaskMutation = useUpdateTaskMutation();
  const { mutate } = updateTaskMutation;

  const markTaskDone = useCallback(
    (task: TTask) => {
      const payload: TTask = {
        ...task,
        status: "DONE",
      };

      mutate(payload, {
        onSuccess: () => {
          setStartAnimation(true);
        },
      });
    },
    [mutate]
  );

  return {
    markTaskDone,
    startAnimation,
  };
}

export function useMoveTaskToThisWeek() {
  const updateTaskMutation = useUpdateTaskMutation();

  const moveTaskToToday = (task: TTask) => {
    const payload: TTask = {
      ...task,
      status: "THIS_WEEK",
    };
    updateTaskMutation.mutate(payload);
  };

  return moveTaskToToday;
}

import { useState } from "react";
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
      status: "today",
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

  const markTaskDone = (task: TTask) => {
    const payload: TTask = {
      ...task,
      status: "done",
    };

    updateTaskMutation.mutate(payload, {
      onSuccess: () => {
        setStartAnimation(true);
      },
    });
  };

  return {
    markTaskDone,
    startAnimation,
  };
}

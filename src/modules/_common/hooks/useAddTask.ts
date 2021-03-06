import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { tasksService } from "../services/tasks-service";
import { TNewTask } from "../types/tasks";

/**
 * @param status {TNewTask["status"]} Pass the status of the task.
 * The task will be added to that status's column.
 */
export function useAddTask(status: TNewTask["status"]) {
  const [newTask, setNewTask] = useState("");

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation(
    (task: TNewTask) => tasksService.create(task),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const addTaskTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const task: TNewTask = {
        task: newTask,
        status: status,
      };

      addTaskMutation.mutate(task);

      setNewTask("");
    }
  };

  const addTaskOnClick = () => {
    const task: TNewTask = {
      task: newTask,
      status: status,
    };

    addTaskMutation.mutate(task);

    setNewTask("");
  };

  return {
    newTask,
    setNewTask,
    addTaskTextarea,
    addTaskOnClick,
  };
}

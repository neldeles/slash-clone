import { useMutation, useQueryClient } from "react-query";
import { taskService } from "../services/task-service";
import { TTask } from "../types/tasks";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation((payload: TTask) => taskService.updateTask(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => taskService.deleteTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

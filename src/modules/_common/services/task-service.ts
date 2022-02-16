import { api } from "../api";
import { TTask } from "../types/tasks";
import { authAxios } from "./auth-service";

const deleteTask = async (id: string) => {
  const response = await authAxios.delete(api.tasks.delete(id));
  return response;
};

const updateTask = async (task: TTask) => {
  const response = await authAxios.put(api.tasks.update(task.id), task);
  return response.data;
};

export const taskService = {
  deleteTask,
  updateTask,
};

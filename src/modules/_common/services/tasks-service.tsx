import { api } from "../api";
import { TNewTask, TTask } from "../types/tasks";
import { authAxios } from "./auth-service";

const getAll = async (): Promise<TTask[]> => {
  const response = await authAxios.get(api.tasks.list);
  return response.data;
};

const create = async (task: TNewTask) => {
  const response = await authAxios.post(api.tasks.create, task);
  return response.data;
};

export const tasksService = {
  getAll,
  create,
};

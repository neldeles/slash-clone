import axios from "axios";
import { TUpdateTaskProps } from "../types/services";
import { TNewTask, TTask } from "../types/tasks";

const create = async (task: TNewTask) => {
  const response = await axios.post("/task", task);
  return response.data;
};

const deleteTask = async (id: string) => {
  const response = await axios.delete(`/task/${id}`);
  return response;
};

const updateTask = async (task: TTask) => {
  const response = await axios.put(`/task/${task.id}`, task);
  return response.data;
};

export const taskService = {
  create,
  deleteTask,
  updateTask,
};

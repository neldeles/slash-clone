import axios from "axios";
import { TNewTask } from "../types/tasks";

const create = async (task: TNewTask) => {
  const response = await axios.post("/task", task);
  return response.data;
};

const deleteTask = async (id: string) => {
  const response = await axios.delete(`/task/${id}`);
  return response;
};

export const taskService = {
  create,
  deleteTask,
};

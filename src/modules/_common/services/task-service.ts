import axios from "axios";
import { TNewTask } from "../types/tasks";

const create = async (task: TNewTask) => {
  const response = await axios.post("/task", task);
  return response.data;
};

export const taskService = {
  create,
};

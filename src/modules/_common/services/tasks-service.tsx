import axios from "axios";
import { TTask } from "../types/tasks";

const getAll = async (): Promise<TTask[]> => {
  const response = await axios.get("/tasks");
  return response.data;
};

export const tasksService = {
  getAll,
};

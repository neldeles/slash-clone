import axios from "axios";

const getAll = async () => {
  const response = await axios.get("/tasks");
  return response.data;
};

export const tasksService = {
  getAll,
};

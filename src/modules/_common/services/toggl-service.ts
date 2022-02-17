import { api } from "../api";
import { authAxios } from "./auth-service";

type TData = {
  userId: string;
  togglApiKey: string;
};

const setApiKey = async (data: TData) => {
  const response = await authAxios.put(api.toggl.setApiKey(data.userId), {
    toggl_api_key: data.togglApiKey,
  });
  return response;
};

export const togglService = {
  setApiKey,
};

import axios from "axios";
import { api } from "../api";
import { authAxios } from "./auth-service";
import { Buffer } from "buffer";

type TData = {
  userId: string;
  togglApiKey: string;
};

function generateHeader(apiKey: string) {
  let string = `${apiKey}:api_token`;
  const encodedString = Buffer.from(string).toString("base64");

  const headers = {
    Authorization: `Basic ${encodedString}`,
    "Content-Type": "application/json",
  };

  return headers;
}

const setApiKey = async (data: TData) => {
  const response = await authAxios.put(api.toggl.setApiKey(data.userId), {
    toggl_api_key: data.togglApiKey,
  });
  return response;
};

const getWorkspaces = async (apiKey: string) => {
  const headers = generateHeader(apiKey);
  const response = await axios.get(
    "https://api.track.toggl.com/api/v8/workspaces",
    {
      headers: headers,
    }
  );
  return response.data;
};

const getProjects = async (apiKey: string, workspaceId: string) => {
  const headers = generateHeader(apiKey);
  const response = await axios.get(
    `https://api.track.toggl.com/api/v8/workspaces/${workspaceId}/projects`,
    {
      headers: headers,
    }
  );
  console.log("toggl", response);
  return response.data;
};

export const togglService = {
  setApiKey,
  getWorkspaces,
  getProjects,
};

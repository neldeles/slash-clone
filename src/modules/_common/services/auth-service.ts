import axios from "axios";
import { api } from "../api";

type TLoginCredentials = {
  username: string;
  password: string;
};

type TSignupCredentials = {
  username: string;
  password1: string;
  password2: string;
  email: string;
};

type TUserDetails = {
  id: string;
  username: string;
  email: string;
  togglApiKey: string;
  workspaceId: string;
  projectId: string;
  tags: string[];
};

const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const newConfig = config;
  const token = localStorage.getItem("token");
  newConfig.headers = {
    Authorization: `Token ${token}`,
  };
  return newConfig;
});

async function login(credentials: TLoginCredentials) {
  const response = await axios.post(api.auth.login, credentials);

  localStorage.setItem("token", response.data.key);

  return response;
}

async function signup(credentials: TSignupCredentials) {
  const response = await axios.post(api.auth.register, credentials);

  localStorage.setItem("token", response.data.key);

  return response;
}

const getUserDetails = async (): Promise<TUserDetails> => {
  const response = await authAxios.get(api.auth.user);

  const data: TUserDetails = {
    id: response.data.id,
    username: response.data.username,
    email: response.data.email,
    togglApiKey: response.data.toggl_api_key,
    workspaceId: response.data.workspace_id.toString(),
    projectId: response.data.project_id.toString(),
    tags: response.data.tags,
  };

  return data;
};

const authService = {
  login,
  signup,
  getUserDetails,
};

export { authAxios, authService };

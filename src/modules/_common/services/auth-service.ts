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

const baseurl = process.env.REACT_APP_API_ENDPOINT;

const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const newConfig = config;
  const token = localStorage.getItem("token");
  newConfig.headers = {
    Authorization: `Token ${token}`,
  };
  return newConfig;
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
}

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

function logout() {
  localStorage.removeItem("token");
}

const authService = {
  isAuthenticated: isAuthenticated(),
  login,
  logout,
  signup,
};

export { authAxios, authService };

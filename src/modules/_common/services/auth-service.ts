import axios from "axios";

type TLoginCredentials = {
  username: string;
  password: string;
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
  const response = await axios.post(
    `${baseurl}/dj-rest-auth/login/`,
    credentials
  );

  return response;
}

function logout() {
  localStorage.removeItem("token");
}

const authService = {
  isAuthenticated: isAuthenticated(),
  login,
  logout,
};

export { authAxios, authService };

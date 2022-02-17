const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const api = {
  tasks: {
    list: `${baseURL}/tasks/`,
    create: `${baseURL}/tasks/create/`,
    update: (taskId: string) => `${baseURL}/tasks/update/${taskId}/`,
    delete: (taskId: string) => `${baseURL}/tasks/delete/${taskId}/`,
  },
  auth: {
    register: `${baseURL}/dj-rest-auth/registration/`,
    login: `${baseURL}/dj-rest-auth/login/`,
    user: `${baseURL}/dj-rest-auth/user/`,
  },
  toggl: {
    setApiKey: (userId: string) => `${baseURL}/accounts/update/${userId}/`,
  },
};

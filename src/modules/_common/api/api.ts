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
    updateUserSettings: (userId: string) =>
      `${baseURL}/accounts/update/${userId}/`,
    start: "https://api.track.toggl.com/api/v8/time_entries/start",
    stop: (time_entry_id: string) =>
      `https://api.track.toggl.com/api/v8/time_entries/${time_entry_id}/stop`,
    getWorkspaceTags: (workspace_id: string) =>
      `https://api.track.toggl.com/api/v8/workspaces/${workspace_id}/tags`,
  },
};

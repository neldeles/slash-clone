import { useFetchUser } from "../queries";
import { togglService } from "../services/toggl-service";
import { TTaskToday } from "../types/tasks";

export const useTimer = (tasksToday: TTaskToday[]) => {
  const userQuery = useFetchUser();
  const togglApiKey = userQuery.data?.togglApiKey;
  const userProjectId = userQuery.data?.projectId;
  const userTags = userQuery.data?.tags ?? [];

  const startTimer = async (activeTask: number) => {
    if (togglApiKey && userProjectId) {
      const data = {
        description: tasksToday[activeTask].task,
        tags: userTags,
        pid: parseInt(userProjectId),
        created_with: "slash",
      };
      const res = await togglService.startTimer(togglApiKey, data);
      return res;
    }
    return;
  };

  const stopTimer = async (timerId: string) => {
    if (togglApiKey) {
      const res = await togglService.stopTimer(togglApiKey, timerId);
      return res;
    }
  };

  return {
    startTimer,
    stopTimer,
  };
};

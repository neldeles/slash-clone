import { Button } from "modules/_common/components/Button";
import { useFetchUser } from "modules/_common/queries";
import { togglService } from "modules/_common/services/toggl-service";
import { TTaskToday } from "modules/_common/types/tasks";
import { Link } from "react-router-dom";

export function TodayButton({
  newTaskToday,
  tasksToday,
  handleAddTask,
}: {
  newTaskToday: string;
  tasksToday: TTaskToday[];
  handleAddTask: () => void;
}) {
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
      togglService.startTimer(togglApiKey, data);
    }
  };

  if (newTaskToday) {
    return <Button id="save-task" label="Save Task" onClick={handleAddTask} />;
  }

  if (tasksToday.length === 0) {
    return null;
  }

  return (
    <Link to="/timer/work">
      <Button
        id="start-slashing"
        label="Start Slashing"
        onClick={() => startTimer(0)}
      />
    </Link>
  );
}

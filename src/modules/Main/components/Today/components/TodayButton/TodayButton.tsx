import { useTogglSettings } from "AuthenticatedApp";
import { Button } from "modules/_common/components/Button";
import { useTimer } from "modules/_common/hooks";
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
  const { startTimer } = useTimer(tasksToday);
  const { setTimerId } = useTogglSettings();

  const handleTimer = async () => {
    const res = await startTimer(0);
    setTimerId(res.data.id.toString());
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
        onClick={handleTimer}
      />
    </Link>
  );
}

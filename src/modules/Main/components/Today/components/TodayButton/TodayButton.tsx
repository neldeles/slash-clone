import { Button } from "modules/_common/components/Button";
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
  if (newTaskToday) {
    return <Button id="save-task" label="Save Task" onClick={handleAddTask} />;
  }

  if (tasksToday.length === 0) {
    return null;
  }

  return (
    <Link to="/timer/work">
      <Button id="start-slashing" label="Start Slashing" />
    </Link>
  );
}

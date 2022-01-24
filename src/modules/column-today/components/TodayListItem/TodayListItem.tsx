import { motion } from "framer-motion";
import { IconButton } from "modules/_common/components/IconButton";
import {
  Check,
  LeftArrow,
  RightArrow,
  Thrash,
} from "modules/_common/components/Icons";
import { ListItem } from "modules/_common/components/ListItem";
import { TaskText } from "modules/_common/components/TaskText";
import {
  useDeleteTask,
  useMarkTaskDone,
  useMoveTaskToThisWeek,
} from "modules/_common/hooks";
import { TTask } from "modules/_common/types/tasks";
import { classNames } from "utils/classNames";

type TListItemProps = {
  task: TTask;
  taskIndex: number;
};

export function TodayListItem({ task, taskIndex }: TListItemProps) {
  const moveTaskToThisWeek = useMoveTaskToThisWeek();
  const { markTaskDone, startAnimation: isDone } = useMarkTaskDone();
  const deleteTask = useDeleteTask();

  return (
    <ListItem>
      <motion.div
        variants={
          isDone
            ? {
                exit: { opacity: 0 },
              }
            : {}
        }
        className={classNames(
          "absolute top-1/2 right-0 justify-end items-center gap-2 px-3 h-full -translate-y-1/2",
          "hidden group-hover:flex group-hover:bg-gray-100"
        )}
      >
        <IconButton
          disabled={isDone}
          aria-label="mark-done-today"
          onClick={() => markTaskDone(task)}
        >
          <Check />
        </IconButton>
        <IconButton
          aria-label="move task in Today to This Week"
          onClick={() => moveTaskToThisWeek(task)}
        >
          <LeftArrow />
        </IconButton>
        <IconButton
          aria-label="move task in Today to Done"
          onClick={() => markTaskDone(task)}
        >
          <RightArrow />
        </IconButton>
        <IconButton
          aria-label="delete task in Today"
          onClick={() => deleteTask(task.id)}
        >
          <Thrash />
        </IconButton>
      </motion.div>
      <p className="absolute top-1/2 -left-5 text-sm text-gray-400 -translate-y-1/2">
        {taskIndex + 1}
      </p>
      <TaskText isDone={isDone} text={task.task} />
    </ListItem>
  );
}

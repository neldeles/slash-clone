import { motion } from "framer-motion";
import { ListItemButton } from "modules/_common/components/ListItemButton";
import { Check, RightArrow, Thrash } from "modules/_common/components/Icons";
import { classNames } from "utils/classNames";
import { TTask } from "modules/_common/types/tasks";
import {
  useDeleteTask,
  useMarkTaskDone,
  useMoveTaskToToday,
} from "modules/_common/hooks";
import { ListItem } from "modules/_common/components/ListItem";
import { TaskText } from "modules/_common/components/TaskText";

type TListItemProps = {
  task: TTask;
};

export function ThisWeekListItem({ task }: TListItemProps) {
  const moveTaskToToday = useMoveTaskToToday();
  const deleteTask = useDeleteTask();
  const { markTaskDone, startAnimation: isDone } = useMarkTaskDone();

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
        <ListItemButton
          disabled={isDone}
          aria-label="mark-done"
          onClick={() => markTaskDone(task)}
        >
          <Check />
        </ListItemButton>
        <ListItemButton
          aria-label="move-right"
          onClick={() => moveTaskToToday(task)}
        >
          <RightArrow />
        </ListItemButton>
        <ListItemButton aria-label="delete" onClick={() => deleteTask(task.id)}>
          <Thrash />
        </ListItemButton>
      </motion.div>
      <TaskText isDone={isDone} text={task.task} />
    </ListItem>
  );
}

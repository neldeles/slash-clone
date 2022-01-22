import { motion, Variants } from "framer-motion";
import { IconButton } from "modules/_common/components/IconButton";
import { Check, RightArrow, Thrash } from "modules/_common/components/Icons";
import { classNames } from "utils/classNames";
import { TTask } from "modules/_common/types/tasks";
import {
  useDeleteTask,
  useMarkTaskDone,
  useMoveTaskToToday,
} from "modules/_common/hooks";

type TListItemProps = {
  task: TTask;
};

export function ThisWeekListItem({ task }: TListItemProps) {
  const markCompleteVariants: Variants = {
    exit: {
      color: "rgba(0,0,0,0)",
      textDecorationColor: "#01a09e",
      textDecorationThickness: "4px",
      textDecorationLine: "line-through",
      clipPath: "inset(0 0 0 0)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: { color: "rgba(0,0,0,1)" },
  };

  const listParentVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        when: "afterChildren",
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    toRight: {
      x: [0, 500],
      transition: {
        duration: 0.4,
        ease: "backInOut",
      },
    },
  };

  const moveTaskToToday = useMoveTaskToToday();
  const deleteTask = useDeleteTask();
  const { markTaskDone, startAnimation: isDone } = useMarkTaskDone();

  return (
    <motion.li
      className="group flex relative flex-auto items-center p-3 w-full text-base font-medium tracking-normal list-none text-black bg-transparent hover:bg-gray-100 rounded-lg border border-transparent"
      initial="closed"
      animate="open"
      exit="exit"
      variants={listParentVariants}
      layout
    >
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
          aria-label="mark-done"
          onClick={() => markTaskDone(task)}
        >
          <Check />
        </IconButton>
        <IconButton
          aria-label="move-right"
          onClick={() => moveTaskToToday(task)}
        >
          <RightArrow />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deleteTask(task.id)}>
          <Thrash />
        </IconButton>
      </motion.div>
      <motion.p variants={isDone ? markCompleteVariants : {}}>
        {task.task}
      </motion.p>
    </motion.li>
  );
}

import { motion } from "framer-motion";
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
  const markCompleteVariants = {
    clicked: { pathLength: 1 },
    unclicked: { pathLength: 0 },
  };

  const listParentVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
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

  // const moveToToday = (id: string) => {
  //   const updatedTasks = {
  //     thisWeek: tasks.thisWeek.filter((task: any) => task.id !== id),
  //     today: [
  //       ...tasks.today,
  //       ...tasks.thisWeek.filter((task: any) => task.id === id),
  //     ],
  //     done: [...tasks.done],
  //   };

  //   setExitStyle("exitRight");
  //   setTasks(updatedTasks);
  // };

  const moveTaskToToday = useMoveTaskToToday();
  const deleteTask = useDeleteTask();
  const { markTaskDone, startAnimation } = useMarkTaskDone();

  return (
    <motion.div
      className="group flex items-center"
      exit="exit"
      variants={listParentVariants}
      layoutId={task.id}
    >
      <li className="flex relative flex-auto p-3 w-full text-base font-medium tracking-normal list-none text-black bg-transparent hover:bg-gray-100 rounded-lg border border-transparent">
        <p>{task.task}</p>
        <div
          className={classNames(
            "absolute top-1/2 left-0 -translate-y-1/2",
            "flex px-3 w-full h-full items-center"
          )}
        >
          <svg
            version="1.1"
            id="line_2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="1200px"
            height="5px"
          >
            <motion.path
              fill="#01a09e"
              strokeWidth="6"
              stroke="#01a09e"
              d="M0 0 l1120 0"
              initial={false}
              animate={startAnimation ? "clicked" : "unclicked"}
              variants={markCompleteVariants}
              transition={{
                duration: 0.4,
              }}
            />
          </svg>
        </div>
        <div
          className={classNames(
            "absolute top-1/2 right-0 justify-end items-center gap-2 px-3 h-full -translate-y-1/2",
            "hidden group-hover:flex group-hover:bg-gray-100"
          )}
        >
          <IconButton
            disabled={startAnimation}
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
        </div>
      </li>
    </motion.div>
  );
}

import { motion, useMotionValue, useTransform } from "framer-motion";
import { IconButton } from "modules/_common/components/IconButton";
import { Check, RightArrow, Thrash } from "modules/_common/components/Icons";
import { useState } from "react";
import { classNames } from "utils/classNames";
import { useMutation, useQueryClient } from "react-query";
import { taskService } from "modules/_common/services/task-service";
import { TTask } from "modules/_common/types/tasks";

type TListItemProps = {
  task: TTask;
};

export function ThisWeekListItem({ task }: TListItemProps) {
  const [exitStyle, setExitStyle] = useState("default");

  const duration = 0.4;

  const markCompleteVariants = {
    clicked: { pathLength: 1 },
    unclicked: { pathLength: 0 },
  };

  const listParentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.4,
        delay: duration - 0.2,
        // ease: [0.04, 0.62, 0.23, 0.98],
        ease: "anticipate",
      },
    },
    exitRight: {
      x: [0, 500],
      transition: {
        duration: 0.4,
        ease: "backInOut",
      },
    },
  };

  const [doneIsClicked, setDoneIsClicked] = useState(false);

  // const markDone = (id: string) => {
  //   const updatedTasks = {
  //     thisWeek: tasks.thisWeek.filter((task: any) => task.id !== id),
  //     today: [...tasks.today],
  //     done: [
  //       ...tasks.done,
  //       ...tasks.thisWeek.filter((task: any) => task.id === id),
  //     ],
  //   };

  //   setDoneIsClicked(true);
  //   setTasks(updatedTasks);
  // };

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
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation(
    (payload: TTask) => taskService.updateTask(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const deleteTaskMutation = useMutation(
    (id: string) => taskService.deleteTask(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const handleUpdateTask = (task: TTask, newStatus: TTask["status"]) => {
    const payload: TTask = {
      ...task,
      status: newStatus,
    };

    updateTaskMutation.mutate(payload);
  };

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <motion.div
      className="group flex items-center"
      initial="hidden"
      animate="visible"
      exit={exitStyle === "exitRight" ? "exitRight" : "exit"}
      variants={listParentVariants}
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
              animate={doneIsClicked ? "clicked" : "unclicked"}
              variants={markCompleteVariants}
              transition={{
                duration: duration,
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
            disabled={doneIsClicked}
            onClick={() => handleUpdateTask(task, "done")}
          >
            <Check />
          </IconButton>
          <IconButton
            aria-label="move-right"
            onClick={() => handleUpdateTask(task, "today")}
          >
            <RightArrow />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
            <Thrash />
          </IconButton>
        </div>
      </li>
    </motion.div>
  );
}

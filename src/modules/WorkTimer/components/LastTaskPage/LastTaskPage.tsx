import { motion } from "framer-motion";
import { useMarkTaskDone } from "modules/_common/hooks";
import { tasksService } from "modules/_common/services/tasks-service";
import {
  isTaskDone,
  isTaskThisWeek,
  isTaskToday,
  TTask,
  TTaskDone,
  TTaskThisWeek,
  TTaskToday,
} from "modules/_common/types/tasks";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import goldblum from "./images/goldblum-dance.gif";
import { isToday, isThisWeek, parseISO } from "date-fns";

type TTasks = {
  currentTask: TTask;
};

export function LastTaskPage() {
  const location = useLocation<TTasks>();
  const { markTaskDone } = useMarkTaskDone();

  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = tasksQuery.data ?? [];

  const tasksDone: TTaskDone[] = tasksData.filter(isTaskDone);
  const tasksDoneToday = tasksDone.filter((task) => {
    return isToday(parseISO(task.date_done!));
  });
  const tasksDoneThisWeek = tasksDone.filter((task) =>
    isThisWeek(parseISO(task.date_done!))
  );

  const tasksThisWeek: TTaskThisWeek[] = tasksData.filter(isTaskThisWeek);
  const tasksToday: TTaskToday[] = tasksData.filter(isTaskToday);

  const totalTaskCount =
    tasksThisWeek.length + tasksToday.length + tasksDoneThisWeek.length;
  const doneTodayTaskCount = tasksDoneToday.length;
  const percentDone = Math.floor((doneTodayTaskCount / totalTaskCount) * 100);

  const forwardedTasks = useRef({
    currentTask: location.state.currentTask,
  });

  useEffect(() => {
    const { currentTask } = forwardedTasks.current;
    markTaskDone(currentTask);
  }, [markTaskDone]);

  const parentVariants = {
    hidden: {
      scaleY: 0,
    },
    visible: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
  };

  const taskVariants = {
    hidden: { textDecorationLine: "none" },
    visible: {
      textDecorationColor: "#01a09e",
      textDecorationThickness: "4px",
      textDecorationLine: "line-through",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const progressBarVariants = {
    hidden: { width: "0%" },
    visible: {
      width: `${percentDone}%`,
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center py-8 h-screen"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      exit={{ scaleY: 0 }}
    >
      <header>
        <h1 className="text-2xl font-light text-gray-350">
          Woooo! That's it for today!
        </h1>
      </header>
      <main className="flex flex-col flex-1 items-center mt-8 space-y-8 max-w-2xl">
        <motion.p
          variants={taskVariants}
          className="text-3xl font-medium text-center"
        >
          {forwardedTasks.current.currentTask.task}
        </motion.p>
        <div className="w-full">
          <h2 className="text-base text-center text-gray-400">
            Progress this week:
          </h2>
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <motion.div
              className="h-full bg-green rounded-full"
              variants={progressBarVariants}
            ></motion.div>
          </div>
          <div className="flex justify-between px-2 mt-2">
            <p className="text-gray-400">{`${doneTodayTaskCount} of ${totalTaskCount} done`}</p>
            <p className="text-gray-400">{`${percentDone}%`}</p>
          </div>
        </div>
        <div className="w-40">
          <img
            src={goldblum}
            alt="goldblum dance"
            className="object-cover h-60"
          />
        </div>
        <div>
          <Link to="/">
            <button className="items-center py-4 px-12 w-full text-2xl font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md shadow-sm">
              Go Celebrate!
            </button>
          </Link>
        </div>
      </main>
    </motion.div>
  );
}

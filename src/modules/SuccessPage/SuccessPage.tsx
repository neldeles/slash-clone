import { motion, Variants } from "framer-motion";
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
import { sortByDoneDate } from "modules/_common/utils/sortByDoneDate";
import { sortByAscPriority } from "modules/_common/utils/sortByPriority";
import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "utils/classNames";
import coolCat from "./images/swag-cool.gif";

const successTitles = [
  {
    title: "Well done.",
  },
];

type TTasks = {
  currentTask: TTask;
  nextTask: TTask;
};

export function SuccessPage() {
  const location = useLocation<TTasks>();
  const { markTaskDone } = useMarkTaskDone();

  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = tasksQuery.data ?? [];

  const tasksDone: TTaskDone[] = tasksData.filter(isTaskDone);

  const totalTaskCount = tasksData.length;
  const doneTaskCount = tasksDone.length;
  const percentDone = Math.floor((doneTaskCount / totalTaskCount) * 100);

  const forwardedTasks = useRef({
    currentTask: location.state.currentTask,
    nextTask: location.state.nextTask,
  });

  useEffect(() => {
    const { currentTask } = forwardedTasks.current;
    markTaskDone(currentTask);
  }, [markTaskDone]);

  if (tasksQuery.isLoading) {
    return <h1>loading</h1>;
  }

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

  const taskVariants: Variants = {
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
      transition={{ duration: 0.5 }}
    >
      <header>
        <h1 className="text-2xl font-light text-gray-350">
          {successTitles[0].title}
        </h1>
      </header>
      <main className="flex flex-col flex-1 items-center mt-8 space-y-8 max-w-2xl">
        <motion.p variants={taskVariants} className="text-3xl font-medium">
          {forwardedTasks.current.currentTask.task}
        </motion.p>
        <div className="w-full">
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <motion.div
              className="h-full bg-green rounded-full"
              variants={progressBarVariants}
            ></motion.div>
          </div>
          <div className="flex justify-between px-2 mt-2">
            <p>{`${doneTaskCount} of ${totalTaskCount} done`}</p>
            <p>{`${percentDone}%`}</p>
          </div>
        </div>
        <div className="w-40">
          <img src={coolCat} alt="cool cat" className="object-cover h-60" />
        </div>
        <p className="text-2xl font-light text-gray-350">
          Next up: {forwardedTasks.current.nextTask.task}
        </p>
        <div>
          <Link to="/timer/work">
            <button className="items-center py-4 px-12 w-full text-2xl font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md shadow-sm">
              Keep Slashing
            </button>
          </Link>
        </div>
      </main>
      <div className="flex space-x-3">
        <Link to="/timer/break">
          <button className="text-gray-350">Take Break</button>
        </Link>
        <span className="text-gray-350">/</span>
        <Link to="/">
          <button className="text-gray-350">Edit Tasks</button>
        </Link>
      </div>
    </motion.div>
  );
}

import { motion, Variants } from "framer-motion";
import { useMarkTaskDone, useTimer } from "modules/_common/hooks";
import { tasksService } from "modules/_common/services/tasks-service";
import {
  isTaskDone,
  isTaskToday,
  TTask,
  TTaskDone,
  TTaskToday,
} from "modules/_common/types/tasks";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import coolCat from "./images/swag-cool.gif";
import { isToday, parseISO } from "date-fns";
import { useTogglSettings } from "AuthenticatedApp";

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
  const tasksDoneToday = tasksDone.filter((task) => {
    return isToday(parseISO(task.date_done!));
  });

  const tasksToday: TTaskToday[] = tasksData.filter(isTaskToday);

  const tasksTodayCount = tasksToday.length;
  const doneTodayTaskCount = tasksDoneToday.length;
  const totalTasksToday = tasksTodayCount + doneTodayTaskCount;
  const percentDone = Math.floor((doneTodayTaskCount / totalTasksToday) * 100);

  const { startTimer } = useTimer(tasksToday);
  const { setTimerId } = useTogglSettings();

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
        staggerChildren: 0.6,
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

  const handleTimer = async () => {
    const res = await startTimer(0);
    if (res) {
      setTimerId(res.data.id.toString());
    }
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
            <p>{`${doneTodayTaskCount} of ${totalTasksToday} done`}</p>
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
            <button
              onClick={handleTimer}
              className="items-center py-4 px-12 w-full text-2xl font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md shadow-sm"
            >
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

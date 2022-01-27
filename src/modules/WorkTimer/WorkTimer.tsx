import { motion } from "framer-motion";
import { tasksService } from "modules/_common/services/tasks-service";
import { TStatus, TTask, TTaskToday } from "modules/_common/types/tasks";
import { sortByAscPriority } from "modules/_common/utils/sortByPriority";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, Redirect } from "react-router-dom";
import * as Icons from "./components/Icons";

// in seconds
const workDuration = 5;

export function WorkTimer() {
  /**
   * TODO:
   * skip, pause, done
   * skip goes to next task
   * pause goes back to task list and adds the elapsed time to the task
   * done goes to a mark task complete full page with a gif
   *  - can either start the next task or take a break
   *    - next task goes to timer page
   *    - take a break goes to break page
   */
  const [secondsLeft, setSecondsLeft] = useState(workDuration);
  const [toBreakTimer, setToBreakTimer] = useState(false);
  const [activeTask, setActiveTask] = useState(0);

  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  const tasksToday = filterTasks(tasksData, "today").sort(
    sortByAscPriority
  ) as TTaskToday[];

  const doneLinkState =
    tasksToday.length === 1
      ? {
          pathname: "/congrats",
          state: {
            currentTask: tasksToday[activeTask],
          },
        }
      : {
          pathname: "/success",
          state: {
            currentTask: tasksToday[activeTask],
            nextTask: tasksToday[activeTask + 1],
          },
        };

  useEffect(() => {
    let interval = setInterval(() => {
      if (secondsLeft === 0) {
        setToBreakTimer(true);
        return;
      }

      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const setToNextTask = () => {
    setActiveTask((prev) => prev + 1);
    setSecondsLeft(workDuration);
  };

  if (toBreakTimer) {
    return <Redirect to="/break" />;
  }

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center p-3 w-[40vw]">
        <p className="text-xl font-medium text-black">
          {timerMinutes}:{timerSeconds}
        </p>
      </div>
      <p className="p-3 w-[40vw] max-w-2xl text-4xl font-medium tracking-normal text-center text-black bg-gray-200 hover:bg-gray-100 rounded-lg border border-gray-200">
        {tasksToday[activeTask].task}
      </p>

      <div className="flex justify-center mt-4 space-x-2 w-[40vw]">
        <button
          type="button"
          className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
          title="Next"
          onClick={setToNextTask}
        >
          <Icons.Next />
        </button>
        <Link to="/">
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            title="Pause"
          >
            <Icons.Pause />
          </button>
        </Link>
        <Link to={doneLinkState}>
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
          >
            <Icons.Check />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

function filterTasks(tasks: TTask[], status: TStatus) {
  return tasks.filter((task: TTask) => task.status === status);
}

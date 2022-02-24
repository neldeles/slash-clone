import { motion } from "framer-motion";
import { tasksService } from "modules/_common/services/tasks-service";
import { TStatus, TTask, TTaskToday } from "modules/_common/types/tasks";
import { sortByAscPriority } from "modules/_common/utils/sortByPriority";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, Redirect } from "react-router-dom";
import { classNames } from "utils/classNames";
import * as Icons from "./components/Icons";
import useSound from "use-sound";
import laser from "assets/sounds/laser.mp3";

// in seconds
const workDuration = 1500;

export function WorkTimer() {
  const [secondsLeft, setSecondsLeft] = useState(workDuration);
  const [toBreakTimer, setToBreakTimer] = useState(false);
  const [activeTask, setActiveTask] = useState(0);
  const [play] = useSound(laser, { volume: 0.3 });

  const playAudio = () => {
    play();
  };

  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  const tasksToday = filterTasks(tasksData, "TODAY").sort(
    sortByAscPriority
  ) as TTaskToday[];

  const lastTask = tasksToday.length - 1;

  /**
   * If the active task is the last task in the array, loop back and make the first item
   * in the array the next task.
   */
  const nextTask = activeTask === lastTask ? 0 : activeTask + 1;

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
            nextTask: tasksToday[nextTask],
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
    if (activeTask === lastTask) {
      setActiveTask(0);
    } else {
      setActiveTask((prev) => prev + 1);
    }

    setSecondsLeft(workDuration);
  };

  if (tasksQuery.isLoading) {
    return <h1>Loading</h1>;
  }

  if (toBreakTimer) {
    return <Redirect to="/timer/break" />;
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
        <h1 className="text-xl font-medium tabular-nums text-black">
          {timerMinutes}:{timerSeconds}
        </h1>
      </div>
      <p className="p-3 w-[40vw] max-w-2xl text-4xl font-medium tracking-normal text-center text-black bg-gray-200 rounded-lg border border-gray-200">
        {tasksToday[activeTask].task}
      </p>

      <div className="flex justify-center mt-4 space-x-2 w-[40vw]">
        <button
          type="button"
          className={classNames(
            "inline-flex items-center p-3 text-white rounded-full border border-transparent shadow-sm",
            tasksToday.length === 1
              ? "bg-gray-400"
              : " bg-indigo-200 hover:bg-indigo-100"
          )}
          title="Next"
          disabled={tasksToday.length === 1 ? true : false}
          onClick={setToNextTask}
          aria-label="skip task"
        >
          <Icons.Next />
        </button>
        <Link to="/">
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            title="Pause"
            aria-label="pause"
          >
            <Icons.Pause />
          </button>
        </Link>
        <Link to={doneLinkState}>
          <button
            type="button"
            aria-label="mark done"
            onClick={playAudio}
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

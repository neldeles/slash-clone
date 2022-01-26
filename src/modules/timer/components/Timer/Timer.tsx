import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "../Icons";

// in seconds
const breakDuration = 5;
const workDuration = 5;

export function Timer() {
  /**
   * TODO:
   * - pause/play button
   * - if timer active show ff buttons:
   *  - restart
   *  - pause
   * - if timer inactive show ff buttons:
   *  - restart
   *  - pause
   *  - mark task as complete
   *  - cancel the timer
   */
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(workDuration);

  const toggleTimer = () => {
    setIsPaused(!isPaused);
  };

  const restartTimer = () => {
    setSecondsLeft(mode === "work" ? workDuration : breakDuration);
  };

  useEffect(() => {
    function switchMode() {
      const nextMode = mode === "work" ? "break" : "work";
      const nextSeconds = nextMode === "work" ? workDuration : breakDuration;

      setMode(nextMode);
      setSecondsLeft(nextSeconds);
    }

    let interval = setInterval(() => {
      if (isPaused) {
        return;
      }

      if (secondsLeft === 0) {
        return switchMode();
      }

      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isPaused, mode]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <motion.div
      className="flex flex-col justify-center items-center space-y-6 h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="p-3 w-[40vw] max-w-2xl text-4xl font-medium tracking-normal text-center text-black bg-gray-200 hover:bg-gray-100 rounded-lg border border-gray-200">
        {mode === "break"
          ? "Break time!"
          : "what happens when i add a really super duper long task that is very hard to fine and fit and then now what is it gonna is ther ea charachter"}
      </p>
      <div className="flex justify-center p-8 w-[40vw] max-w-2xl text-8xl text-center bg-white rounded-xl border border-gray-200">
        <p className="font-medium text-black">
          {timerMinutes}:{timerSeconds}
        </p>
      </div>
      {isPaused ? (
        <div className=" flex space-x-2">
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            title="Restart"
            onClick={restartTimer}
          >
            <Icons.Refresh />
          </button>

          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            onClick={toggleTimer}
            title="Resume"
          >
            <Icons.Play />
          </button>
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
          >
            <Icons.Check />
          </button>
          <Link to="/">
            <button
              type="button"
              className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
              title="Cancel"
            >
              <Icons.X />
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            title="Restart"
            onClick={restartTimer}
          >
            <Icons.Refresh />
          </button>
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            onClick={toggleTimer}
            title="Pause"
          >
            <Icons.Pause />
          </button>
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            title="Next"
          >
            <Icons.Next />
          </button>
        </div>
      )}
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Button } from "modules/_common/components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "../Icons";

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
  const [isTimerActive, setTimerActive] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const toggleTimer = () => {
    setTimerActive(!isTimerActive);
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center space-y-6 h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="p-3 w-[40vw] max-w-2xl text-4xl font-medium tracking-normal text-center text-black bg-gray-200 hover:bg-gray-100 rounded-lg border border-gray-200">
        what happens when i add a really super duper long task that is very hard
        to fine and fit and then now what is it gonna is ther ea charachter
      </p>
      <p className="p-8 w-[40vw] max-w-2xl text-8xl font-medium text-center text-black bg-white rounded-xl border border-gray-200">
        {timerMinutes}:{timerSeconds}
      </p>
      {isTimerActive ? (
        <div className="flex space-x-2">
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            title="Restart"
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
      ) : (
        <div className=" flex space-x-2">
          <button
            type="button"
            className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
            title="Restart"
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
      )}
    </motion.div>
  );
}

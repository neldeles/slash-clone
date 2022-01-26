import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as Icons from "./components/Icons";

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
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [toBreakTimer, setToBreakTimer] = useState(false);

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
        what happens when i add a really super duper long task that is very hard
        to fine and fit and then now what is it gonna is ther ea charachter
      </p>

      <div className="flex justify-center mt-4 space-x-2 w-[40vw]">
        <button
          type="button"
          className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
          title="Next"
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
        <button
          type="button"
          className="inline-flex items-center p-3 text-white bg-indigo-200 hover:bg-indigo-100 rounded-full border border-transparent shadow-sm"
        >
          <Icons.Check />
        </button>
      </div>
    </motion.div>
  );
}

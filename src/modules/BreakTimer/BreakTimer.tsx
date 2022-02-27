import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function BreakTimer() {
  const [isBreakOver, setIsBreakOver] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(300);

  useEffect(() => {
    let interval = setInterval(() => {
      if (secondsLeft === 0) {
        setIsBreakOver(true);
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

  return (
    <motion.div
      className="flex flex-col items-center py-8 h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header>
        <h1 className="text-3xl font-medium">Break Time</h1>
      </header>
      {isBreakOver ? (
        <>
          <main className="flex flex-1 items-center">
            <p className="text-9xl font-medium text-gray-350">Break is over!</p>
          </main>
          <div className="flex space-x-3">
            <Link to="/">
              <button className="py-3 px-6 w-full text-lg font-medium tracking-wide text-white bg-gray-500 hover:bg-gray-350 rounded-md shadow-sm">
                Edit Tasks
              </button>
            </Link>
            <Link to="/timer/work">
              <button className="items-center py-3 px-6 w-full text-lg font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md shadow-sm">
                Keep Slashing
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <main className="flex flex-1 items-center">
            <p className="text-[20rem] font-medium tabular-nums text-gray-350">
              {timerMinutes}:{timerSeconds}
            </p>
          </main>
          <footer>
            <Link to="/">
              <button className="py-3 px-6 w-full text-lg font-medium tracking-wide text-white bg-gray-500 hover:bg-gray-350 rounded-md shadow-sm">
                Cancel
              </button>
            </Link>
          </footer>
        </>
      )}
    </motion.div>
  );
}

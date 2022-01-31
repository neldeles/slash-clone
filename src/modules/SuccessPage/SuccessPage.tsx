import { motion } from "framer-motion";
import { useMarkTaskDone } from "modules/_common/hooks";
import { TTask } from "modules/_common/types/tasks";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const { markTaskDone, startAnimation: isDone } = useMarkTaskDone();

  const forwardedTasks = useRef({
    currentTask: location.state.currentTask,
    nextTask: location.state.nextTask,
  });

  useEffect(() => {
    const { currentTask } = forwardedTasks.current;
    markTaskDone(currentTask);
  }, [markTaskDone]);

  return (
    <motion.div
      className="flex flex-col items-center py-8 h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header>
        <h1 className="text-2xl font-light text-gray-350">
          {successTitles[0].title}
        </h1>
      </header>
      <main className="flex flex-col flex-1 items-center mt-8 space-y-8 max-w-2xl">
        <motion.p
          animate={{
            textDecorationColor: "#01a09e",
            textDecorationThickness: "4px",
            textDecorationLine: "line-through",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 40,
              delay: 1,
            },
          }}
          className="text-3xl font-medium"
        >
          {forwardedTasks.current.currentTask.task}
        </motion.p>
        <div className="w-full">
          <div className="w-full h-2 bg-gray-300 rounded-full"></div>
          <div className="flex justify-between px-2 mt-2">
            <p>9 of 12 done</p>
            <p>75%</p>
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
        <button className="text-gray-350">Take Break</button>
        <span className="text-gray-350">/</span>
        <Link to="/">
          <button className="text-gray-350">Edit Tasks</button>
        </Link>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { useMarkTaskDone } from "modules/_common/hooks";
import { TTask, TTaskToday } from "modules/_common/types/tasks";
import { Link, useLocation } from "react-router-dom";
import goldblum from "./images/goldblum-dance.gif";

type TTasks = {
  currentTask: TTask;
};

export function LastTaskPage() {
  const location = useLocation<TTasks>();
  const { currentTask } = location.state;
  const { markTaskDone, startAnimation: isDone } = useMarkTaskDone();

  console.log(currentTask);

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
          Woooo! That's it for today!
        </h1>
      </header>
      <main className="flex flex-col flex-1 items-center mt-8 space-y-8 max-w-2xl">
        <motion.p
          animate={{
            textDecorationColor: "#01a09e",
            textDecorationThickness: "4px",
            textDecorationLine: "line-through",
            // transition: {
            //   type: "spring",
            //   stiffness: 400,
            //   damping: 40,
            //   delay: 1,
            // },
            transition: {
              type: "tween",
              delay: 2,
              duration: 2,
            },
          }}
          className="text-3xl font-medium text-center"
        >
          {currentTask.task}
        </motion.p>
        <div className="w-full">
          <h2 className="text-base text-center text-gray-400">
            Progress this week:
          </h2>
          <div className="mt-4 w-full h-2 bg-gray-300 rounded-full"></div>
          <div className="flex justify-between px-2 mt-2">
            <p className="text-gray-400">9 of 12 done</p>
            <p className="text-gray-400">75%</p>
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

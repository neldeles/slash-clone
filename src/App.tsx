import { Input } from "components/Input";
import React, { useEffect, useState } from "react";
import { Heading } from "components/Heading";
import { Button } from "components/Button";
import { classNames } from "utils/classNames";
import { ListItem } from "components/ListItem";
import { motion, AnimatePresence } from "framer-motion";

const tasks = {
  thisWeek: [
    {
      id: "1",
      task: "Wash dishes",
    },
    {
      id: "2",
      task: "Clean house",
    },
    {
      id: "3",
      task: "Water the plants",
    },
  ],
};

function App() {
  const [isActive, setIsActive] = useState(true);
  const [tasksThisweek, setTasksThisWeek] = useState(tasks.thisWeek);

  const containerVariants = {
    active: {
      flexGrow: 1,
    },
    inactive: {
      flexGrow: 0,
    },
  };

  useEffect(() => {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);

  return (
    <div className="flex">
      <motion.div
        onClick={() => {
          if (!isActive) {
            setIsActive(true);
          }
        }}
        className={classNames(
          "py-2 px-8 h-screen border-r border-gray-200 group",
          isActive
            ? null
            : "hover:cursor-pointer hover:bg-gray-200 transition-colors duration-75"
        )}
        variants={containerVariants}
        initial={false}
        animate={isActive ? "active" : "inactive"}
      >
        <div className={classNames("flex items-center mt-6")}>
          <h1
            className={classNames(
              "font-medium mr-auto",
              isActive
                ? "text-lg text-gray-500"
                : "text-gray-300 text-base transition-all duration-75",
              "group-hover:text-gray-500"
            )}
          >
            This Week
          </h1>
          {isActive ? (
            <button
              onClick={() => setIsActive(false)}
              className={classNames("text-gray-300 hover:text-gray-500")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : null}
        </div>

        {isActive ? (
          <div>
            <ul>
              {tasksThisweek.map((task) => {
                return (
                  <ListItem
                    id={task.id}
                    text={task.task}
                    displayIndex={false}
                  />
                );
              })}
            </ul>
            <form>
              <Input
                id="addThisWeek"
                name="Add task this week"
                placeholder="Add task..."
                type="text"
              />
            </form>
          </div>
        ) : null}
      </motion.div>

      <div className="grow-[2] justify-center py-2 px-8 h-screen border-r border-gray-200">
        <div className="mx-auto max-w-lg">
          <Heading text="Today" />
          <Input id="today" name="today" placeholder="Add task" type="text" />
          <div className="mt-6">
            <Button
              label="Start Slashing"
              onClick={() => console.log("slash")}
            />
          </div>
        </div>
      </div>

      <div className="grow py-2 px-8 h-screen border-r border-gray-200">
        <Heading text="Done" />
      </div>
    </div>
  );
}

export default App;

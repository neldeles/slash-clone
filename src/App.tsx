import { Input } from "modules/_common/components/Input";
import React, { useEffect, useRef, useState } from "react";
import { Heading } from "modules/_common/components/Heading";
import { Button } from "modules/_common/components/Button";
import { classNames } from "utils/classNames";
import { ListItem } from "modules/_common/components/ListItem";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerThisWeek } from "modules/column-this-week/components/ContainerThisWeek";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";

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
  const [tasksThisWeek, setTasksThisWeek] = useState(tasks.thisWeek);
  const [newTask, setNewTask] = useState("");

  const addTaskThisWeek = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newTasksThisWeek = [
      ...tasksThisWeek,
      { id: Math.floor(Math.random() * 99).toString(), task: newTask },
    ];

    setNewTask("");
    setTasksThisWeek(newTasksThisWeek);
  };

  useEffect(() => {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);

  return (
    <div className="flex">
      <ContainerThisWeek isActive={isActive} setIsActive={setIsActive}>
        <Header>
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
        </Header>

        {isActive ? (
          <div>
            <div className="overflow-auto max-h-[77vh]">
              <ul className="px-8">
                {tasksThisWeek.map((task) => {
                  return (
                    <ListItem
                      key={task.id}
                      id={task.id}
                      text={task.task}
                      displayIndex={false}
                    />
                  );
                })}
                <AlwaysScrollToBottom dep={tasksThisWeek} />
              </ul>
            </div>
            <form
              onSubmit={addTaskThisWeek}
              className="px-8"
              autoComplete="off"
            >
              <input
                id="addThisWeek"
                name="Add task this week"
                aria-label="add task this week"
                type="text"
                className="peer w-full h-10 text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-b-2 border-gray-400 focus:outline-none"
                placeholder="Add task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </form>
          </div>
        ) : null}
      </ContainerThisWeek>

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

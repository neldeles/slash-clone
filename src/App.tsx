import { Input } from "modules/_common/components/Input";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Heading } from "modules/_common/components/Heading";
import { Button } from "modules/_common/components/Button";
import { classNames } from "utils/classNames";
import { ListItem } from "modules/_common/components/ListItem";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { DoneListItem } from "modules/column-done/components/DoneListItem";

type TTask = {
  id: string;
  task: string;
};

type TTasks = {
  thisWeek: TTask[];
  today: TTask[];
  done: TTask[];
};

const initialTasks: TTasks = {
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
  today: [],
  done: [],
};

function App() {
  const [isActive, setIsActive] = useState(true);
  const [isDoneContainerActive, setIsDoneContainerActive] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  console.log("🚀 ~ file: App.tsx ~ line 34 ~ App ~ tasks", tasks);
  const [newTask, setNewTask] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const addTaskThisWeek = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newTaskThisWeek = {
        id: Math.floor(Math.random() * 99).toString(),
        task: newTask,
      };

      const updatedTasks = {
        thisWeek: [...tasks.thisWeek, newTaskThisWeek],
        today: [...tasks.today],
        done: [...tasks.done],
      };

      setNewTask("");
      setTasks(updatedTasks);
    }
  };

  useLayoutEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [newTask, isActive]);

  useEffect(() => {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);

  return (
    <div className="flex">
      <SideContainer isActive={isActive} setIsActive={setIsActive}>
        <Header>
          <h1
            className={classNames(
              "font-medium tracking-wide mr-auto",
              isActive
                ? "text-lg text-gray-500"
                : "text-gray-300 text-base transition-all duration-75 group-hover:text-gray-500"
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
                <AnimatePresence initial={false}>
                  {tasks.thisWeek.map((task) => {
                    return (
                      <ListItem
                        key={task.id}
                        id={task.id}
                        text={task.task}
                        displayIndex={false}
                        tasks={tasks}
                        setTasks={setTasks}
                      />
                    );
                  })}
                </AnimatePresence>
                {/*
                  TODO: might need to memoize this to prevent scrolling
                  to bottom if another container is updated.
                */}
                <AlwaysScrollToBottom dep={tasks.thisWeek} />
              </ul>
            </div>
            <form className="px-8 mt-1" autoComplete="off">
              <textarea
                id="addThisWeek"
                name="Add task this week"
                aria-label="add task this week"
                maxLength={140}
                className="py-2 w-full max-h-full text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-b-2 border-gray-400 focus:outline-none resize-none"
                placeholder="Add task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={addTaskThisWeek}
                ref={textareaRef}
              />
            </form>
          </div>
        ) : null}
      </SideContainer>

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

      <SideContainer
        isActive={isDoneContainerActive}
        setIsActive={setIsDoneContainerActive}
      >
        <Header>
          <h1
            className={classNames(
              "font-medium tracking-wide mr-auto",
              isDoneContainerActive
                ? "text-lg text-gray-500"
                : "text-gray-300 text-base transition-all duration-75",
              "group-hover:text-gray-500"
            )}
          >
            Done
          </h1>
          {isDoneContainerActive ? (
            <button
              onClick={() => setIsDoneContainerActive(false)}
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

        {isDoneContainerActive ? (
          <div>
            <div className="overflow-auto max-h-[77vh]">
              <ul className="px-8">
                <AnimatePresence initial={false}>
                  {tasks.done.map((task) => {
                    return (
                      <DoneListItem
                        key={task.id}
                        id={task.id}
                        text={task.task}
                        tasks={tasks}
                        setTasks={setTasks}
                      />
                    );
                  })}
                </AnimatePresence>
                {/*
                  TODO: might need to memoize this to prevent scrolling
                  to bottom if another container is updated.
                */}
                <AlwaysScrollToBottom dep={tasks.done} />
              </ul>
            </div>
          </div>
        ) : null}
      </SideContainer>
    </div>
  );
}

export default App;

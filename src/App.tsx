import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Heading } from "modules/_common/components/Heading";
import { Button } from "modules/_common/components/Button";
import { classNames } from "utils/classNames";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { DoneListItem } from "modules/column-done/components/DoneListItem";
import { TodayListItem } from "modules/column-today/components/TodayListItem";
import { ThisWeekListItem } from "modules/column-this-week/components/ThisWeekListItem";
import { Close } from "modules/_common/components/Icons";
import { TTask, TTasks } from "modules/_common/types/tasks";
import { useQuery } from "react-query";
import { tasksService } from "modules/_common/services/tasks-service";

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
  const [newTask, setNewTask] = useState("");

  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  console.log(tasksQuery);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const addTaskToday = () => {
    console.log("add task Today");
  };

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

  if (tasksQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  const tasksThisWeek = tasksQuery.data.filter(
    (task: TTask) => task.status === "thisWeek"
  );
  const tasksToday = tasksQuery.data.filter(
    (task: TTask) => task.status === "today"
  );
  const tasksDone = tasksQuery.data.filter(
    (task: TTask) => task.status === "done"
  );

  return (
    <div className="flex">
      <SideContainer isActive={isActive} setIsActive={setIsActive}>
        <Header>
          <h1
            className={classNames(
              "font-medium tracking-wide",
              isActive
                ? "mr-auto text-lg text-gray-500"
                : "text-gray-300 text-base transition-all duration-75 group-hover:text-gray-500"
            )}
            id="this-week-heading"
          >
            This Week
          </h1>
          {isActive ? (
            <button
              onClick={() => setIsActive(false)}
              className={classNames("text-gray-300 hover:text-black")}
            >
              <Close />
            </button>
          ) : null}
        </Header>

        {isActive ? (
          <motion.div
            initial={false}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-auto max-h-[77vh]">
              <ul className="px-8" aria-labelledby="this-week-heading">
                <AnimatePresence initial={false}>
                  {tasksThisWeek.map((task: TTask) => {
                    return (
                      <ThisWeekListItem
                        key={task.id}
                        id={task.id}
                        text={task.task}
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
          </motion.div>
        ) : null}
      </SideContainer>

      <div className="grow-[2] justify-center py-2 px-8 h-screen border-r border-gray-200">
        <div className="mx-auto max-w-lg">
          <Heading text="Today" />
          <div>
            <div className="overflow-auto max-h-[77vh]">
              <ul className="px-8">
                <AnimatePresence initial={false}>
                  {tasksToday.map((task: TTask, index: number) => {
                    return (
                      <TodayListItem
                        key={task.id}
                        id={task.id}
                        text={task.task}
                        taskIndex={index}
                      />
                    );
                  })}
                </AnimatePresence>
                {/*
                  TODO: might need to memoize this to prevent scrolling
                  to bottom if another container is updated.
                */}
                <AlwaysScrollToBottom dep={tasks.today} />
              </ul>
            </div>
          </div>
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
              "font-medium tracking-wide",
              isDoneContainerActive
                ? "mr-auto text-lg text-gray-500"
                : "text-gray-300 text-base transition-all duration-75",
              "group-hover:text-gray-500"
            )}
          >
            Done
          </h1>
          {isDoneContainerActive ? (
            <button
              onClick={() => setIsDoneContainerActive(false)}
              className={classNames("text-gray-300 hover:text-black")}
            >
              <Close />
            </button>
          ) : null}
        </Header>

        {isDoneContainerActive ? (
          <motion.div
            initial={false}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        ) : null}
      </SideContainer>
    </div>
  );
}

export default App;

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Heading } from "modules/_common/components/Heading";
import { Button } from "modules/_common/components/Button";
import { classNames } from "utils/classNames";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { DoneListItem } from "modules/column-done/components/DoneListItem";
import { TodayListItem } from "modules/column-today/components/TodayListItem";
import { ThisWeekListItem } from "modules/column-this-week/components/ThisWeekListItem";
import { Close } from "modules/_common/components/Icons";
import { TNewTask, TStatus, TTask, TTasks } from "modules/_common/types/tasks";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { tasksService } from "modules/_common/services/tasks-service";
import { taskService } from "modules/_common/services/task-service";

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
  const [isThisWeekOpen, toggleThisWeekOpen] = useCycle(true, false);
  const [isDoneOpen, toggleDoneOpen] = useCycle(true, false);
  const [isDoneContainerActive, setIsDoneContainerActive] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const queryClient = useQueryClient();

  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = tasksQuery.data ?? [];
  const addTaskMutation = useMutation(
    (task: TNewTask) => taskService.create(task),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const addTaskToday = () => {
    console.log("add task Today");
  };

  const addTaskThisWeek = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const task: TNewTask = {
        task: newTask,
        status: "thisWeek",
      };

      addTaskMutation.mutate(task);

      setNewTask("");
    }
  };

  useLayoutEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [tasksQuery, isThisWeekOpen]);

  useEffect(() => {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);

  const tasksThisWeek = sortByPriority(
    filterTasks(tasksData, "thisWeek"),
    "asc"
  );
  const tasksToday = sortByPriority(filterTasks(tasksData, "today"), "asc");
  const tasksDone = filterTasks(tasksData, "done").sort(sortByDoneDate);

  if (tasksQuery.isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex">
      <SideContainer toggleOpen={toggleThisWeekOpen} isOpen={isThisWeekOpen}>
        <Header>
          <motion.h1
            className={classNames(
              "font-medium tracking-wide",
              isThisWeekOpen
                ? "mr-auto text-lg text-gray-500"
                : "text-gray-300 text-base"
            )}
            id="this-week-heading"
            layoutId="this-week-heading"
          >
            This Week
          </motion.h1>
          {isThisWeekOpen ? (
            <button
              onClick={() => toggleThisWeekOpen()}
              className={classNames("text-gray-300 hover:text-black")}
            >
              <Close />
            </button>
          ) : null}
        </Header>

        {isThisWeekOpen ? (
          <motion.div
            initial={false}
            // animate={{ opacity: [0, 0, 0.3, 1] }}
            // animate={{ width: "100%" }}
            // transition={{ duration: 0.2, delay: 0.1 }}
            // className="w-[calc(20vw)]"
          >
            <motion.div className="overflow-auto max-h-[77vh]">
              <motion.ul className="px-8" aria-labelledby="this-week-heading">
                <AnimatePresence>
                  {tasksThisWeek.map((task: TTask) => {
                    return <ThisWeekListItem key={task.id} task={task} />;
                  })}
                </AnimatePresence>
                {/*
                  TODO: might need to memoize this to prevent scrolling
                  to bottom if another container is updated.
                */}
                <AlwaysScrollToBottom
                  currentListLength={tasksThisWeek.length}
                />
              </motion.ul>
            </motion.div>
            <motion.form className="px-8 mt-1" autoComplete="off">
              <motion.textarea
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
            </motion.form>
          </motion.div>
        ) : null}
      </SideContainer>

      <div className="grow-[2] justify-center py-2 px-8 h-screen border-r border-gray-200">
        <div className="mx-auto max-w-lg">
          <Heading text="Today" />
          <div>
            <div className="overflow-auto max-h-[77vh]">
              <ul className="px-8" aria-labelledby="today-heading">
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
                <AlwaysScrollToBottom currentListLength={tasksToday.length} />
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

      <SideContainer toggleOpen={toggleDoneOpen} isOpen={isDoneOpen}>
        <Header>
          <h1
            className={classNames(
              "font-medium tracking-wide",
              isDoneOpen
                ? "mr-auto text-lg text-gray-500"
                : "text-gray-300 text-base transition-all duration-75",
              "group-hover:text-gray-500"
            )}
            id="done-heading"
          >
            Done
          </h1>
          {isDoneOpen ? (
            <button
              onClick={() => toggleDoneOpen()}
              className={classNames("text-gray-300 hover:text-black")}
            >
              <Close />
            </button>
          ) : null}
        </Header>

        {isDoneOpen ? (
          <motion.div
            initial={false}
            animate={{ opacity: [0, 0, 0.3, 1] }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <motion.div className="overflow-auto max-h-[77vh]">
              <motion.ul className="px-8" aria-labelledby="done-heading">
                <AnimatePresence initial={false}>
                  {tasksDone.map((task: TTask) => {
                    return <DoneListItem key={task.id} task={task} />;
                  })}
                </AnimatePresence>
                {/*
                  TODO: might need to memoize this to prevent scrolling
                  to bottom if another container is updated.
                */}
                <AlwaysScrollToBottom currentListLength={tasksDone.length} />
              </motion.ul>
            </motion.div>
          </motion.div>
        ) : null}
      </SideContainer>
    </div>
  );
}

function filterTasks(tasks: TTask[], status: TTask["status"]) {
  return tasks.filter((task: TTask) => task.status === status);
}

function sortByPriority(arr: TTask[], orderBy: "asc" | "desc") {
  if (orderBy === "asc") {
    return arr.sort(function (a, b) {
      return a.priority! - b.priority!;
    });
  }

  return arr.sort(function (a, b) {
    return b.priority! - a.priority!;
  });
}

function sortByDoneDate(a: TTask, b: TTask) {
  const dateA = new Date(a.date_done!).getTime();
  const dateB = new Date(b.date_done!).getTime();
  return dateA > dateB ? 1 : -1;
}

export default App;

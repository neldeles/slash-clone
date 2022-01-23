import React, { useEffect, useMemo } from "react";
import { Button } from "modules/_common/components/Button";
import { classNames } from "utils/classNames";
import { AnimatePresence, LayoutGroup, motion, useCycle } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { DoneListItem } from "modules/column-done/components/DoneListItem";
import { TodayListItem } from "modules/column-today/components/TodayListItem";
import { ThisWeekListItem } from "modules/column-this-week/components/ThisWeekListItem";
import { Close } from "modules/_common/components/Icons";
import { TTask } from "modules/_common/types/tasks";
import { useQuery } from "react-query";
import { tasksService } from "modules/_common/services/tasks-service";
import { useAddTask, useAutoResizeTextarea } from "modules/_common/hooks";

function App() {
  const [isThisWeekOpen, toggleThisWeekOpen] = useCycle(true, false);
  const [isDoneOpen, toggleDoneOpen] = useCycle(true, false);

  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  const thisWeekRef = useAutoResizeTextarea(tasksData, isThisWeekOpen);
  const todayRef = useAutoResizeTextarea(tasksData, isThisWeekOpen);

  const {
    newTask: newTaskThisWeek,
    setNewTask: setNewTaskThisWeek,
    addTask: addTaskThisWeek,
  } = useAddTask("thisWeek");

  const {
    newTask: newTaskToday,
    setNewTask: setNewTaskToday,
    addTask: addTaskToday,
  } = useAddTask("today");

  useEffect(function setBackgroundColor() {
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
          // initial={false}
          // layoutScroll
          // animate={{ opacity: [0, 0, 0.3, 1] }}
          // animate={{ width: "100%" }}
          // transition={{ duration: 0.2, delay: 0.1 }}
          // className="w-[calc(20vw)]"
          >
            <LayoutGroup>
              <motion.ul
                layoutScroll
                className="overflow-auto px-8 max-h-[74vh]"
                aria-labelledby="this-week-heading"
              >
                <AnimatePresence>
                  {tasksThisWeek.map((task: TTask) => {
                    return <ThisWeekListItem key={task.id} task={task} />;
                  })}
                  {/*
                  TODO: might need to memoize this to prevent scrolling
                  to bottom if another container is updated.
                */}
                  <AlwaysScrollToBottom
                    currentListLength={tasksThisWeek.length}
                  />
                </AnimatePresence>
              </motion.ul>
              <motion.form className="px-8 mt-3" autoComplete="off" layout>
                <motion.textarea
                  id="addThisWeek"
                  name="Add task this week"
                  aria-label="add task this week"
                  maxLength={140}
                  className="py-2 w-full max-h-full text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-b-2 border-gray-400 focus:outline-none resize-none"
                  placeholder="Add task..."
                  value={newTaskThisWeek}
                  onChange={(e) => setNewTaskThisWeek(e.target.value)}
                  onKeyPress={addTaskThisWeek}
                  ref={thisWeekRef}
                />
              </motion.form>
            </LayoutGroup>
          </motion.div>
        ) : null}
      </SideContainer>

      <div className="grow-[2] justify-center py-2 px-8 h-screen border-r border-gray-200">
        <div className="mx-auto max-w-lg">
          <h1
            className="mt-6 text-lg font-medium tracking-wide text-gray-500"
            id="today-heading"
          >
            Today
          </h1>
          <LayoutGroup>
            <motion.div>
              <motion.ul
                layoutScroll
                className="overflow-auto px-8 max-h-[65vh]"
                aria-labelledby="today-heading"
              >
                <AnimatePresence initial={false}>
                  {tasksToday.map((task: TTask, index: number) => {
                    return (
                      <TodayListItem
                        key={task.id}
                        task={task}
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
              </motion.ul>
              <motion.form className="px-8 mt-3" autoComplete="off" layout>
                <motion.textarea
                  id="addToday"
                  name="Add task Today"
                  aria-label="add task today"
                  maxLength={140}
                  className="py-2 w-full max-h-full text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-b-2 border-gray-400 focus:outline-none resize-none"
                  placeholder="Add task..."
                  value={newTaskToday}
                  onChange={(e) => setNewTaskToday(e.target.value)}
                  onKeyPress={addTaskToday}
                  ref={todayRef}
                />
              </motion.form>
            </motion.div>
            <motion.div className="mt-6" layout>
              <Button
                label="Start Slashing"
                onClick={() => console.log("slash")}
              />
            </motion.div>
          </LayoutGroup>
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
          <motion.div initial={false}>
            <motion.ul
              className="overflow-auto px-8 max-h-[77vh]"
              aria-labelledby="done-heading"
              layoutScroll
            >
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

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { TodayListItem } from "modules/Main/components/Today/components/TodayListItem";
import { TTask, TTaskToday } from "modules/_common/types/tasks";
import { useAddTask } from "modules/_common/hooks";
import { useLayoutEffect, useRef } from "react";
import { TodayButton } from "./components/TodayButton";
import { TodayTextarea } from "./components/TodayTextarea";

type TProps = {
  tasksToday: TTaskToday[];
  tasksData: TTask[];
};

export function Today({ tasksToday, tasksData }: TProps) {
  const todayRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (todayRef && todayRef.current) {
      todayRef.current.style.height = "0px";
      const scrollHeight = todayRef.current.scrollHeight;
      todayRef.current.style.height = scrollHeight + "px";
    }
  });

  const {
    newTask: newTaskToday,
    setNewTask: setNewTaskToday,
    addTaskTextarea: addTaskToday,
    addTaskOnClick: addTaskTodayOnClick,
  } = useAddTask("today");

  return (
    <div className="flex basis-full justify-center py-2 px-8 h-screen border-r border-gray-200">
      <div className="w-10/12 max-w-lg">
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
              <AnimatePresence>
                {tasksToday.map((task: TTaskToday, index: number) => {
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
            <motion.form className="px-8 mt-3" autoComplete="off">
              {tasksToday.length === 0 ? (
                <TodayTextarea
                  addTaskToday={addTaskToday}
                  newTaskToday={newTaskToday}
                  setNewTaskToday={setNewTaskToday}
                  todayRef={todayRef}
                  placeholder="Add task + hit enter..."
                />
              ) : (
                <TodayTextarea
                  addTaskToday={addTaskToday}
                  newTaskToday={newTaskToday}
                  setNewTaskToday={setNewTaskToday}
                  todayRef={todayRef}
                  placeholder="Add task..."
                />
              )}
            </motion.form>
          </motion.div>
          <motion.div className="mt-6">
            <AnimatePresence>
              <TodayButton
                newTaskToday={newTaskToday}
                tasksToday={tasksToday}
                handleAddTask={addTaskTodayOnClick}
              />
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

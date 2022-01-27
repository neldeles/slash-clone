import { Button } from "modules/_common/components/Button";
import { AnimatePresence, LayoutGroup, motion, useCycle } from "framer-motion";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { TodayListItem } from "modules/Main/components/Today/components/TodayListItem";
import { TTask, TTaskToday } from "modules/_common/types/tasks";
import { useAddTask, useAutoResizeTextarea } from "modules/_common/hooks";
import { Link } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";

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
          <motion.div className="mt-6">
            {newTaskToday ? (
              <Button
                id="save-task"
                label="Save Task"
                onClick={() => addTaskTodayOnClick()}
              />
            ) : (
              <Link to="/timer">
                <Button
                  label="Start Slashing"
                  id="start-slashing"
                  onClick={() => console.log("slash")}
                />
              </Link>
            )}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

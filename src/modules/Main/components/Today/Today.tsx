import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { TodayListItem } from "modules/Main/components/Today/components/TodayListItem";
import { TTask, TTaskToday } from "modules/_common/types/tasks";
import { useAddTask, useAuth } from "modules/_common/hooks";
import { useLayoutEffect, useRef } from "react";
import { TodayButton } from "./components/TodayButton";
import { TodayTextarea } from "./components/TodayTextarea";
import { Logout, Settings, Time } from "modules/_common/components/Icons";
import { Modal } from "./components/Modal";

import { SettingsForm } from "./components/SettingsForm";
import { Link } from "react-router-dom";

type TProps = {
  tasksToday: TTaskToday[];
  tasksData: TTask[];
};

export function Today({ tasksToday, tasksData }: TProps) {
  const todayRef = useRef<HTMLTextAreaElement | null>(null);

  const { handleLogout } = useAuth();

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
  } = useAddTask("TODAY");

  return (
    <>
      <div className="flex relative basis-full justify-center py-2 px-8 h-screen border-r border-gray-200">
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
                <AlwaysScrollToBottom currentListLength={tasksToday.length} />
              </motion.ul>
              <motion.form className="px-8 mt-3" autoComplete="off">
                {tasksToday.length ? (
                  <TodayTextarea
                    addTaskToday={addTaskToday}
                    newTaskToday={newTaskToday}
                    setNewTaskToday={setNewTaskToday}
                    todayRef={todayRef}
                    placeholder="Add task..."
                  />
                ) : (
                  <TodayTextarea
                    addTaskToday={addTaskToday}
                    newTaskToday={newTaskToday}
                    setNewTaskToday={setNewTaskToday}
                    todayRef={todayRef}
                    placeholder="Add task + hit enter..."
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
        <div className="flex absolute bottom-6 py-2 px-4 space-x-4 bg-gray-100 rounded-full shadow-md">
          <Modal>
            <Modal.OpenButton>
              <button
                className="text-gray-300 hover:text-black"
                title="settings"
              >
                <Settings />
              </button>
            </Modal.OpenButton>
            <Modal.Content>
              <SettingsForm />
            </Modal.Content>
          </Modal>

          <button className="text-gray-300 hover:text-black" title="Toggl">
            <Link to="/toggl-settings">
              <Time />
            </Link>
          </button>

          <button
            className="text-gray-300 hover:text-black"
            title="logout"
            onClick={handleLogout}
          >
            <Logout />
          </button>
        </div>
      </div>
    </>
  );
}

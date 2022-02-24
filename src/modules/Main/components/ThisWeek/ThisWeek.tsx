import { AnimatePresence, LayoutGroup, motion, useCycle } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { ThisWeekListItem } from "modules/Main/components/ThisWeek/components/ThisWeekListItem";
import { TTask, TTaskThisWeek } from "modules/_common/types/tasks";
import { useAddTask } from "modules/_common/hooks";
import { AnimatedHeading } from "modules/_common/components/AnimatedHeading";
import { CloseButton } from "modules/_common/components/CloseButton";
import { useLayoutEffect, useRef } from "react";
import { classNames } from "utils/classNames";

type TProps = {
  tasksThisWeek: TTaskThisWeek[];
  tasksData: TTask[];
};

export function ThisWeek({ tasksThisWeek, tasksData }: TProps) {
  const [isThisWeekOpen, toggleThisWeekOpen] = useCycle(true, false);
  const thisWeekRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (thisWeekRef && thisWeekRef.current) {
      thisWeekRef.current.style.height = "0px";
      const scrollHeight = thisWeekRef.current.scrollHeight;
      thisWeekRef.current.style.height = scrollHeight + "px";
    }
  });

  const {
    newTask: newTaskThisWeek,
    setNewTask: setNewTaskThisWeek,
    addTaskTextarea: addTaskThisWeek,
  } = useAddTask("THIS_WEEK");

  return (
    <SideContainer toggleOpen={toggleThisWeekOpen} isOpen={isThisWeekOpen}>
      <Header>
        <AnimatedHeading id="this-week-heading" isOpen={isThisWeekOpen}>
          This Week
        </AnimatedHeading>
        {isThisWeekOpen ? (
          <CloseButton
            onClick={() => toggleThisWeekOpen()}
            ariaLabel="close this week column"
          />
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
                className={classNames(
                  "py-2 w-full max-h-full bg-transparent border-x-0 border-t-0 border-b-2 focus:border-b-black focus:outline-none focus:ring-0 resize-none",
                  "text-lg placeholder:text-base placeholder:font-normal font-bold placeholder:text-gray-300 text-black focus:placeholder:text-gray-400",
                  tasksThisWeek.length ? null : "truncate"
                )}
                placeholder={
                  tasksThisWeek.length
                    ? "Add task..."
                    : "Add task + hit enter..."
                }
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
  );
}

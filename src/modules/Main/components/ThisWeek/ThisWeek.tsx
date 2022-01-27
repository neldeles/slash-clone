import { AnimatePresence, LayoutGroup, motion, useCycle } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { ThisWeekListItem } from "modules/Main/components/ThisWeek/components/ThisWeekListItem";
import { TTask, TTaskThisWeek } from "modules/_common/types/tasks";
import { useAddTask, useAutoResizeTextarea } from "modules/_common/hooks";
import { AnimatedHeading } from "modules/_common/components/AnimatedHeading";
import { CloseButton } from "modules/_common/components/CloseButton";

type TProps = {
  tasksThisWeek: TTaskThisWeek[];
  tasksData: TTask[];
};

export function ThisWeek({ tasksThisWeek, tasksData }: TProps) {
  const [isThisWeekOpen, toggleThisWeekOpen] = useCycle(true, false);

  const thisWeekRef = useAutoResizeTextarea(tasksData, isThisWeekOpen);

  const {
    newTask: newTaskThisWeek,
    setNewTask: setNewTaskThisWeek,
    addTaskTextarea: addTaskThisWeek,
  } = useAddTask("thisWeek");

  return (
    <SideContainer toggleOpen={toggleThisWeekOpen} isOpen={isThisWeekOpen}>
      <Header>
        <AnimatedHeading id="this-week-heading" isOpen={isThisWeekOpen}>
          This Week
        </AnimatedHeading>
        {isThisWeekOpen ? (
          <CloseButton onClick={() => toggleThisWeekOpen()} />
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
  );
}
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { DoneListItem } from "modules/column-done/components/DoneListItem";
import { AnimatedHeading } from "modules/_common/components/AnimatedHeading";
import { CloseButton } from "modules/_common/components/CloseButton";
import { TTaskDone } from "modules/_common/types/tasks";

type TProps = {
  tasksDone: TTaskDone[];
};

export function Done({ tasksDone }: TProps) {
  const [isDoneOpen, toggleDoneOpen] = useCycle(true, false);

  return (
    <SideContainer toggleOpen={toggleDoneOpen} isOpen={isDoneOpen}>
      <Header>
        <AnimatedHeading id="done-heading" isOpen={isDoneOpen}>
          Done
        </AnimatedHeading>
        {isDoneOpen ? <CloseButton onClick={() => toggleDoneOpen()} /> : null}
      </Header>

      {isDoneOpen ? (
        <motion.div initial={false}>
          <motion.ul
            className="overflow-auto px-8 max-h-[77vh]"
            aria-labelledby="done-heading"
            layoutScroll
          >
            <AnimatePresence>
              {tasksDone.map((task: TTaskDone) => {
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
  );
}

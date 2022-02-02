import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Header } from "modules/_common/components/Header";
import { AlwaysScrollToBottom } from "modules/_common/components/AlwaysScrollToBottom";
import { SideContainer } from "modules/_common/components/SideContainer";
import { DoneListItem } from "modules/Main/components/Done/components/DoneListItem";
import { AnimatedHeading } from "modules/_common/components/AnimatedHeading";
import { CloseButton } from "modules/_common/components/CloseButton";
import { TTaskDone } from "modules/_common/types/tasks";
import { isSameDay, parseISO, format } from "date-fns";
import React from "react";
import { sortByDoneDate } from "modules/_common/utils/sortByDoneDate";

type TProps = {
  tasksDone: TTaskDone[];
};

export function Done({ tasksDone }: TProps) {
  const [isDoneOpen, toggleDoneOpen] = useCycle(true, false);

  const doneDates = tasksDone.map((task) =>
    format(parseISO(task.date_done!), "yyyy-MM-dd")
  );
  const uniqueDoneDates = [...Array.from(new Set(doneDates))].sort((a, b) =>
    a === b ? 0 : a < b ? 1 : -1
  );

  return (
    <SideContainer toggleOpen={toggleDoneOpen} isOpen={isDoneOpen}>
      <Header>
        <AnimatedHeading id="done-heading" isOpen={isDoneOpen}>
          Done
        </AnimatedHeading>
        {isDoneOpen ? (
          <CloseButton
            onClick={() => toggleDoneOpen()}
            ariaLabel="close done column"
          />
        ) : null}
      </Header>

      {isDoneOpen ? (
        <motion.div initial={false}>
          <motion.ul
            className="overflow-auto px-8 max-h-[77vh]"
            aria-labelledby="done-heading"
            layoutScroll
          >
            <AnimatePresence>
              {uniqueDoneDates.map((doneDate) => {
                return (
                  <React.Fragment key={doneDate}>
                    <h2
                      className="py-2 font-medium text-gray-400"
                      aria-label="date heading"
                    >
                      {format(
                        parseISO(doneDate),
                        "EEE MMM dd yyyy"
                      ).toUpperCase()}
                    </h2>
                    <u className="block h-0.5 bg-gray-250" />
                    {tasksDone
                      .filter((task) =>
                        isSameDay(parseISO(task.date_done!), parseISO(doneDate))
                      )
                      .sort(sortByDoneDate)
                      .map((task) => {
                        return <DoneListItem key={task.id} task={task} />;
                      })}
                  </React.Fragment>
                );
              })}
              {/* {tasksDone.map((task: TTaskDone) => {
                return <DoneListItem key={task.id} task={task} />;
              })} */}
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

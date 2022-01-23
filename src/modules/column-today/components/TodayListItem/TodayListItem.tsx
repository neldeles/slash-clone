import { motion } from "framer-motion";
import { IconButton } from "modules/_common/components/IconButton";
import {
  Check,
  LeftArrow,
  RightArrow,
  Thrash,
} from "modules/_common/components/Icons";
import { ListItem } from "modules/_common/components/ListItem";
import { useState } from "react";
import { classNames } from "utils/classNames";

type TListItemProps = {
  text: string;
  id: string;
  taskIndex: number;
};

export function TodayListItem({ text, id, taskIndex }: TListItemProps) {
  const duration = 0.4;

  const markCompleteVariants = {
    clicked: { pathLength: 1 },
    unclicked: { pathLength: 0 },
  };

  const [doneIsClicked, setDoneIsClicked] = useState(false);

  // const markDone = (id: string) => {
  //   const updatedTasks = {
  //     thisWeek: [...tasks.thisWeek],
  //     today: tasks.today.filter((task: any) => task.id !== id),
  //     done: [
  //       ...tasks.done,
  //       ...tasks.today.filter((task: any) => task.id === id),
  //     ],
  //   };

  //   setDoneIsClicked(true);
  //   setTasks(updatedTasks);
  // };

  // const moveToThisWeek = (id: string) => {
  //   const updatedTasks = {
  //     thisWeek: [
  //       ...tasks.thisWeek,
  //       ...tasks.today.filter((task: any) => task.id === id),
  //     ],
  //     today: tasks.today.filter((task: any) => task.id !== id),
  //     done: [...tasks.done],
  //   };

  //   setTasks(updatedTasks);
  // };

  // const deleteTask = (id: string) => {
  //   const updatedTasks = {
  //     thisWeek: [...tasks.thisWeek],
  //     today: tasks.today.filter((task: any) => task.id !== id),
  //     done: [...tasks.done],
  //   };

  //   setTasks(updatedTasks);
  // };

  return (
    <ListItem>
      <p className="absolute top-1/2 -left-5 text-sm text-gray-400 -translate-y-1/2">
        {taskIndex + 1}
      </p>
      <p>{text}</p>
      <div
        className={classNames(
          "absolute top-1/2 left-0 -translate-y-1/2",
          "flex px-3 w-full h-full items-center"
        )}
      >
        <svg
          version="1.1"
          id="line_2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="1200px"
          height="5px"
        >
          <motion.path
            fill="#01a09e"
            strokeWidth="6"
            stroke="#01a09e"
            d="M0 0 l1120 0"
            initial={false}
            animate={doneIsClicked ? "clicked" : "unclicked"}
            variants={markCompleteVariants}
            transition={{
              duration: duration,
            }}
          />
        </svg>
      </div>
      <div
        className={classNames(
          "absolute top-1/2 right-0 justify-end items-center gap-2 px-3 w-2/5 h-full  -translate-y-1/2",
          "hidden group-hover:flex group-hover:bg-gray-100"
        )}
      >
        <IconButton>
          <Check />
        </IconButton>
        <IconButton>
          <LeftArrow />
        </IconButton>
        <IconButton>
          <RightArrow />
        </IconButton>
        <IconButton>
          <Thrash />
        </IconButton>
      </div>
    </ListItem>
  );
}

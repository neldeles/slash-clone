import { motion } from "framer-motion";
import { IconButton } from "modules/_common/components/IconButton";
import {
  Check,
  LeftArrow,
  RightArrow,
  Thrash,
} from "modules/_common/components/Icons";
import { ListItem } from "modules/_common/components/ListItem";
import { useMarkTaskDone } from "modules/_common/hooks";
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
      <motion.div
        className={classNames(
          "absolute top-1/2 right-0 justify-end items-center gap-2 px-3 h-full -translate-y-1/2",
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
      </motion.div>
      <p className="absolute top-1/2 -left-5 text-sm text-gray-400 -translate-y-1/2">
        {taskIndex + 1}
      </p>
      <p>{text}</p>
    </ListItem>
  );
}

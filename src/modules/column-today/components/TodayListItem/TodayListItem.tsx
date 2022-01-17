import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  LeftArrow,
  RightArrow,
  Thrash,
} from "modules/_common/components/Icons";
import { useState } from "react";
import { classNames } from "utils/classNames";

type TListItemProps = {
  text: string;
  id: string;
  tasks: any;
  setTasks: any;
};

export function TodayListItem({ text, id, tasks, setTasks }: TListItemProps) {
  const duration = 0.4;

  const markCompleteVariants = {
    clicked: { pathLength: 1 },
    unclicked: { pathLength: 0 },
  };

  const iconVariants = {
    clicked: { y: [-2, 0] },
    unclicked: { y: 0 },
  };

  const listParentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.4,
        delay: duration - 0.2,
        // ease: [0.04, 0.62, 0.23, 0.98],
        ease: "anticipate",
      },
    },
  };

  const [doneIsClicked, setDoneIsClicked] = useState(false);

  const markDone = () => {
    const updatedTasks = {
      thisWeek: tasks.thisWeek.filter((task: any) => task.id !== id),
      today: [...tasks.today],
      done: [
        ...tasks.done,
        ...tasks.thisWeek.filter((task: any) => task.id === id),
      ],
    };

    setDoneIsClicked(true);
    setTasks(updatedTasks);
  };

  return (
    <motion.div
      className="group flex items-center"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={listParentVariants}
    >
      <p className="mr-2 text-sm text-gray-400">{id}</p>
      <li className="flex relative flex-auto p-3 w-full text-base font-medium tracking-normal list-none text-black bg-transparent hover:bg-gray-100 rounded-lg border border-transparent">
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
            "absolute top-1/2 right-0 justify-around items-center px-3 w-2/5 h-full  -translate-y-1/2",
            "hidden group-hover:flex group-hover:bg-gray-100"
          )}
        >
          <button
            className=" text-gray-300 hover:text-black align-middle"
            disabled={doneIsClicked}
            onClick={markDone}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                stroke="currentColor"
                d="M5 13l4 4L19 7"
                initial={false}
                animate={doneIsClicked ? "clicked" : "unclicked"}
                variants={iconVariants}
                transition={{ duration: duration }}
              />
            </svg>
          </button>
          <ButtonIcon onClick={markDone}>
            <LeftArrow />
          </ButtonIcon>
          <ButtonIcon onClick={markDone}>
            <RightArrow />
          </ButtonIcon>
          <ButtonIcon onClick={markDone}>
            <Thrash />
          </ButtonIcon>
        </div>
      </li>
    </motion.div>
  );
}

type TProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
};
function ButtonIcon(props: TProps) {
  const { children, ...buttonProps } = props;
  return (
    <button
      className="text-gray-300 hover:text-black align-middle"
      {...buttonProps}
    >
      {children}
    </button>
  );
}

import { motion } from "framer-motion";
import { LeftArrow, Thrash } from "modules/_common/components/Icons";
import { classNames } from "utils/classNames";

type TListItemProps = {
  text: string;
  id: string;
  tasks: any;
  setTasks: any;
};

export function DoneListItem({ text, id, tasks, setTasks }: TListItemProps) {
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

  const moveToPreviousColumn = (id: string) => {
    const updatedTasks = {
      thisWeek: [...tasks.thisWeek],
      today: [...tasks.today, tasks.done.filter((task: any) => task.id === id)],
      done: [...tasks.done.filter((task: any) => task.id !== id)],
    };

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
      <li className="flex relative flex-auto p-3 w-full text-base font-medium tracking-normal list-none text-black bg-transparent hover:bg-gray-100 rounded-lg border border-transparent">
        <p>{text}</p>
        <div
          className={classNames(
            "absolute top-1/2 right-0 items-center px-3 h-full -translate-y-1/2",
            "hidden group-hover:flex group-hover:bg-gray-100"
          )}
        >
          <button
            className="mr-2 text-gray-300 hover:text-black align-middle"
            onClick={() => moveToPreviousColumn(id)}
          >
            <LeftArrow />
          </button>
          <button className=" text-gray-300 hover:text-black align-middle">
            <Thrash />
          </button>
        </div>
      </li>
    </motion.div>
  );
}

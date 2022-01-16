import { motion } from "framer-motion";
import { Check, LeftArrow, RightArrow, Thrash } from "../Icons";

type TListItemProps = {
  text: string;
  id: string;
  displayIndex: boolean;
  tasks: any;
  setTasks: any;
};

const buttons = [
  {
    name: "mark complete",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    handleClick: () => console.log("mark complete"),
  },
  {
    name: "left arrow",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M11 17l-5-5m0 0l5-5m-5 5h12"
        />
      </svg>
    ),
    handleClick: () => console.log("left arrow"),
  },
  {
    name: "right arrow",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    ),
    handleClick: () => console.log("right arrow"),
  },
  {
    name: "delete",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    handleClick: () => console.log("delete"),
  },
];

export function ListItem({
  text,
  id,
  displayIndex,
  tasks,
  setTasks,
}: TListItemProps) {
  const markDone = () => {
    const updatedTasks = {
      thisWeek: tasks.thisWeek.filter((task: any) => task.id !== id),
      today: [...tasks.today],
      done: [
        ...tasks.done,
        tasks.thisWeek.filter((task: any) => task.id === id),
      ],
    };

    setTasks(updatedTasks);
  };

  return (
    <motion.div
      className="group flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
    >
      {displayIndex ? <p className="mr-2 text-sm text-gray-400">{id}</p> : null}
      <li className="flex relative flex-auto p-3 w-full text-base font-medium tracking-normal list-none text-black bg-transparent hover:bg-gray-100 active:bg-gray-200 rounded-lg border border-transparent">
        <p>{text}</p>
        <div className="hidden group-hover:flex absolute top-1/2 right-0 justify-around items-center px-3 w-2/5 h-full group-hover:bg-gray-100 -translate-y-1/2">
          {/* {buttons.map((button) => (
            <button
              key={button.name + id}
              className="text-gray-300 hover:text-black align-middle"
              onClick={button.handleClick}
            >
              {button.icon}
            </button>
          ))} */}
          <ButtonIcon onClick={markDone}>
            <Check />
          </ButtonIcon>
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

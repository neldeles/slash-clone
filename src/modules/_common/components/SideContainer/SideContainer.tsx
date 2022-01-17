import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { classNames } from "utils/classNames";

type TProps = {
  isActive: boolean;
  children: React.ReactNode;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export function SideContainer({ isActive, setIsActive, children }: TProps) {
  // !isActive here is just the initial value of our state
  const [toggleHover, setToggleHover] = useState(!isActive);

  /**
   * We add these effects to delay the effectivity of the group hover classes.
   * Without these, when the user clicks the X button, the gray hover background
   * will flicker briefly as the cursor is hovering over the div.
   *
   * useLayoutEffect for when the container expands to avoid the flicker as well.
   */
  useLayoutEffect(() => {
    if (isActive) {
      setToggleHover(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => setToggleHover(true), 200);
    }
  }, [isActive]);

  const containerVariants = {
    active: {
      flexGrow: 1,
    },
    inactive: {
      flexGrow: 0,
    },
  };

  if (toggleHover) {
    return (
      <motion.div
        onClick={() => {
          if (!isActive) {
            setIsActive(true);
          }
        }}
        className={classNames(
          "py-2 h-screen border-r border-gray-200 max-w-md",
          "group hover:cursor-pointer hover:bg-gray-200 transition-colors duration-75"
        )}
        variants={containerVariants}
        initial={false}
        animate={isActive ? "active" : "inactive"}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={() => {
        if (!isActive) {
          setIsActive(true);
        }
      }}
      className={classNames("py-2 h-screen border-r border-gray-200 max-w-md")}
      variants={containerVariants}
      initial={false}
      animate={isActive ? "active" : "inactive"}
    >
      {children}
    </motion.div>
  );
}

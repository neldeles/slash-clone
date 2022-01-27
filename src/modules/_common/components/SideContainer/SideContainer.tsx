import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { classNames } from "utils/classNames";

type TProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: any;
};
export function SideContainer({ isOpen, toggleOpen, children }: TProps) {
  // isOpen is just the initial value. If container is open,
  // we do not allow hover. If container is closed, we allow hover.
  const [allowHover, setAllowHover] = useState(!isOpen);

  const shouldReduceMotion = useReducedMotion();

  /**
   * We add these effects to delay the effectivity of the group hover classes.
   * Without these, when the user clicks the X button, the gray hover background
   * will flicker briefly as the cursor is hovering over the div.
   *
   * useLayoutEffect for when the container expands to avoid the flicker as well.
   */
  useLayoutEffect(() => {
    if (isOpen) {
      setAllowHover(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setAllowHover(true), 200);
    }
  }, [isOpen]);

  const containerVariants = {
    open: {
      flexBasis: "20%",
    },
    closed: {
      flexBasis: "10%",
    },
  };

  // if (!isOpen) {
  //   return (
  //     <motion.div
  //       onClick={toggleOpen}
  //       className={classNames(
  //         "py-2 h-screen border-r border-gray-200 max-w-[144px]",
  //         "group hover:cursor-pointer hover:bg-gray-200 "
  //       )}
  //       variants={containerVariants}
  //       animate="closed"
  //       transition={{
  //         type: "spring",
  //         stiffness: 20,
  //         restDelta: 2,
  //       }}
  //     >
  //       {children}
  //     </motion.div>
  //   );
  // }

  return (
    <motion.div
      onClick={isOpen ? null : toggleOpen}
      className={classNames(
        "py-2 h-screen border-r border-gray-200 grow-0 shrink-0 max-w-xs",
        allowHover ? "group hover:cursor-pointer hover:bg-gray-200" : null
      )}
      variants={shouldReduceMotion ? {} : containerVariants}
      animate={isOpen ? "open" : "closed"}
      transition={{
        type: "spring",
        stiffness: 80,
        restDelta: 2,
      }}
      // transition={{
      //   type: "tween",
      //   ease: "circOut",
      //   duration: 0.2,
      // }}
    >
      {children}
    </motion.div>
  );
}

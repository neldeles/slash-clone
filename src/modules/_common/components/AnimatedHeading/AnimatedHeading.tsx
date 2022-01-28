import { motion } from "framer-motion";
import { classNames } from "utils/classNames";

type TProps = {
  isOpen: boolean;
  id: string;
  children: string;
};

/**
 * Heading for side containers.
 * @param isOpen - Alters the CSS of the text depending on if container is open or not.
 * @param id - used for H1's `id` and `layoutId`
 */
export function AnimatedHeading({ isOpen, children, id }: TProps) {
  return (
    <motion.h1
      className={classNames(
        "font-medium tracking-wide",
        isOpen ? "mr-auto text-lg text-gray-500" : "text-base text-gray-300"
      )}
      id={id}
      layoutId={id}
      layoutDependency={isOpen}
    >
      {children}
    </motion.h1>
  );
}

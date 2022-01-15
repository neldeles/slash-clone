import { motion } from "framer-motion";
import { classNames } from "utils/classNames";

type TProps = {
  isActive: boolean;
  children: React.ReactNode;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ContainerThisWeek({ isActive, setIsActive, children }: TProps) {
  const containerVariants = {
    active: {
      flexGrow: 1,
    },
    inactive: {
      flexGrow: 0,
    },
  };

  return (
    <motion.div
      onClick={() => {
        if (!isActive) {
          setIsActive(true);
        }
      }}
      className={classNames(
        "py-2 px-8 h-screen border-r border-gray-200 group",
        isActive
          ? null
          : "hover:cursor-pointer hover:bg-gray-200 transition-colors duration-75"
      )}
      variants={containerVariants}
      initial={false}
      animate={isActive ? "active" : "inactive"}
    >
      {children}
    </motion.div>
  );
}

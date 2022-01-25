import { motion } from "framer-motion";
import { classNames } from "utils/classNames";

type TProps = {
  children: React.ReactNode;
};
export function Header({ children }: TProps) {
  return (
    <motion.div
      className={classNames("flex items-center mt-6 px-4")}
      variants={{
        open: { justifyContent: "space-between" },
        closed: { justifyContent: "center" },
      }}
    >
      {children}
    </motion.div>
  );
}

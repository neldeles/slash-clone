import { motion, Variants } from "framer-motion";

type TListItemProps = {
  children: React.ReactNode;
};

export function ListItem({ children }: TListItemProps) {
  const listParentVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        when: "afterChildren",
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    toRight: {
      x: [0, 500],
      transition: {
        duration: 0.4,
        ease: "backInOut",
      },
    },
  };

  return (
    <motion.li
      className="group flex relative flex-auto items-center p-3 w-full text-base font-medium tracking-normal list-none text-black bg-transparent hover:bg-gray-100 rounded-lg border border-transparent"
      initial="closed"
      animate="open"
      exit="exit"
      variants={listParentVariants}
      layout
    >
      {children}
    </motion.li>
  );
}

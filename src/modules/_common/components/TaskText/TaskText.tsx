import { motion, Variants } from "framer-motion";

type TProps = {
  isDone: boolean;
  text: string;
};

export function TaskText({ isDone, text }: TProps) {
  const markCompleteVariants: Variants = {
    exit: {
      color: "rgba(0,0,0,0)",
      textDecorationColor: "#01a09e",
      textDecorationThickness: "4px",
      textDecorationLine: "line-through",
      clipPath: "inset(0 0 0 0)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: { color: "rgba(0,0,0,1)" },
  };
  return (
    <motion.p variants={isDone ? markCompleteVariants : {}}>{text}</motion.p>
  );
}

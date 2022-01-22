import { motion } from "framer-motion";

export function MarkDone() {
  const markCompleteVariants = {
    exit: { pathLength: 1 },
    open: { pathLength: 0 },
  };

  return (
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
        variants={markCompleteVariants}
      />
    </svg>
  );
}

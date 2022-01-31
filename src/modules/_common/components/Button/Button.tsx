import { motion } from "framer-motion";

type TButtonProps = {
  label: string;
  id: string;
  onClick?: () => void;
};

export function Button({ id, onClick, label }: TButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="items-center py-3 px-6 w-full text-lg font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 shadow-sm"
      layoutId={id}
    >
      {label}
    </motion.button>
  );
}

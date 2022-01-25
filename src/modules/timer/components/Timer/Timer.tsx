import { motion } from "framer-motion";
import { Button } from "modules/_common/components/Button";
import { Link } from "react-router-dom";

export function Timer() {
  return (
    <motion.div
      className="flex flex-col justify-center items-center space-y-6 h-screen"
      // initial={{ scaleY: 0 }}
      // animate={{ scaleY: 1 }}
      // exit={{ scaleY: 0 }}
      // transition={{ duration: 0.5 }}
    >
      <p className="p-3 w-[40vw] max-w-2xl text-4xl font-medium tracking-normal text-center text-black bg-gray-200 hover:bg-gray-100 rounded-lg border border-gray-200">
        what happens when i add a really super duper long task that is very hard
        to fine and fit and then now what is it gonna is ther ea charachter
      </p>
      <p className="p-8 w-[40vw] max-w-2xl text-8xl font-medium text-center text-black bg-white rounded-xl border border-gray-200">
        25:00
      </p>
      <Link to="/" className="w-[40vw] max-w-2xl">
        <Button
          label="stop slashing"
          id="start-slashing"
          onClick={() => console.log("slash")}
        />
      </Link>
    </motion.div>
  );
}

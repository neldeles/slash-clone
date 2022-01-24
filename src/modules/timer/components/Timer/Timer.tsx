import { motion } from "framer-motion";
import { Button } from "modules/_common/components/Button";
import { Link } from "react-router-dom";

export function Timer() {
  return (
    <motion.div
    // initial={{ scaleY: 0 }}
    // animate={{ scaleY: 1 }}
    // exit={{ scaleY: 0 }}
    // transition={{ duration: 0.5 }}
    >
      <h1>Timer</h1>
      <Link to="/">Main</Link>
      <Button
        label="stop slashing"
        id="start-slashing"
        onClick={() => console.log("slash")}
      />
    </motion.div>
  );
}

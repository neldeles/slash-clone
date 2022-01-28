import React from "react";
import { classNames } from "utils/classNames";
import { motion } from "framer-motion";

// Simpler version of the Switch motion component using layout animation
const Switch2 = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div
      onClick={() => setActive((prev) => !prev)}
      className={classNames(
        "flex justify-start w-12 h-7 bg-black rounded-2xl",
        active ? "justify-end bg-indigo-100" : null
      )}
    >
      <motion.div className="w-7 h-7 bg-white rounded-full"></motion.div>
    </div>
  );
};

export const Component = () => (
  <div style={{ maxWidth: "300px" }}>
    Switch 2: Animating justify-content using layout animation and the layout
    prop.
    <Switch2 />
  </div>
);

/* eslint-disable react/display-name */
import { CustomDomComponent } from "framer-motion/types/render/dom/motion-proxy";
import { DOMMotionComponents } from "framer-motion/types/render/dom/types";
import React from "react";

const actual = jest.requireActual("framer-motion");

// https://github.com/framer/motion/blob/main/src/render/dom/motion.ts
function custom<Props>(
  Component: string | React.ComponentType<Props>
): CustomDomComponent<Props> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return React.forwardRef((props, ref) => {
    // do not pass framer props to DOM element
    const regularProps = Object.entries(props).reduce((acc, [key, value]) => {
      // @ts-ignore
      if (!actual.isValidMotionProp(key)) acc[key] = value;
      return acc;
    }, {});

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component ref={ref} {...regularProps} />;
  });
}

const componentCache = new Map<string, any>();
const motion = new Proxy(custom, {
  get: (_target, key: string) => {
    if (!componentCache.has(key)) {
      componentCache.set(key, custom(key));
    }

    return componentCache.get(key)!;
  },
}) as typeof custom & DOMMotionComponents;

module.exports = {
  ...actual,
  AnimatePresence: ({ children }: { children: React.ReactChildren }) => (
    <>{children}</>
  ),
  motion,
};

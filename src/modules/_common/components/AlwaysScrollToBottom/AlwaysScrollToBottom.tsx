import { useEffect, useLayoutEffect, useRef } from "react";

// Utility component that scrolls the container
// to the bottom
export const AlwaysScrollToBottom = (dep: any) => {
  const elementRef = useRef<HTMLDivElement>(null!);
  useLayoutEffect(() => {
    elementRef.current.scrollIntoView();
  }, [dep]);
  return <div ref={elementRef} />;
};

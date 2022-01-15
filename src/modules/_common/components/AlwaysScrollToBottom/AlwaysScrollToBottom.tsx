import { useEffect, useRef } from "react";

// Utility component that scrolls the container
// to the bottom
export const AlwaysScrollToBottom = (dep: any) => {
  const elementRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    elementRef.current.scrollIntoView();
  }, [dep]);
  return <div ref={elementRef} />;
};

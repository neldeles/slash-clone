import { useLayoutEffect, useRef, useState } from "react";

// Utility component that scrolls the container
// to the bottom
export const AlwaysScrollToBottom = ({
  currentListLength,
}: {
  currentListLength: number;
}) => {
  // Store the last list length in state
  // so we can compare current length with last length.
  // Only scroll to bottom if we added an item to the list.
  const [listLength, setListLength] = useState(currentListLength);
  const elementRef = useRef<HTMLDivElement>(null!);
  useLayoutEffect(() => {
    if (currentListLength > listLength) {
      elementRef.current.scrollIntoView();
    }
    setListLength(currentListLength);
  }, [currentListLength, listLength]);
  return <div ref={elementRef} />;
};

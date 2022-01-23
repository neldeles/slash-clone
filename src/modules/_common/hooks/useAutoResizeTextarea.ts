import { useLayoutEffect, useRef } from "react";
import { TTask } from "../types/tasks";

export function useAutoResizeTextarea(
  tasks: TTask[],
  isContainerOpen: boolean
) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [tasks, isContainerOpen]);

  return textareaRef;
}

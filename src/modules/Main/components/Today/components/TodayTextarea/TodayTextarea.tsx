import { motion } from "framer-motion";
import { MutableRefObject, SetStateAction } from "react";

type TTextareaProps = {
  newTaskToday: string;
  setNewTaskToday: (value: SetStateAction<string>) => void;
  addTaskToday: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  todayRef: MutableRefObject<HTMLTextAreaElement | null>;
  placeholder: string;
};

export function TodayTextarea({
  newTaskToday,
  setNewTaskToday,
  addTaskToday,
  todayRef,
  placeholder,
}: TTextareaProps) {
  return (
    <motion.textarea
      id="addToday"
      name="Add task Today"
      aria-label="add task today"
      maxLength={140}
      className="py-2 w-full max-h-full text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-x-0 border-t-0 border-b-2 focus:border-b-black focus:outline-none focus:ring-0 resize-none"
      placeholder={placeholder}
      value={newTaskToday}
      onChange={(e) => setNewTaskToday(e.target.value)}
      onKeyPress={addTaskToday}
      ref={todayRef}
    />
  );
}

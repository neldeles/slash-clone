import React, { useEffect, useMemo } from "react";
import {
  TStatus,
  TTask,
  TTaskDone,
  TTaskThisWeek,
  TTaskToday,
} from "modules/_common/types/tasks";
import { useQuery } from "react-query";
import { tasksService } from "modules/_common/services/tasks-service";
import { ThisWeek } from "modules/column-this-week/components/ThisWeek";
import { Done } from "modules/column-done/components/Done";
import { Today } from "modules/column-today/components/Today";
import { motion } from "framer-motion";

export function Main() {
  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  useEffect(function setBackgroundColor() {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);

  const tasksThisWeek = sortByPriority(
    filterTasks(tasksData, "thisWeek"),
    "asc"
  ) as TTaskThisWeek[];
  const tasksToday = sortByPriority(
    filterTasks(tasksData, "today"),
    "asc"
  ) as TTaskToday[];
  const tasksDone = filterTasks(tasksData, "done").sort(
    sortByDoneDate
  ) as TTaskDone[];

  if (tasksQuery.isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <motion.div
      className="flex"
      // initial={{ scaleY: 0 }}
      // animate={{ scaleY: 1 }}
      // exit={{ scaleY: 0 }}
      // transition={{ duration: 0.5 }}
    >
      <ThisWeek tasksData={tasksData} tasksThisWeek={tasksThisWeek} />

      <Today tasksData={tasksData} tasksToday={tasksToday} />

      <Done tasksDone={tasksDone} />
    </motion.div>
  );
}

function filterTasks(tasks: TTask[], status: TStatus) {
  return tasks.filter((task: TTask) => task.status === status);
}

function sortByPriority(arr: TTask[], orderBy: "asc" | "desc") {
  if (orderBy === "asc") {
    return arr.sort(function (a, b) {
      return a.priority! - b.priority!;
    });
  }

  return arr.sort(function (a, b) {
    return b.priority! - a.priority!;
  });
}

function sortByDoneDate(a: TTask, b: TTask) {
  const dateA = new Date(a.date_done!).getTime();
  const dateB = new Date(b.date_done!).getTime();
  return dateA > dateB ? 1 : -1;
}

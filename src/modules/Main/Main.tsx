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
import { ThisWeek } from "modules/Main/components/ThisWeek";
import { Done } from "modules/Main/components/Done";
import { Today } from "modules/Main/components/Today";
import { motion } from "framer-motion";
import { sortByAscPriority } from "modules/_common/utils/sortByPriority";
import { sortByDoneDate } from "modules/_common/utils/sortByDoneDate";

export function Main() {
  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  const tasksThisWeek = filterTasks(tasksData, "thisWeek").sort(
    sortByAscPriority
  ) as TTaskThisWeek[];
  const tasksToday = filterTasks(tasksData, "today").sort(
    sortByAscPriority
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
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
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

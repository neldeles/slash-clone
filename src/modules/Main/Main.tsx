import React, { useMemo } from "react";
import {
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
import { authService } from "modules/_common/services/auth-service";

export function Main() {
  const tasksQuery = useQuery(["tasks"], () => tasksService.getAll());
  const tasksData = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  const tasksThisWeek: TTaskThisWeek[] = tasksData
    .filter(isTaskThisWeek)
    .sort(sortByAscPriority);
  const tasksToday: TTaskToday[] = tasksData
    .filter(isTaskToday)
    .sort(sortByAscPriority);
  const tasksDone: TTaskDone[] = tasksData
    .filter(isTaskDone)
    .sort(sortByDoneDate);

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

function isTaskThisWeek(task: TTask): task is TTaskThisWeek {
  return (task as TTaskThisWeek).status === "THIS_WEEK";
}

function isTaskToday(task: TTask): task is TTaskToday {
  return (task as TTaskToday).status === "TODAY";
}

function isTaskDone(task: TTask): task is TTaskDone {
  return (task as TTaskDone).status === "DONE";
}

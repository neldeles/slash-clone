import { TNewTask, TTask } from "modules/_common/types/tasks";
import { rest } from "msw";
import { db } from "./db";

export const handlers = [
  // fetch all tasks
  rest.get("/tasks", (req, res, ctx) => {
    const tasks = db.task.getAll();

    return res(ctx.json(tasks));
  }),
  // create a new task
  rest.post<TNewTask>("/task", (req, res, ctx) => {
    const { task, status } = req.body;

    db.task.create({ task, status });

    return res(ctx.status(201));
  }),
  // delete a task
  rest.delete("/task/:id", (req, res, ctx) => {
    const taskId = req.params.id;
    db.task.delete({
      where: {
        id: {
          equals: taskId,
        },
      },
    });

    return res(ctx.status(204));
  }),
  // update status of a task
  rest.put<TTask>("/task/status/:id", (req, res, ctx) => {
    const taskId = req.params.id;
    const task = req.body;

    // Make lowest priority in Today list so it's rendered
    // at the bottom of the list.
    const tasksInTodayList = db.task.findMany({
      where: {
        status: {
          equals: "today",
        },
      },
    });

    // task.priority will never be null for status "thisWeek" | "today"
    const priorities = tasksInTodayList.map((task) => task.priority!);
    const largestPriority = Math.max(...priorities);

    db.task.update({
      where: {
        id: {
          equals: taskId,
        },
      },
      data: {
        ...task,
        priority: largestPriority + 1,
      },
    });

    return res(ctx.status(204));
  }),
];

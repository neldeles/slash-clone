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

    const tasksInList = db.task.findMany({
      where: {
        status: {
          equals: status,
        },
      },
    });

    // task.priority will never be null for status "thisWeek" | "today"
    const priorities = tasksInList.map((task) => task.priority!);
    const largestPriority = priorities.length ? Math.max(...priorities) : 0;

    db.task.create({
      task,
      status,
      priority: largestPriority + 1,
    });

    return res(ctx.status(201));
  }),
  // delete a task
  rest.delete("/task/:id", (req, res, ctx) => {
    const taskId = req.params.id as string;
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
    const taskId = req.params.id as string;
    const task = req.body;

    // Separate task.status === done flow because done tasks
    // have no priority i.e. null
    if (task.status === "thisWeek" || task.status === "today") {
      const tasksInList = db.task.findMany({
        where: {
          status: {
            equals: task.status,
          },
        },
      });

      // task.priority will never be null for status "thisWeek" | "today"
      const priorities = tasksInList.map((task) => task.priority!);
      const largestPriority = priorities.length ? Math.max(...priorities) : 0;

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
    }

    if (task.status === "done") {
      db.task.update({
        where: {
          id: {
            equals: taskId,
          },
        },
        data: {
          ...task,
        },
      });
    }

    return res(ctx.status(204));
  }),
];

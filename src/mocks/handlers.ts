import { TNewTask, TTask, TUpdateTask } from "modules/_common/types/tasks";
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
  // update a task
  rest.put<TTask>("/task/:id", (req, res, ctx) => {
    const taskId = req.params.id;
    const task = req.body;
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

    return res(ctx.status(204));
  }),
];

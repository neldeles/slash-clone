import { TNewTask } from "modules/_common/types/tasks";
import { rest } from "msw";
import { db } from "./db";

export const handlers = [
  // fetch all tasks
  rest.get("/tasks", (req, res, ctx) => {
    const tasks = db.task.getAll();

    console.log(tasks);
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
    console.log(taskId);
    db.task.delete({
      where: {
        id: {
          equals: taskId,
        },
      },
    });

    return res(ctx.status(204));
  }),
];

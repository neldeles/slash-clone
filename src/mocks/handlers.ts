import { TNewTask, TTask } from "modules/_common/types/tasks";
import { rest } from "msw";
import { db } from "./db";
import { api } from "modules/_common/api";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const handlers = [
  // fetch all tasks
  rest.get(api.tasks.list, (req, res, ctx) => {
    const tasks = db.task.getAll();

    return res(ctx.json(tasks));
  }),
  // create a new task
  rest.post<TNewTask>(api.tasks.create, (req, res, ctx) => {
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
  rest.delete(`${baseURL}/tasks/delete/:id/`, (req, res, ctx) => {
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
  rest.put<TTask>(`${baseURL}/tasks/update/:id/`, (req, res, ctx) => {
    const taskId = req.params.id as string;
    const task = req.body;

    // Separate task.status === done flow because done tasks
    // have no priority i.e. null.
    if (task.status === "THIS_WEEK" || task.status === "TODAY") {
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
          // For the scenario of moving from Done to Today or This Week
          date_done: null,
        },
      });
    }

    if (task.status === "DONE") {
      db.task.update({
        where: {
          id: {
            equals: taskId,
          },
        },
        data: {
          ...task,
          date_done: new Date().toISOString(),
        },
      });
    }

    return res(ctx.status(204));
  }),
];

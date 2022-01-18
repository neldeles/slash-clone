import { rest } from "msw";
import { db, status } from "./db";

export const handlers = [
  // fetch all tasks
  rest.get("/tasks", (req, res, ctx) => {
    const tasks = [];
    for (let i = 0; i < 10; i++) {
      tasks.push(
        db.task.create({
          status: status.thisWeek,
        })
      );
    }
    console.log(tasks);
    return res(ctx.status(201));
  }),
];

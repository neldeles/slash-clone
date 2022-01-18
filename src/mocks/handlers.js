import { rest } from "msw";

export const handlers = [
  // fetch all tasks
  rest.get("/tasks", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];

// src/mocks/db.js
import { seed, randUuid, randText, randNumber } from "@ngneat/falso";
import { factory, primaryKey, nullable } from "@mswjs/data";
import { format } from "date-fns";

seed("some-constant-seed");
const randomCharCount = randNumber({ min: 1, max: 140 });

export const db = factory({
  status: {
    id: primaryKey(Number),
    type: String,
  },
  task: {
    id: primaryKey(randUuid),
    task: () => randText({ charCount: randomCharCount }),
    status: String,
    priority: nullable(Number),
    date_done: nullable<string>(() => null),
    user_id: () => "1",
  },
});

export const status = {
  thisWeek: db.status.create({ id: 1, type: "THIS_WEEK" }),
  today: db.status.create({ id: 2, type: "TODAY" }),
  done: db.status.create({ id: 3, type: "DONE" }),
};

for (let i = 0; i < 2; i++) {
  db.task.create({
    status: status.thisWeek.type,
    priority: i + 1,
  });
  db.task.create({
    status: status.today.type,
    priority: i + 1,
  });
  db.task.create({
    status: status.done.type,
    date_done: new Date().toISOString(),
  });
}

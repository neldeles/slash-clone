// src/mocks/db.js
import { seed, datatype, lorem } from "@faker-js/faker";
import { factory, primaryKey, oneOf } from "@mswjs/data";

seed(123);

export const db = factory({
  status: {
    id: primaryKey(Number),
    type: String,
  },
  tasks: {
    id: primaryKey(datatype.uuid),
    task: lorem.sentence,
    status: oneOf("status"),
    user_id: datatype.uuid,
  },
});

export const status = {
  thisWeek: db.status.create({ id: 0, type: "thisWeek" }),
  today: db.status.create({ id: 1, type: "today" }),
  done: db.status.create({ id: 2, type: "done" }),
};

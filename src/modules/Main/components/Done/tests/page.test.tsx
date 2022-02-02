import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "App";
import { renderWithProviders } from "utils/tests/render-with-providers";
import { db } from "mocks/db";
import { setScrollIntoView } from "modules/_common/utils/tests/set-scroll-into-view";
import { randText, randRecentDate, randNumber } from "@ngneat/falso";

function createTasks() {
  const doneTaskCount = randNumber({ min: 1, max: 30 });
  for (let i = 0; i < doneTaskCount; i++) {
    db.task.create({
      task: randText(),
      status: "done",
      date_done: randRecentDate({ days: 10 }).toISOString(),
    });
  }
}
test("groups the tasks by done date descending order", async () => {
  setScrollIntoView();

  const firstTask = randText();
  const secondTask = randText();
  const thirdTask = randText();

  db.task.create({
    task: firstTask,
    status: "done",
    date_done: new Date("2022, 01, 05").toISOString(),
  });

  db.task.create({
    task: secondTask,
    status: "done",
    date_done: new Date("2022, 01, 04").toISOString(),
  });

  db.task.create({
    task: thirdTask,
    status: "done",
    date_done: new Date("2022, 01, 03").toISOString(),
  });

  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  const doneList = screen.getByRole("list", { name: /done/i });

  const headingsDescending = screen.getAllByRole("heading", {
    name: /date heading/i,
  });

  const tasksDescending = within(doneList).getAllByRole("listitem");

  expect(headingsDescending[0]).toHaveTextContent("WED JAN 05 2022");
  expect(headingsDescending[1]).toHaveTextContent("TUE JAN 04 2022");
  expect(headingsDescending[2]).toHaveTextContent("MON JAN 03 2022");

  expect(tasksDescending[0]).toHaveTextContent(firstTask);
  expect(tasksDescending[1]).toHaveTextContent(secondTask);
  expect(tasksDescending[2]).toHaveTextContent(thirdTask);
});

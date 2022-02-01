import { renderWithProviders } from "utils/tests/render-with-providers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { db } from "mocks/db";
import App from "App";
import { randText, randNumber } from "@ngneat/falso";

function createTasks() {
  const thisWeekTaskCount = randNumber({ min: 1, max: 30 });
  const todayTaskCount = randNumber({ min: 1, max: 30 });
  const doneTaskCount = randNumber({ min: 1, max: 30 });
  for (let i = 0; i < thisWeekTaskCount; i++) {
    db.task.create({ task: randText(), status: "thisWeek", priority: i + 1 });
  }

  for (let i = 0; i < todayTaskCount; i++) {
    db.task.create({ task: randText(), status: "today", priority: i + 1 });
  }

  for (let i = 0; i < doneTaskCount; i++) {
    db.task.create({ task: randText(), status: "done" });
  }
  return {
    thisWeekTaskCount,
    todayTaskCount,
    doneTaskCount,
  };
}

async function setupCacheAndRender() {
  renderWithProviders(<App />, { route: "/timer/work" });
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  // The first task is marked as done.
  userEvent.click(screen.getByRole("button", { name: /mark done/i }));

  return null;
}

test("progress bar increments correctly", async () => {
  const { doneTaskCount, thisWeekTaskCount, todayTaskCount } = createTasks();

  const totalTasks = doneTaskCount + thisWeekTaskCount + todayTaskCount;
  const updatedDoneTaskCount = doneTaskCount + 1;
  const percentDone = Math.floor((updatedDoneTaskCount / totalTasks) * 100);

  renderWithProviders(<App />, {
    route: {
      pathname: "/timer/work",
    },
  });
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  userEvent.click(screen.getByRole("button", { name: /mark done/i }));

  await waitFor(() => {
    expect(
      screen.getByText(`${updatedDoneTaskCount} of ${totalTasks} done`)
    ).toBeInTheDocument();
  });

  expect(screen.getByText(`${percentDone}%`)).toBeInTheDocument();
});

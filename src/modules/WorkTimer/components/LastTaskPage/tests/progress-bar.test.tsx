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
import { format, subWeeks } from "date-fns";

function createTasks() {
  const thisWeekTaskCount = randNumber({ min: 1, max: 10 });
  // this should be 1 so it navigates to LastTaskPage when completed
  const todayTaskCount = 1;
  const doneTodayTaskCount = randNumber({ min: 1, max: 10 });
  const doneLastWeekTaskCount = randNumber({ min: 1, max: 10 });
  for (let i = 0; i < thisWeekTaskCount; i++) {
    db.task.create({ task: randText(), status: "thisWeek", priority: i + 1 });
  }

  for (let i = 0; i < todayTaskCount; i++) {
    db.task.create({ task: randText(), status: "today", priority: i + 1 });
  }

  for (let i = 0; i < doneTodayTaskCount; i++) {
    db.task.create({
      task: randText(),
      status: "done",
      date_done: format(new Date(), "yyyy-MM-dd"),
    });
  }

  for (let i = 0; i < doneLastWeekTaskCount; i++) {
    db.task.create({
      task: randText(),
      status: "done",
      date_done: format(subWeeks(new Date(), 1), "yyyy-MM-dd"),
    });
  }
  return {
    thisWeekTaskCount,
    todayTaskCount,
    doneTodayTaskCount,
    doneLastWeekTaskCount,
  };
}

test("progress bar correctly calculates tasks done this week over tasks in the week", async () => {
  const { doneTodayTaskCount, thisWeekTaskCount, todayTaskCount } =
    createTasks();

  const totalTasks = doneTodayTaskCount + thisWeekTaskCount + todayTaskCount;
  const updatedDoneTaskCount = doneTodayTaskCount + 1;
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

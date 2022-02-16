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
import { format } from "date-fns";
import { AuthenticatedApp } from "AuthenticatedApp";
import { models } from "modules/_common/db/constants";

function createTasks() {
  const thisWeekTaskCount = randNumber({ min: 1, max: 10 });
  const todayTaskCount = randNumber({ min: 1, max: 10 });
  const doneTodayTaskCount = randNumber({ min: 1, max: 10 });
  for (let i = 0; i < thisWeekTaskCount; i++) {
    db.task.create({
      task: randText(),
      status: models.task.STATUS.thisWeek,
      priority: i + 1,
    });
  }

  for (let i = 0; i < todayTaskCount; i++) {
    db.task.create({
      task: randText(),
      status: models.task.STATUS.today,
      priority: i + 1,
    });
  }

  for (let i = 0; i < doneTodayTaskCount; i++) {
    db.task.create({
      task: randText(),
      status: models.task.STATUS.done,
      date_done: format(new Date(), "yyyy-MM-dd"),
    });
  }

  return {
    thisWeekTaskCount,
    todayTaskCount,
    doneTodayTaskCount,
  };
}

test("progress bar increments correctly", async () => {
  const { doneTodayTaskCount, todayTaskCount } = createTasks();

  const totalTasksToday = doneTodayTaskCount + todayTaskCount;
  const updatedDoneTaskCount = doneTodayTaskCount + 1;
  const percentDone = Math.floor(
    (updatedDoneTaskCount / totalTasksToday) * 100
  );

  renderWithProviders(<AuthenticatedApp />, {
    route: {
      pathname: "/timer/work",
    },
  });
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  userEvent.click(screen.getByRole("button", { name: /mark done/i }));

  await waitFor(() => {
    expect(
      screen.getByText(`${updatedDoneTaskCount} of ${totalTasksToday} done`)
    ).toBeInTheDocument();
  });

  expect(screen.getByText(`${percentDone}%`)).toBeInTheDocument();
});

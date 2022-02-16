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
import { AuthenticatedApp } from "AuthenticatedApp";
import { models } from "modules/_common/db/constants";

test("moves a task from This Week column to the bottom of Today column", async () => {
  setScrollIntoView();

  const task = "move to Today";
  db.task.create({
    task: task,
    status: models.task.STATUS.thisWeek,
    priority: 1,
  });
  db.task.create({
    task: "First Item",
    status: models.task.STATUS.today,
    priority: 1,
  });
  db.task.create({
    task: "Second Item",
    status: models.task.STATUS.today,
    priority: 2,
  });

  renderWithProviders(<AuthenticatedApp />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(await screen.findByRole("button", { name: /move-right/i }));
  const thisWeekList = await screen.findByRole("list", { name: /this week/i });
  const todayList = screen.getByRole("list", { name: /today/i });
  await waitFor(() => {
    expect(thisWeekList).not.toHaveTextContent(task);
  });
  await waitFor(() => {
    expect(todayList).toHaveTextContent(task);
  });
  const todayListItems = within(todayList).getAllByRole("listitem");
  expect(todayListItems[todayListItems.length - 1]).toHaveTextContent(task);
});

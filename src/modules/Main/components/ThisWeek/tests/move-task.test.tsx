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

test("moves a task from This Week column to the bottom of Today column", async () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};

  const task = "move to Today";
  db.task.create({ task: task, status: "thisWeek", priority: 1 });
  db.task.create({ task: "First Item", status: "today", priority: 1 });
  db.task.create({ task: "Second Item", status: "today", priority: 2 });

  renderWithProviders(<App />);
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

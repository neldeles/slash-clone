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

test("moves a task from Today column to the bottom of This Week column", async () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};

  const task = "move to This Week";
  db.task.create({ task: task, status: "today", priority: 1 });
  db.task.create({ task: "First Item", status: "thisWeek", priority: 1 });
  db.task.create({ task: "Second Item", status: "thisWeek", priority: 2 });

  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(
    await screen.findByRole("button", {
      name: /move task in Today to This Week/i,
    })
  );
  const thisWeekList = await screen.findByRole("list", { name: /this week/i });
  const todayList = screen.getByRole("list", { name: /today/i });
  await waitFor(() => {
    expect(todayList).not.toHaveTextContent(task);
  });
  await waitFor(() => {
    expect(thisWeekList).toHaveTextContent(task);
  });
  const thisWeekListItems = within(thisWeekList).getAllByRole("listitem");
  expect(thisWeekListItems[thisWeekListItems.length - 1]).toHaveTextContent(
    task
  );
});

test("clicking right arrow button moves a task from Today column to the Done column", async () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};

  const task = "move to Done";
  db.task.create({ task: task, status: "today", priority: 1 });

  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(screen.getByRole("heading", { name: /done/i }));
  userEvent.click(
    await screen.findByRole("button", { name: /move task in Today to Done/i })
  );
  const thisWeekList = await screen.findByRole("list", { name: /today/i });
  const doneList = screen.getByRole("list", { name: /done/i });
  await waitFor(() => {
    expect(thisWeekList).not.toHaveTextContent(task);
  });
  await waitFor(() => {
    expect(doneList).toHaveTextContent(task);
  });
});

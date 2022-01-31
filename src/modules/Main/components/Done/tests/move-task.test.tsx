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

test("moves a task from Done column to the bottom of Today column", async () => {
  setScrollIntoView();

  const task = "move to Today";
  db.task.create({ task: task, status: "done", priority: 1 });
  db.task.create({ task: "First Item", status: "today", priority: 1 });
  db.task.create({ task: "Second Item", status: "today", priority: 2 });

  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(
    await screen.findByRole("button", { name: /move done task to today/i })
  );
  const doneList = await screen.findByRole("list", { name: /done/i });
  const todayList = screen.getByRole("list", { name: /today/i });
  await waitFor(() => {
    expect(doneList).not.toHaveTextContent(task);
  });
  await waitFor(() => {
    expect(todayList).toHaveTextContent(task);
  });
  const todayListItems = within(todayList).getAllByRole("listitem");
  expect(todayListItems[todayListItems.length - 1]).toHaveTextContent(task);
});

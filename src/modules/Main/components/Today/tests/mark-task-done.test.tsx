import {
  act,
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
import { waitForAnimation } from "modules/_common/utils/tests/waitForAnimation";

test("moves a task from Today column to the Done column", async () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};

  const task = "move to Done";
  db.task.create({ task: task, status: "today", priority: 1 });

  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(screen.getByRole("button", { name: /mark-done-today/i }));

  await waitForAnimation();
  const doneList = screen.getByRole("list", { name: /done/i });
  const todayList = screen.getByRole("list", { name: /today/i });

  expect(within(doneList).getByText(task)).toHaveTextContent(task);
  expect(within(todayList).queryByText(task)).not.toBeInTheDocument();
});

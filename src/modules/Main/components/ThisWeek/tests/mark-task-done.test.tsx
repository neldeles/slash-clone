import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "App";
import { renderWithProviders } from "utils/tests/render-with-providers";
import { db } from "mocks/db";
import { setScrollIntoView } from "modules/_common/utils/tests/set-scroll-into-view";
import { AuthenticatedApp } from "AuthenticatedApp";
import { models } from "modules/_common/db/constants";

async function waitForAnimation() {
  await act(() => new Promise((r) => setTimeout(r, 2000)));
}

test("moves a task from This Week column to the Done column", async () => {
  setScrollIntoView();

  const task = "move to Done";
  db.task.create({
    task: task,
    status: models.task.STATUS.thisWeek,
    priority: 1,
  });

  renderWithProviders(<AuthenticatedApp />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(screen.getByRole("button", { name: /mark-done/i }));

  await waitForAnimation();
  expect(screen.getByRole("list", { name: /done/i })).toHaveTextContent(task);
  expect(
    screen.queryByRole("list", { name: /this week/i })
  ).not.toHaveTextContent(task);
});

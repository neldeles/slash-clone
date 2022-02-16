import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "App";
import { renderWithProviders } from "utils/tests/render-with-providers";
import { db } from "mocks/db";
import { setScrollIntoView } from "modules/_common/utils/tests/set-scroll-into-view";
import { AuthenticatedApp } from "AuthenticatedApp";
import { models } from "modules/_common/db/constants";

test("deletes a task from Done column", async () => {
  setScrollIntoView();

  const task = "task to be deleted";
  db.task.create({
    task: task,
    status: models.task.STATUS.done,
    date_done: new Date().toISOString(),
  });

  renderWithProviders(<AuthenticatedApp />);

  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(
    await screen.findByRole("button", { name: /delete done task/i })
  );
  await waitFor(() => {
    expect(screen.queryByText(task)).not.toBeInTheDocument();
  });
});

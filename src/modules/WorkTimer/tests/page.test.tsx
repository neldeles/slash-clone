import { renderWithProviders } from "utils/tests/render-with-providers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { db } from "mocks/db";
import { AuthenticatedApp } from "AuthenticatedApp";

function createTodayTask(taskText: string[]) {
  for (let i = 0; i < taskText.length; i++) {
    db.task.create({ task: taskText[i], status: "TODAY", priority: i + 1 });
  }
  return null;
}

test("that app redirects to work timer when Start Slashing button is clicked", async () => {
  const task = "this is the last task";
  createTodayTask([task]);
  renderWithProviders(<AuthenticatedApp />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  userEvent.click(screen.getByRole("link", { name: /start slashing/i }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });
});

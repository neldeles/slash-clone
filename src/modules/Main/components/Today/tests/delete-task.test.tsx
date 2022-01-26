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

test("deletes a task from Today column", async () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};

  const task = "task to be deleted";
  db.task.create({ task: task, status: "today" });

  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  userEvent.click(
    await screen.findByRole("button", { name: /delete task in today/i })
  );
  await waitFor(() => {
    expect(screen.queryByText(task)).not.toBeInTheDocument();
  });
});

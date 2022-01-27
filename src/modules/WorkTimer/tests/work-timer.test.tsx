import { renderWithProviders } from "utils/tests/render-with-providers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { db } from "mocks/db";
import { waitForAnimation } from "modules/_common/utils/tests/waitForAnimation";
import { WorkTimer } from "..";
import App from "App";

test("that app redirects to work timer when Start Slashing button is clicked", async () => {
  const task = "this is the last task";
  db.task.create({ task: task, status: "today", priority: 1 });
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  userEvent.click(screen.getByRole("button", { name: /start slashing/i }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });
});

test("that next button is disabled if there is only one task left in Today", async () => {
  const task = "button is disabled";
  db.task.create({ task: task, status: "today", priority: 1 });
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  userEvent.click(screen.getByRole("button", { name: /start slashing/i }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /skip task/i })).toBeDisabled();
  });
});

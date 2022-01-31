import { renderWithProviders } from "utils/tests/render-with-providers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { db } from "mocks/db";
import App from "App";
import { randText } from "@ngneat/falso";

function createTodayTask(taskText: string[]) {
  for (let i = 0; i < taskText.length; i++) {
    db.task.create({ task: taskText[i], status: "today", priority: i + 1 });
  }
  return null;
}

test("that next button is disabled if there is only one task left in Today", async () => {
  const task = "button is disabled";
  createTodayTask([task]);
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  userEvent.click(screen.getByRole("link", { name: /start slashing/i }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /skip task/i })).toBeDisabled();
  });
});

describe("when I click the skip task button", () => {
  it("skips to next task", async () => {
    const firstTask = randText();
    const secondTask = randText();
    createTodayTask([firstTask, secondTask]);

    renderWithProviders(<App />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(screen.getByText(firstTask)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /skip task/i }));
    expect(screen.queryByText(firstTask)).not.toBeInTheDocument();
    expect(screen.getByText(secondTask)).toBeInTheDocument();
  });

  it("cycles back to first task if active task is the last task in list", async () => {
    const firstTask = randText();
    const secondTask = randText();
    createTodayTask([firstTask, secondTask]);

    renderWithProviders(<App />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    userEvent.click(screen.getByRole("button", { name: /skip task/i }));
    expect(screen.getByText(secondTask)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /skip task/i }));
    expect(screen.queryByText(secondTask)).not.toBeInTheDocument();
    expect(screen.getByText(firstTask)).toBeInTheDocument();
  });
});

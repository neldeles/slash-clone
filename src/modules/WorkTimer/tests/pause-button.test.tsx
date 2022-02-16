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
import { AuthenticatedApp } from "AuthenticatedApp";
import { models } from "modules/_common/db/constants";

function createTodayTask(taskText: string[]) {
  for (let i = 0; i < taskText.length; i++) {
    db.task.create({
      task: taskText[i],
      status: models.task.STATUS.today,
      priority: i + 1,
    });
  }
  return null;
}

describe("when I click the pause button", () => {
  it("navigates back to the home page", async () => {
    const task = "some task";
    createTodayTask([task]);
    renderWithProviders(<AuthenticatedApp />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();
    userEvent.click(pauseButton);

    expect(
      screen.getByRole("link", { name: /start slashing/i })
    ).toBeInTheDocument();
  });
});

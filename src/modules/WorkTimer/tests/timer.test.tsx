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

describe("when work timer ends", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("navigates to the break timer page and starts the break timer", async () => {
    const task = randText();
    const workTimerDuration = 1500000;
    createTodayTask([task]);

    renderWithProviders(<App />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(screen.getByText("25:00")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(workTimerDuration + 2000);
    });

    expect(screen.getByText(/break time/i)).toBeInTheDocument();
  });
});

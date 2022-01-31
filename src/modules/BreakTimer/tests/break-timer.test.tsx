import { renderWithProviders } from "utils/tests/render-with-providers";
import {
  screen,
  waitForElementToBeRemoved,
  act,
  within,
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

beforeEach(() => {
  jest.useFakeTimers("modern");
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

describe("when break timer ends", () => {
  it("renders the break is over page", async () => {
    const task = randText();
    const breakTimerDuration = 300000;
    createTodayTask([task]);

    renderWithProviders(<App />, { route: "/timer/break" });

    expect(screen.getByText("05:00")).toBeInTheDocument();
    expect(screen.getByText(/break time/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(breakTimerDuration + 2000);
    });

    expect(screen.getByText(/break is over/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /edit tasks/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /keep slashing/i })
    ).toBeInTheDocument();
  });

  it("navigates to Main when edit tasks button is clicked", async () => {
    const task = randText();
    const breakTimerDuration = 300000;
    createTodayTask([task]);

    renderWithProviders(<App />, { route: "/timer/break" });

    act(() => {
      jest.advanceTimersByTime(breakTimerDuration + 2000);
    });

    userEvent.click(screen.getByRole("button", { name: /edit tasks/i }));
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(
      screen.getByRole("heading", { name: /this week/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /today/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /done/i })).toBeInTheDocument();

    const withinTodayList = within(
      screen.getByRole("list", { name: /today/i })
    );
    expect(withinTodayList.getByRole("listitem")).toHaveTextContent(task);
  });

  it("starts a new work timer with the same task when Keep Slashing button is clicked", async () => {
    const task = randText();
    const breakTimerDuration = 300000;
    createTodayTask([task]);

    renderWithProviders(<App />, { route: "/timer/break" });

    act(() => {
      jest.advanceTimersByTime(breakTimerDuration + 2000);
    });

    userEvent.click(screen.getByRole("button", { name: /keep slashing/i }));
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(screen.getByText("25:00")).toBeInTheDocument();
    expect(screen.getByText(task)).toBeInTheDocument();
  });
});

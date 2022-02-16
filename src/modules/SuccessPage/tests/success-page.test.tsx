import { renderWithProviders } from "utils/tests/render-with-providers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { db } from "mocks/db";
import App from "App";
import { randText } from "@ngneat/falso";
import { setScrollIntoView } from "modules/_common/utils/tests/set-scroll-into-view";
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

async function setupCacheAndRender() {
  renderWithProviders(<AuthenticatedApp />, { route: "/timer/work" });
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  // The first task is marked as done.
  userEvent.click(screen.getByRole("button", { name: /mark done/i }));

  return null;
}

test("displays the completed task and the next task", async () => {
  const completedTask = randText();
  const nextTask = randText();
  createTodayTask([completedTask, nextTask]);
  const tasksToday = db.task.getAll();

  renderWithProviders(<AuthenticatedApp />, {
    route: {
      pathname: "/success",
      state: {
        currentTask: tasksToday[0],
        nextTask: tasksToday[1],
      },
    },
  });
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  expect(screen.getByText(completedTask)).toBeInTheDocument();
  expect(screen.getByText(`Next up: ${nextTask}`)).toBeInTheDocument();
});

test("goes back to WorkTimer when Keep Slashing button is clicked and starts the next task", async () => {
  const task1 = randText();
  const task2 = randText();
  createTodayTask([task1, task2]);

  await setupCacheAndRender();
  userEvent.click(screen.getByRole("button", { name: /keep slashing/i }));

  expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(task2)).toBeInTheDocument();
  });
  expect(screen.queryByText(task1)).not.toBeInTheDocument();
});

test("starts break timer when Take Break button is clicked", async () => {
  const completedTask = randText();
  const nextTask = randText();
  createTodayTask([completedTask, nextTask]);
  const tasksToday = db.task.getAll();

  renderWithProviders(<AuthenticatedApp />, {
    route: {
      pathname: "/success",
      state: {
        currentTask: tasksToday[0],
        nextTask: tasksToday[1],
      },
    },
  });
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  const takeBreak = screen.getByRole("button", { name: /take break/i });

  expect(takeBreak).toBeInTheDocument();
  userEvent.click(takeBreak);

  expect(
    screen.getByRole("heading", { name: /break time/i })
  ).toBeInTheDocument();
});

describe("when edit tasks button is clicked", () => {
  it("navigates to main page and renders the tasks correctly", async () => {
    setScrollIntoView();
    const completedTask = randText();
    const task2 = randText();
    createTodayTask([completedTask, task2]);

    await setupCacheAndRender();
    const editTasksButton = screen.getByRole("button", { name: /edit tasks/i });

    expect(editTasksButton).toBeInTheDocument();

    userEvent.click(editTasksButton);
    expect(
      screen.getByRole("heading", { name: /this week/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /today/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /done/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("list", { name: /done/i })).toHaveTextContent(
        completedTask
      );
    });
    expect(
      screen.queryByRole("list", { name: /this week/i })
    ).not.toHaveTextContent(completedTask);
  });
});

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
import { setScrollIntoView } from "modules/_common/utils/tests/set-scroll-into-view";

function createTodayTask(taskText: string[]) {
  for (let i = 0; i < taskText.length; i++) {
    db.task.create({ task: taskText[i], status: "today", priority: i + 1 });
  }
  return null;
}

test("displays the completed task and the next task", async () => {
  const completedTask = randText();
  const nextTask = randText();
  createTodayTask([completedTask, nextTask]);
  const tasksToday = db.task.getAll();

  renderWithProviders(<App />, {
    route: {
      pathname: "/success",
      state: {
        currentTask: tasksToday[0],
        nextTask: tasksToday[1],
      },
    },
  });

  expect(screen.getByText(completedTask)).toBeInTheDocument();
  expect(screen.getByText(`Next up: ${nextTask}`)).toBeInTheDocument();
});

test("goes back to WorkTimer when Keep Slashing button is clicked and starts the next task", async () => {
  const task1 = randText();
  const task2 = randText();
  createTodayTask([task1, task2]);

  renderWithProviders(<App />, { route: "/timer/work" });
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  userEvent.click(screen.getByRole("button", { name: /mark done/i }));
  userEvent.click(screen.getByRole("button", { name: /keep slashing/i }));

  expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(task2)).toBeInTheDocument();
  });
  expect(screen.queryByText(task1)).not.toBeInTheDocument();
});

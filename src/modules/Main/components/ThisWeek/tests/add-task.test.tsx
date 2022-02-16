import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "utils/tests/render-with-providers";
import { db } from "mocks/db";
import { setScrollIntoView } from "modules/_common/utils/tests/set-scroll-into-view";
import { randNumber, randText } from "@ngneat/falso";
import { AuthenticatedApp } from "AuthenticatedApp";

function createThisWeekTask(taskText: string[]) {
  for (let i = 0; i < taskText.length; i++) {
    db.task.create({ task: taskText[i], status: "THIS_WEEK", priority: i + 1 });
  }
  return null;
}

test("add a new task from This Week input and display it at bottom of This Week column", async () => {
  setScrollIntoView();
  db.task.create({ task: "First task", status: "THIS_WEEK", priority: 1 });
  const newTask = "new task";
  renderWithProviders(<AuthenticatedApp />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  const input = await screen.findByRole("textbox", {
    name: /add task this week/i,
  });
  userEvent.type(input, newTask);
  userEvent.keyboard("{enter}");
  await waitFor(() => {
    const list = screen.getByRole("list", { name: /this week/i });
    const items = within(list).getAllByRole("listitem");
    expect(items[items.length - 1]).toHaveTextContent(newTask);
  });
});

test("display the correct placeholder if list is empty", async () => {
  setScrollIntoView();
  renderWithProviders(<AuthenticatedApp />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  const input = await screen.findByRole("textbox", {
    name: /add task this week/i,
  });
  expect(input.getAttribute("placeholder")).toMatchInlineSnapshot(
    `"Add task + hit enter..."`
  );
});

test("adds N tasks and displays N tasks", async () => {
  const numberOfTasks = randNumber({ min: 1, max: 10 });
  const tasks = [...Array(numberOfTasks)].map(() => randText());
  createThisWeekTask(tasks);

  renderWithProviders(<AuthenticatedApp />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  const withinThisWeekList = within(
    screen.getByRole("list", { name: /this week/i })
  );
  expect(withinThisWeekList.queryAllByRole("listitem")).toHaveLength(
    numberOfTasks
  );
});

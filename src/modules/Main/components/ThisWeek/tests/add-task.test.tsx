import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "App";
import { renderWithProviders } from "utils/tests/render-with-providers";
import { db } from "mocks/db";
import { setScrollIntoView } from "modules/_common/utils/tests/set-scroll-into-view";

test("add a new task from This Week input and display it at bottom of This Week column", async () => {
  setScrollIntoView();
  db.task.create({ task: "First task", status: "thisWeek", priority: 1 });
  const newTask = "new task";
  renderWithProviders(<App />);
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

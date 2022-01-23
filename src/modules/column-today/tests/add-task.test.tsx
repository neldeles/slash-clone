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

test("add a new task from Today input and display it at bottom of Today column", async () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};
  db.task.create({ task: "First task", status: "today", priority: 1 });
  const newTask = "new task";
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  const input = await screen.findByRole("textbox", {
    name: /add task today/i,
  });
  userEvent.type(input, newTask);
  userEvent.keyboard("{enter}");
  await waitFor(() => {
    const list = screen.getByRole("list", { name: /today/i });
    const items = within(list).getAllByRole("listitem");
    expect(items[items.length - 1]).toHaveTextContent(newTask);
  });
});

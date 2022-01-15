import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "App";

test("adds a new task and displays it in This Week column", () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const newTask = "new task";
  render(<App />);
  const input = screen.getByRole("textbox", { name: /add task this week/i });
  userEvent.type(input, newTask);
  userEvent.keyboard("{enter}");
  const list = screen.getByRole("list");
  const items = within(list).getAllByRole("listitem");
  expect(items[items.length - 1]).toHaveTextContent(newTask);
});

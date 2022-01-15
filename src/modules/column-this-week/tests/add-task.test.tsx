import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "App";

test("adds a new task and displays it in This Week column", () => {
  const newTask = "new task";
  render(<App />);
  const input = screen.getByRole("textbox", { name: /add task this week/i });
  userEvent.type(input, newTask);
  userEvent.keyboard("{enter}");
  const list = screen.getByRole("list");
  const items = within(list).getAllByRole("listitem");
  expect(items[items.length - 1]).toHaveTextContent(newTask);
});

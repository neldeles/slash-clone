import { screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "App";
import { renderWithProviders } from "utils/tests/render-with-providers";

test("add a new task from This Week input and display it in This Week column", async () => {
  // We add this because scrollIntoView is not implemented in JSDOM
  // https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const newTask = "new task";
  renderWithProviders(<App />);
  const input = await screen.findByRole("textbox", {
    name: /add task this week/i,
  });
  userEvent.type(input, newTask);
  userEvent.keyboard("{enter}");
  const list = await screen.findByRole("list", { name: /this week/i });
  const items = await within(list).findAllByRole("listitem");
  expect(items[items.length - 1]).toHaveTextContent(newTask);
});

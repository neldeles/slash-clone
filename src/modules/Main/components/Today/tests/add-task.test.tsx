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

test("pressing enter adds a new task from Today input and display it at bottom of Today column", async () => {
  setScrollIntoView();
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

describe("when Today list is empty", () => {
  it("displays the correct placeholder text", async () => {
    renderWithProviders(<App />);
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));
    const input = await screen.findByRole("textbox", {
      name: /add task today/i,
    });
    expect(input.getAttribute("placeholder")).toMatchInlineSnapshot(
      `"Add task + hit enter..."`
    );
  });

  it("only displays the button if text input has a value", async () => {
    renderWithProviders(<App />);
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(
      screen.queryByRole("button", { name: /start slashing/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /save task/i })
    ).not.toBeInTheDocument();

    const input = await screen.findByRole("textbox", {
      name: /add task today/i,
    });

    userEvent.type(input, "testing");

    expect(
      screen.getByRole("button", { name: /save task/i })
    ).toBeInTheDocument();

    userEvent.clear(input);
    expect(
      screen.queryByRole("button", { name: /save task/i })
    ).not.toBeInTheDocument();
  });
});

test("typing in input changes button to Save Task", async () => {
  db.task.create({ task: "First task", status: "today", priority: 1 });
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  const input = await screen.findByRole("textbox", {
    name: /add task today/i,
  });
  userEvent.type(input, "testing");
  expect(
    screen.getByRole("button", { name: /save task/i })
  ).toBeInTheDocument();
  userEvent.clear(input);
  expect(
    screen.getByRole("button", { name: /start slashing/i })
  ).toBeInTheDocument();
});

test("clicking button adds a new task from Today input and display it at bottom of Today column", async () => {
  setScrollIntoView();
  db.task.create({ task: "First task", status: "today", priority: 1 });
  const newTask = "new task";
  renderWithProviders(<App />);
  await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  const input = await screen.findByRole("textbox", {
    name: /add task today/i,
  });

  userEvent.type(input, newTask);
  userEvent.click(screen.getByRole("button", { name: /save task/i }));
  await waitFor(() => {
    const list = screen.getByRole("list", { name: /today/i });
    const items = within(list).getAllByRole("listitem");
    expect(items[items.length - 1]).toHaveTextContent(newTask);
  });
});

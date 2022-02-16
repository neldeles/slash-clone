import { renderWithProviders } from "utils/tests/render-with-providers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
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

describe("if it's the last task in Today and I click mark done button", () => {
  it("navigates to the day done page", async () => {
    createTodayTask([randText()]);

    renderWithProviders(<AuthenticatedApp />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));
    userEvent.click(screen.getByRole("button", { name: /mark done/i }));
    expect(
      screen.getByRole("button", { name: /go celebrate!/i })
    ).toBeInTheDocument();
  });

  it("removes task from the Today list and adds it to the Done list", async () => {
    setScrollIntoView();
    const lastTask = randText();
    createTodayTask([lastTask]);

    renderWithProviders(<AuthenticatedApp />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(screen.getByText(lastTask)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /mark done/i }));
    userEvent.click(screen.getByRole("button", { name: /go celebrate/i }));

    expect(screen.getByRole("heading", { name: /done/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /today/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /this week/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("list", { name: /done/i })).toHaveTextContent(
        lastTask
      );
    });
    const withinTodayList = within(
      screen.getByRole("list", { name: /today/i })
    );
    expect(withinTodayList.queryAllByRole("listitem")).toHaveLength(0);
  });
});

describe("if it's NOT the last task in Today and I click mark done button", () => {
  it("navigates to the task completion page", async () => {
    createTodayTask([randText(), randText()]);

    renderWithProviders(<AuthenticatedApp />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));
    userEvent.click(screen.getByRole("button", { name: /mark done/i }));
    expect(
      screen.getByRole("button", { name: /keep slashing/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /take break/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /edit tasks/i })
    ).toBeInTheDocument();
  });

  it("removes task from the Today list and adds it to the Done list", async () => {
    setScrollIntoView();
    const taskToBeCompleted = randText();
    const fillerTask = randText();
    createTodayTask([taskToBeCompleted, fillerTask]);

    renderWithProviders(<AuthenticatedApp />, { route: "/timer/work" });
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(screen.getByText(taskToBeCompleted)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /mark done/i }));
    userEvent.click(screen.getByRole("button", { name: /edit tasks/i }));

    expect(screen.getByRole("heading", { name: /done/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /today/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /this week/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("list", { name: /done/i })).toHaveTextContent(
        taskToBeCompleted
      );
    });
    expect(
      screen.queryByRole("list", { name: /this week/i })
    ).not.toHaveTextContent(taskToBeCompleted);
  });
});

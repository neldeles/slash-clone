import { db, status } from "mocks/db";

describe("This Week Column", () => {
  beforeEach(function () {
    cy.visit("/");
  });
  it("opens and closes", () => {
    cy.findByRole("button", { name: /close this week column/i }).click();
    cy.findByRole("list", { name: /this week/i }).should("not.exist");
    cy.findByRole("heading", { name: /this week/i }).click();
    cy.findByRole("list", { name: /this week/i }).should("exist");
  });

  it("adds a new task from This Week input and display it at bottom of This Week column", () => {
    const newTask = "new task";
    cy.findByRole("textbox", {
      name: /add task this week/i,
    }).type(newTask + "{enter}");

    cy.findByRole("list", { name: /this week/i }).within(($list) => {
      cy.findByText(newTask).should("exist");
    });
  });

  it.only("deletes a task from This Week column", () => {
    let length: number;

    cy.findByRole("list", { name: /this week/i }).within(() => {
      cy.findAllByRole("listitem").then(($listItems) => {
        length = $listItems.length;
      });
      cy.findAllByRole("listitem").eq(0).realHover();
      cy.findByRole("button", { name: /delete/i })
        .click()
        .then(() => {
          cy.findAllByRole("listitem").should("have.length", length - 1);
        });
    });
  });
});

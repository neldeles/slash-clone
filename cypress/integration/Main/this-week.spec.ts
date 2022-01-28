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
});

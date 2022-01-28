export {};
describe("My First Test", () => {
  it("Visits the home page", () => {
    cy.visit("/");
  });
});

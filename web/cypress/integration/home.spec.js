/// <reference types="cypress" />

context("Home page test", () => {
  beforeEach(() => {
    cy.visit("");
  });

  // https://on.cypress.io/interacting-with-elements

  it("can navigate to login !", () => {
    cy.contains("Se connecter").click();
    cy.url().should("include", "/auth/login");
  });
  it("can navigate to signup !", () => {
    cy.contains("S'inscrire").click();
    cy.url().should("include", "/auth/signup");
  });
});

/// <reference types="cypress" />

context("Login page test", () => {
  beforeEach(() => {
    cy.visit("/auth/forgotpassword");
  });

  // https://on.cypress.io/interacting-with-elements

  it("can go to login", () => {
    cy.contains("Se connecter").click();
    cy.url().should("include", "/auth/login");
  });

  it("should fail reset password", () => {
    cy.contains("Valider").click();
    cy.contains("Ce champ est requis");
  });

  it("should send mail to reset password", () => {
    cy.get("[data-testid='forgot-password-email']").type("user1@fake.com");
    cy.contains("Valider").click();
  });
});

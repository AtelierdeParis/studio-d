/// <reference types="cypress" />

context("Login page test", () => {
  beforeEach(() => {
    cy.visit("/auth/signup");
  });

  // https://on.cypress.io/interacting-with-elements

  it("should fail sign up", () => {
    cy.get("[data-testid='signup-email']").type(
      Math.floor(Math.random() * 1000) + "@fake.com"
    );
    cy.contains("S'inscrire").click();
    cy.contains("Ce champ est requis");

    cy.get("[data-testid='signup-password']").type("user");
    cy.get("[data-testid='signup-confirm-password']").type("notUser");
    cy.contains("S'inscrire").click();
    cy.contains("Les mots de passe ne correspondent pas");
  });
  it("should sign up", () => {
    cy.get("[data-testid='signup-email']").type(
      Math.floor(Math.random() * 1000) + "@fake.com"
    );
    const password = "user";
    cy.get("[data-testid='signup-password']").type(password);
    cy.get("[data-testid='signup-confirm-password']").type(password);
    cy.contains("S'inscrire").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Se déconnecter");
  });
});

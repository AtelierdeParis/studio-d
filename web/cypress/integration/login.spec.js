/// <reference types="cypress" />

context("Login page test", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
  });

  // https://on.cypress.io/interacting-with-elements

  it("can navigate to reset password", () => {
    cy.contains("Tu as oublié ton mot de passe ?").click();
    cy.url().should("include", "/auth/forgotpassword");
  });
  it("should fail login", () => {
    cy.get("[data-testid='login-email']").type("user1@fake.com");
    cy.contains("Se connecter").click();
    cy.contains("Ce champ est requis");
  });
  it("should login ", () => {
    cy.get("[data-testid='login-email']").type("user1@fake.com");
    cy.get("[data-testid='login-password']").type("user");
    cy.contains("Se connecter").click();
    cy.wait(1000);

    cy.url().should("include", "/dashboard");
    cy.contains("Se déconnecter");
  });
});

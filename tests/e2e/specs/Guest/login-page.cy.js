describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/login");
  });

  it("should exist", () => {
    cy.get("#login").should("exist");
  });

  it("should display login image", () => {
    cy.get("#login").find("img").should("exist").should("be.visible");
  });

  it("should display Login form", () => {
    cy.get("#login").contains("h2", "Login").should("exist");
    cy.get("#loginForm").should("exist");
  });

  it("should contain Login form links", () => {
    cy.get("#register").should("exist");
    cy.get("#forgotPassword").should("exist");
  });

  it("should contain Login form's fields", () => {
    const fields = ["email", "password", "forgotPassword", "rememberMe"];
    fields.forEach((field) => {
      cy.get(`#${field}`).should("exist");
    });
  });

  it("should display Login form's submit button", () => {
    cy.get("#loginForm").contains("button", "Login").should("exist");
  });
});

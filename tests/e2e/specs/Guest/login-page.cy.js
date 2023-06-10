describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/login");
  });

  it("should display the login page", () => {
    cy.get("#login").should("exist");
  });

  it("should display login image", () => {
    cy.get("#login").find("img").should("exist").should("be.visible");
  });

  it("should display the login form", () => {
    cy.get("#login-form").should("exist");
  });

  it("should display the login form title", () => {
    cy.get("#login").contains("h2", "Login").should("exist");
  });

  it("should display the login form register link", () => {
    cy.get("#register").should("exist");
  });

  it("should display the login form email input", () => {
    cy.get("#email").should("exist");
  });

  it("should display the login form password input", () => {
    cy.get("#password").should("exist");
  });

  it("should display the login form forgot password link", () => {
    cy.get("#forgot-password").should("exist");
  });

  it("should display the login form checkbox input field", () => {
    cy.get("#rememberbox").should("exist");
  });

  it("should display the login form submit button", () => {
    cy.get("#login-btn").contains("button", "Login").should("exist");
  });
});

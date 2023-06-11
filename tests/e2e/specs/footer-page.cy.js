describe("App Footer", () => {
  const baseUrl = "http://localhost:8081";
  beforeEach(() => {
    cy.visit(baseUrl);
  });
  it("should exist", () => {
    cy.get("#footer").should("exist");
  });
  it("should display contact section", () => {
    cy.get("#contact-section").should("exist");
  });
  it("should display menu section", () => {
    cy.get("#menu-section").should("exist");
  });
  it("should display text section", () => {
    cy.get("#text-section").should("exist");
  });
  it("should display bottom footer section", () => {
    cy.get("#bottom-footer").should("exist");
    cy.get("#bottom-footer").should("contain", "© PlentyFull. All rights reserved.");
  });
  it("should redirect to the Guest pages successfully when their respective links are clicked", function () {
    const menuRoutes = [
      {
        name: "Home",
        url: "/",
      },
      {
        name: "About",
        url: "/about",
      },
      {
        name: "Register",
        url: "/register",
      },
      {
        name: "Login",
        url: "/login",
      },
    ];
    menuRoutes.forEach((route) => {
      cy.visit("/");
      cy.contains(".nav-link", route.name).click();
      cy.url().should("eq", `${baseUrl}${route.url}`);
    });
  });
});


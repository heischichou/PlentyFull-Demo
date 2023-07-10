describe("App Footer", () => {
  const baseUrl = "http://localhost:8082";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should exist", () => {
    cy.get("#footer").should("exist");
  });

  it("should display Footer sections", () => {
    const sections = ["contact", "menu", "textSection"];
    sections.forEach((section) => {
      cy.get(`#${section}`).should("exist");
    });
  });

  it("should display Copyrights section", () => {
    cy.get("#copyrights").should("exist");
    cy.get("#copyrights").should(
      "contain",
      "© PlentyFull. All rights reserved."
    );
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

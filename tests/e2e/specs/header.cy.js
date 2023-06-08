describe("App Header", () => {
  const baseUrl = "http://localhost:8082";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should exist", () => {
    cy.get("#nav").should("exist");
    cy.get(".navbar-collapse").should("exist");
  });

  it("should redirect to the Guest pages successfully when their respective links are clicked", function () {
    const guestRoutes = [
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
    guestRoutes.forEach((route) => {
      cy.visit("/");
      cy.contains(".nav-link", route.name).click();
      cy.url().should("eq", `${baseUrl}${route.url}`);
    });
  });
});

describe("Registry Page", () => {
  const baseUrl = "http://localhost:8081/registry";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should exist", () => {
    cy.get("#app").should("exist");
  });

  it("should display page title", () => {
    cy.get("h1").should("exist");
    cy.get("h1").should("be.visible");
  });

  it("should contain and display a sidebar", () => {
    cy.get("#sideBar").should("exist");
  });

  it("should contain and display a button and three items", () => {
    cy.get("#sideBar").find(".navbar-toggler").should("exist");
    cy.get("#sideBar").find(".navbar-toggler").should("be.visible");
    cy.get("#sideBar").find(".nav-link").should("have.length", 3);
    cy.get("#sideBar").find(".nav-link").should("be.visible");
  });

  it("should switch between Settings tabs correctly", async () => {
    const tabs = [
      {
        tab: "registrationTab",
        content: "requestsSection",
      },
      // {
      //   tab: "membersTab",
      //   content: "manageUsers",
      // },
      {
        tab: "reportsTab",
        content: "userReports",
      },
    ];

    tabs.forEach((tab) => {
      cy.get(`#${tab.tab}`)
        .should("exist")
        .click()
        .then(($el) => {
          cy.get(`#${tab.content}`).should("exist").should("be.visible");
        });
    });
  });

  it("should contain and display actions buttons", () => {
    cy.get("#members").click();
    cy.get("#members").should("have.class", "active");
    cy.get("a").find(".bi-exclamation-circle").should("exist");
    cy.get("a").find(".bi-exclamation-circle").should("be.visible");
    cy.get("a").find(".bi-lock").should("exist");
    cy.get("a").find(".bi-lock").should("be.visible");
    cy.get("a").find(".bi-dash-circle").should("exist");
    cy.get("a").find(".bi-dash-circle").should("be.visible");
  });
});

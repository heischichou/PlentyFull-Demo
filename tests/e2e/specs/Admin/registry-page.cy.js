describe("Registry Page", () => {
  const baseUrl = "http://localhost:8081/registry";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should exist", () => {
    cy.get("#app").should("exist");
  });

  it("should display sidebar and page title", () => {
    cy.get("h1").should("exist");
    cy.get("h1").should("be.visible");
    cy.get("#sideBar").should("exist");
  });

  it("should contain and display a button and three items", () => {
    cy.viewport('macbook-16');
    cy.get("#sideBar").find(".navbar-toggler").should("exist");
    cy.get("#sideBar").find(".navbar-toggler").should("be.visible");

    cy.viewport(1024, 768)
    cy.get("#sideBar").find(".navbar-toggler").should("not.be.visible");

    cy.get("#sideBar").find(".nav-link").should("have.length", 3);
    cy.get("#sideBar").find(".nav-link").should("be.visible");
  });

  it("should switch between Settings tabs correctly", async () => {
    const tabs = [
      {
        tab: "registrationTab",
        content: "requestsSection",
      },
      {
        tab: "membersTab",
        content: "manageUsers",
      },
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

  // Uncomment and revise when the back-end is ready
  // it("should contain and display actions buttons", () => {
  //   cy.get("#membersTab")
  //     .click()
  //     .then(($el) => {
  //       cy.get("a").find(".bi-exclamation-circle").should("exist").should("be.visible");
  //       cy.get("a").find(".bi-lock").should("exist").should("be.visible");
  //       cy.get("a").find(".bi-dash-circle").should("exist").should("be.visible");
  //     });
  // });

  // it("should display a table with 6 columns", () => {
  //   cy.get("#membersTab")
  //     .click()
  //     .then(($el) => {
  //       cy.get("table").should("exist").should("be.visible");
  //       cy.get("table").find("th").should("have.length", 6).should("be.visible");
  //     });
  // });
});

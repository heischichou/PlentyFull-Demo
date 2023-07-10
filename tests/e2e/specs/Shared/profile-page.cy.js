describe("ProfileView page", () => {
  const baseUrl = "http://localhost:8081/profile";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should contain a Side Bar", () => {
    cy.get("#sideNav").should("exist");
  });

  it("should contain Header title", () => {
    cy.get("#header").contains("h1", "Settings").should("exist");
  });

  it("should contain User Avatar", () => {
    cy.get("#userAvatar").should("exist").should("be.visible");
    cy.get("#changeAvatar").should("exist").should("be.visible");
  });

  it("should contain Settings tabs", () => {
    const tabs = ["profileTab", "securityTab"];

    tabs.forEach((tab) => {
      cy.get("#sideNav").find(`#${tab}`).should("exist").should("be.visible");
    });
  });

  it("should switch between Settings tabs correctly", () => {
    const tabs = [
      {
        tab: "profileTab",
        content: "editProfile",
        text: "Profile",
        buttons: ["Save Changes", "Cancel"],
      },
      {
        tab: "securityTab",
        content: "securityAndLogin",
        text: "Security and Login",
        buttons: ["Update Password", "Cancel", "Delete My Account"],
      },
    ];

    tabs.forEach((tab) => {
      cy.get(`#${tab.tab}`)
        .should("exist")
        .should("be.visible")
        .click()
        .then(($el) => {
          cy.get(`#${tab.content}`).should("exist");
          cy.contains(".settings-header", tab.text);
          tab.buttons.forEach((button) => {
            cy.contains("button", button).should("exist");
          });
        });
    });
  });

  it("should display Delete Account modal", () => {
    cy.get("#securityTab")
      .should("exist")
      .click()
      .then(($form) => {
        cy.get("#deleteAccount")
          .should("exist")
          .click()
          .then(() => {
            cy.get("#confirmDeletion").should("exist").should("be.visible");
          });
      });
  });
});

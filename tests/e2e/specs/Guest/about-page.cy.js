describe("About page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/about");
  });

  it("should exist", () => {
    cy.get(".about").should("exist");
  });

  it("should contain a page header with an image and title", () => {
    cy.get("#header").contains("h2", "About Us").should("exist");
    cy.get("#header").find("img").should("exist").should("be.visible");
  });

  it("should contain page sections", () => {
    const sections = [
      "aboutContent", // About Us
      "coreValues", // Core Values
      "vision", // Vision and Mission
      "founders", // Founders
    ];

    sections.forEach((section) => {
      cy.get(`#${section}`).should("exist");
    });
  });

  it("should contain Founders", () => {
    cy.get("#founders")
      .find(".avatar")
      .should("exist")
      .should("have.length", 4);
  });
});

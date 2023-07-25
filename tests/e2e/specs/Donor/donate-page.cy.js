describe("Donate Page", () => {
  const baseUrl = "http://localhost:8081/donate";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should exist", () => {
    cy.get("#app").should("exist");
  });

  it("should display a list of food items", () => {
    cy.get("#foodItems")
      .should("exist")
      .find(".accordion-item")
      .should("have.length.greaterThan", 0)
      .should("be.visible");

    cy.contains(".btn", "Reset").click();
    cy.get("#foodItems").should("not.exist");
  });

  it("should have delivery mode and notes forms", () => {
    cy.get("#deliveryMethod").should("exist").should("be.visible");
    cy.get("#optionalNotes").should("exist").should("be.visible");
  });

  it("should have a Searching For Charities component", () => {
    cy.contains(".btn", "Open Donation").click();
    cy.get("#searchingForCharities").should("exist").should("be.visible");
    cy.contains(".btn", "Cancel Order").click();
    cy.get("#searchingForCharities").should("not.be.visible");
  });

  it("should have a Donation Queue component", () => {
    cy.get("#donationQueue").should("exist");
  });

  // it("should have a list of queuers", () => {
  //   cy.contains(".btn", "Open Donation").click();
  //   cy.contains(".btn", "View Queue").click();
  //   cy.get("#donationQueue").should("be.visible");
  //   cy.get("#queue")
  //     .should("exist")
  //     .find(".queuer")
  //     .should("have.length.greaterThan", 0)
  //     .should("be.visible");
  // });
});

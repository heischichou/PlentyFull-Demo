describe("Receive page", () => {
  const baseUrl = "http://localhost:8081/transactions";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should exist", () => {
    cy.get(".container-fluid").should("exist");
  });

  it("should contain and display a sidebar", () => {
    cy.get("#sideBar").should("exist");
  });

  it("sidebar should contain and display at least two items", () => {
    cy.get("#sideBar").find("li").should("have.length.least", 2);
    cy.get("#sideBar").find("li").should("be.visible");
  });

  it("should contain and display page title", () => {
    cy.get("h1").should("exist");
    cy.get("h1").should("exist").should("be.visible");
  });

  it("should contain and display horizontal rule", () => {
    cy.get("hr").should("exist");
    cy.get("hr").should("be.visible");
  });

  // it("should contain and display transactions-section", () => {
  //   cy.get("#transactionsSection").should("exist");
  //   cy.get("#transactionsSection").should("be.visible");
  // });
});

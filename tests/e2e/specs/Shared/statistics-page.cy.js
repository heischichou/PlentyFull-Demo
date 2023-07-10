describe("Statistics Page", () => {
  const baseUrl = "http://localhost:8081/statistics";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should exist", () => {
    cy.get("#app").should("exist");
  });

  it("should display header", () => {
    cy.get("#header").should("exist");
  });

  it("should display statistics figures", () => {
    const figures = [
      {
        id: "#totalVolume",
        title: "Food Surplus Volume",
      },
      {
        id: "#donationCount",
        title: "Donations Per Location",
      },
      {
        id: "#transactionRates",
        title: "Rate of Successful Transactions",
      },
    ];

    figures.forEach((figure) => {
      cy.get(figure.id).should("exist");
      cy.get(figure.id)
        .find(".figure-title")
        .should("be.visible")
        .should("have.text", ` ${figure.title} `);
      cy.get(figure.id).find(".figure-description").should("be.visible");
      cy.get(figure.id).find("canvas").should("be.visible");
      cy.get(figure.id)
        .find(".chart-legend")
        .should("have.length.greaterThan", 0)
        .should("be.visible");
    });
  });
});

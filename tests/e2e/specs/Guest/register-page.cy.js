describe("Register page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/register");
  });
  it("should exist", () => {
    cy.get(".register").should("exist");
  });

  it("should contain a page header with title, image, and links", () => {
    cy.get("#header").should("exist");
    cy.get("#header")
      .contains("h2", "Help us feed peeps all around Cebu!")
      .should("exist");
    cy.get("#header").find("img").should("exist").should("be.visible");
    cy.get("#header").contains("a", "Get Started").should("exist");
    cy.get("#header").contains("a", "Learn More").should("exist");
  });

  it("should contain Registration form", () => {
    cy.get("#registration").should("exist");
  });

  it("should contain Registration form sections", () => {
    const sections = ["generalInformation", "presentLocation"];
    sections.forEach((section) => {
      cy.get(`#${section}`).should("exist");
    });
  });

  it("should display the General Information section's fields", () => {
    const fields = [
      "name",
      "description",
      "organizationType",
      "password",
      "confirmPassword",
      "verificationDocument",
    ];

    fields.forEach((field) => {
      cy.get(`#${field}`).should("exist");
    });
  });

  it("should display the Present Location section's fields", () => {
    const fields = [
      "contact",
      "email",
      "streetAddress",
      "barangay",
      "municipality",
      "city",
      "province",
    ];

    fields.forEach((field) => {
      cy.get(`#${field}`).should("exist");
    });
  });
});

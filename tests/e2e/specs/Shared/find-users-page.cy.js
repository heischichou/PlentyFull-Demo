describe("Find Users page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/find");
  });

  it("should exist", () => {
    cy.get(".find-users").should("exist");
  });

  it("should contain and display a page title", () => {
    cy.get("h1").should("exist");
    cy.get("h1").should("exist").should("be.visible");
  });

  it("should contain and display a search bar", () => {
    cy.get("#searchBar").should("exist");
    cy.get("#searchBar").should("exist").should("be.visible");
  });

  it("should contain and display Search Bar dropdowns", () => {
    const dropdowns = [
      {
        button: "searchBy",
        dropdown: "searchByDropdown",
        options: ["Name", "Address"],
      },
      {
        button: "sortBy",
        dropdown: "sortByDropdown",
        options: ["A to Z", "Z to A", "Distance"],
      },
    ];

    dropdowns.forEach((dropdown) => {
      cy.get(`#${dropdown.dropdown}`).should("exist");

      dropdown.options.forEach((option) => {
        cy.get(`#${dropdown.dropdown}`)
          .contains(".dropdown-item", option)
          .should("exist");
      });
    });
  });

  it("should contain and display the Users", () => {
    cy.get("#users").should("exist");
    cy.get("#users").should("exist").should("be.visible");
    cy.get("#users")
      .find(".avatar")
      .should("exist")
      .should("have.length.greaterThan", 1);
  });
});

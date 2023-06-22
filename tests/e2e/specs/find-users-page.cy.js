describe("Find Users page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8081/find");
    });
    it("should exist", () => {
        cy.get(".container").should("exist");
    });
    it("should contain and display a page title", () => {
        cy.get("h1").should("exist");
        cy.get("h1").should("exist").should("be.visible");
    });
    it("should contain and display a search bar", () => {
        cy.get("#find-search-bar").should("exist");
        cy.get("#find-search-bar").should("exist").should("be.visible");
    });
    it("should contain and display search by dropdown", () => {
        cy.get("#searchBy-btn").should("exist");
        cy.get("#searchBy-btn").should("exist").should("be.visible");
    });
    it("should contain and display sort by dropdown", () => {
        cy.get("#sortBy-btn").should("exist");
        cy.get("#sortBy-btn").should("exist").should("be.visible");
    });
    it("should contain and display the find users section", () => {
        cy.get("#find-users-section").should("exist");
        cy.get("#find-users-section").should("exist").should("be.visible");
    });
});
describe("Registry Page", () => {
    const baseUrl = "http://localhost:8081/registry";
    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it("should exist", () => {
        cy.get("#app").should("exist");
    });

    it("should contain and display a sidebar", () => {
        cy.get("#sideBar").should("exist");
    });

    it("should contain and display a button and three items", () => {
        cy.get("#sideBar").find(".navbar-toggler").should("exist");
        cy.get("#sideBar").find(".navbar-toggler").should("be.visible");
        cy.get("#sideBar").find("li").should("have.length", 3);
        cy.get("#sideBar").find("li").should("be.visible");
    }); 

    it("should contain and display page title", () => {
        cy.get("h1").should("exist");
        cy.get("h1").should("be.visible");
    });

    it("should contain requestsSection", () => {
        cy.get("#requestsSection").should("exist");
    });
});
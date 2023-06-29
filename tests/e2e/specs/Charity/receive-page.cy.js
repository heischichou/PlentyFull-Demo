describe("Receive page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8081/receive");
    });
    it("should exist", () => {
        cy.get(".container-fluid").should("exist");
    });
    it("should contain and display a sidebar", () => {
        cy.get("#sideBar").should("exist");
    });
    it("sidebar should contain and display three items", () => {
        cy.get("#sideBar").find("li").should("have.length", 3);
        cy.get("#sideBar").find("li").should("be.visible");
    });
    it("should contain and display page title", () => {
        cy.get("h1").should("exist");
        cy.get("h1").should("exist").should("be.visible");
    });
    it("should contain and display horizonta rule", () => {
        cy.get("hr").should("exist");
        cy.get("hr").should("be.visible");
    });
    it("should contain and display transactions-section", () => {
        cy.get("#transactions-section").should("exist");
        cy.get("#transactions-section").should("be.visible");
    });
});
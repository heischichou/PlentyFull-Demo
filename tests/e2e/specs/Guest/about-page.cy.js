describe("About page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8081/about");
    });
    it("should contain a page header", () => {
        cy.get("#header").should("exist");
    });
    it("should contain header title", () => {
        cy.get("#header").contains("h2", "About Us").should("exist");
    });
    it("should contain and display header image", () => {
        cy.get("#header").find("img").should("exist").should("be.visible");
    });
    it("should contain About Us content section", () => {
        cy.get("#about-content-section").should("exist");
    });
    it("should contain Core values section", () => {
        cy.get("#core-values-section").should("exist");
    });
    it("should contain Vision & Mission section ", () => {
        cy.get("#vision-section").should("exist");
    });
    it("should contain and display Vision & Mission image", () => {
        cy.get("#vision-section").find("img").should("exist").should("be.visible");
    });
    it("should contain founders section", () => {
        cy.get("#founders-section").should("exist");
    });
    it("should contain founders title", () => {
        cy.get("#founders-section").contains("h4", "Founders").should("exist");
    });
    it("should contain founders images section", () => {
        cy.get("#founder-images").should("exist");
    });
});
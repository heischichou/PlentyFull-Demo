describe("Register page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8081/register");
    });
    it("should contain a page header", () => {
        cy.get("#header").should("exist");
    });
    it("should contain header title", () => {
        cy.get("#header").contains("h2", "Help us feed peeps all around Cebu!").should("exist");
    });
    it("should contain Get Started button", () => {
        cy.get("#header").contains("button", "Get Started").should("exist");
    });
    it("should contain Learn More button", () => {
        cy.get("#header").contains("button", "Learn More").should("exist");
    });
    it("should contain and display header image", () => {
        cy.get("#header").find("img").should("exist").should("be.visible");
    });
    it("should contain Registration form", () => {
        cy.get("#register-form").should("exist");
    });
    it("should contain General Information section", () => {
        cy.get("#general-info-section").should("exist");
    });
    it("should contain Present Location section", () => {
        cy.get("#present-location-section").should("exist");
    });
});
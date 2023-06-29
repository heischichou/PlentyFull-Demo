describe("ProfileView page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8081/profile");
    });
    it("should contain a side bar", () => {
        cy.get("#nav-bar").should("exist");
    });
    it("should contain header title", () => {
        cy.get("#header").contains("h1", "Settings").should("exist");
    });
    it("should contain 'Profile' nav-link in side bar", () => {
        cy.get("#nav-bar").contains("span", "Profile").should("exist");
    });
    it("should contain 'Security' nav-link in side bar", () => {
        cy.get("#nav-bar").contains("span", "Security").should("exist");
    });
    it("should be able to click 'Profile'", () => {
        cy.get("#nav-bar").contains('Profile').click();
    });
    it("should be able to click 'Security'", () => {
        cy.get("#nav-bar").contains('Security').click();
    });
    it("should check if title 'Security' exists", () => {
        cy.get("#security-button").should("exist").click().then(($form) => {
            cy.contains("h4", "Security");
        })
    });
    it("should check if the form in Personal Profile exists", () => {
        cy.get("#profile-form").should("exist");
    });
    it("should check if the form in Security exists", () => {
        cy.get("#security-button").should("exist").click().then(($form) => {
            cy.get("#security-form").should("exist");
        })
    });
    it("should check if the Profile Picture exists", () => {
        cy.get("#profile-picture").find("img").should("exist").should("be.visible");
    });
    it("should check if the Camera button exists", () => {
        cy.get("#profile-pic-button").should("exist");
    });
    it("should display the profile form submit button", () => {
        cy.get("#profile-form").contains("button", "Save Changes").should("exist");
    });
    it("should display the profile form cancel button", () => {
        cy.get("#profile-form").contains("button", "Cancel").should("exist");
    });
    it("should display the security form update password button", () => {
        cy.get("#security-button").should("exist").click().then(($form) => {
            cy.contains("button", "Update Password").should("exist");
        })
    });
    it("should display the security form cancel button", () => {
        cy.get("#security-button").should("exist").click().then(($form) => {
            cy.contains("button", "Cancel").should("exist");
        })
    });
    it("should display the security form delete button", () => {
        cy.get("#security-button").should("exist").click().then(($form) => {
            cy.contains("button", "Delete My Account").should("exist");
        })
    });
    it("should check if modal exists", () => {
        cy.get("#security-button").should("exist").click().then(($form) => {
            cy.get("#modal-button").should("exist").click().then(() => {
                cy.get("#confirmModal").should("exist");
            })
        })
    });
});
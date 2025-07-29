  // cypress/fixtures/users.json
  const usernames = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
  ];
  describe("Saucedemo login testsuite", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("should login with standard_user", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get('input#login-button').click();
    cy.url().should("include", "inventory.html");
    // eventueel direct uitloggen
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
  });

  it("should login with each user from fixture", () => {
    cy.fixture("users").then((data) => {
      data.usernames.forEach((username) => {
        cy.visit("https://www.saucedemo.com/");

        cy.get("#user-name").type(username);
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();

        if (username === "locked_out_user") {
          cy.get('[data-test="error"]').should("be.visible");
        } else {
          cy.url().should("include", "/inventory.html");
          // eventueel direct uitloggen
          cy.get('#react-burger-menu-btn').click();
          cy.get('#logout_sidebar_link').click();
        }
      });
    });
  });
});

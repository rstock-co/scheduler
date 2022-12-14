/* eslint-disable no-undef */
describe("Appointments", () => {
  beforeEach(() => {
    // 1. reset the database
    cy.request("GET", "/api/debug/reset");

    // 2. navigate to Monday
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // 1. click on the "Add" button
    cy.get("[alt=Add]").first().click();

    // 2. enter the student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones", {
      delay: 150,
    });
    // 3. choose an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // 4. click on the "Save" button
    cy.contains("Save").click();

    // 5. confirm that Cypress sees the newly booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // 1. find and click the "Edit" button on the "Archie Cohen" appointment.
    cy.get("[alt=Edit]").first().click({ force: true });

    // 2. change the student name
    cy.get("[data-testid=student-name-input]").clear().type("Richard Stock", {
      delay: 150,
    });

    // 3. change the selected interviewer
    cy.get('[alt="Tori Malcolm"]').click();

    // 4. click on the "Save" button
    cy.contains("Save").click();

    // 5. confirm that Cypress sees the newly booked appointment
    cy.contains(".appointment__card--show", "Richard Stock");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 1. find and click the "Delete" button on the "Archie Cohen" appointment.
    cy.get("[alt=Delete]").click({ force: true });

    // 2. find and click the "Confirm" button
    cy.contains("Confirm").click();

    // 3. check that the element with the text "Deleting" is displayed.
    cy.contains("Deleting").should("exist");

    // 4. check that the element with the text "Deleting" is cleared
    cy.contains("Deleting").should("not.exist");

    // 5. check that the deleted element does not exist anymore
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});

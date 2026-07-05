class CheckoutPage {
  // Step one: information
  get firstNameInput() {
    return cy.get('#first-name');
  }

  get lastNameInput() {
    return cy.get('#last-name');
  }

  get postalCodeInput() {
    return cy.get('#postal-code');
  }

  get continueButton() {
    return cy.get('#continue');
  }

  /**
   * Fills the info form. The last field is submitted with {enter} to
   * exercise keyboard-driven form submission rather than only clicking
   * "Continue".
   */
  fillInfo(firstName, lastName, postalCode) {
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.postalCodeInput.type(`${postalCode}`);
    this.continueButton.click();
    return this;
  }

  // Step two: overview
  get totalLabel() {
    return cy.get('.summary_total_label');
  }

  get finishButton() {
    return cy.get('#finish');
  }

  finish() {
    this.finishButton.click();
    return this;
  }

  // Complete
  get completeHeader() {
    return cy.get('.complete-header');
  }
}

export default new CheckoutPage();

class LoginPage {
  visit() {
    cy.visit('/');
    return this;
  }

  get usernameInput() {
    return cy.get('#user-name');
  }

  get passwordInput() {
    return cy.get('#password');
  }

  get loginButton() {
    return cy.get('#login-button');
  }

  get errorBanner() {
    return cy.get('[data-test="error"]');
  }

  login(username, password = 'secret_sauce') {
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password, { log: false });
    this.loginButton.click();
    return this;
  }
}

export default new LoginPage();

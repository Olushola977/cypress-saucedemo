/**
 * Even in a POM project, session/state caching is a cross-cutting concern
 * that fits naturally as a Cypress custom command rather than inside a
 * single page object.
 */
Cypress.Commands.add('loginAs', (username, password = 'secret_sauce') => {
  cy.visit('/');
  cy.get('#user-name').clear().type(username);
  cy.get('#password').clear().type(password, { log: false });
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html');
});

Cypress.Commands.add('getCartState', () => {
  return cy.window().then((win) => {
    const raw = win.localStorage.getItem('cart-contents');
    return raw ? JSON.parse(raw) : [];
  });
});

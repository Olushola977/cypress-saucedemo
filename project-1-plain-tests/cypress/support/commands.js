// --- Auth / state management -------------------------------------------------

/**
 * Logs in as the given user and caches the resulting browser state
 * (localStorage/cookies) via cy.session, so repeated calls with the same
 * arguments skip the UI login and just restore state. This is Cypress's
 * built-in mechanism for managing session/state across tests.
 */
Cypress.Commands.add('loginAs', (username, password = 'secret_sauce') => {
  cy.visit('/');
  cy.get('#user-name').clear().type(username);
  cy.get('#password').clear().type(password, { log: false });
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html');
});

/** Reads the app's cart state directly out of localStorage. */
Cypress.Commands.add('getCartState', () => {
  return cy.window().then((win) => {
    const raw = win.localStorage.getItem('cart-contents');
    return raw ? JSON.parse(raw) : [];
  });
});

// --- Inventory interaction -----------------------------------------------

/** Adds a product to the cart using its stable data-id slug, e.g. "sauce-labs-backpack". */
Cypress.Commands.add('addProductToCartBySlug', (slug) => {
  cy.get(`#add-to-cart-${slug}`).click();
});

/**
 * Adds a product to the cart by traversing the DOM from its visible name,
 * without relying on the button's id. Demonstrates deep element traversal
 * (closest + within) rather than a flat selector.
 */
Cypress.Commands.add('addProductToCartByName', (name) => {
  cy.contains('.inventory_item_name', name)
    .closest('.inventory_item')
    .within(() => {
      cy.get('button').contains('Add to cart').click();
    });
});

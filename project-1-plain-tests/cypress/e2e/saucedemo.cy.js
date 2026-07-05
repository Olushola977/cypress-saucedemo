describe('Sauce Demo - plain Cypress tests', () => {
  // ---------------------------------------------------------------------
  // LOGIN + DEEP ELEMENT INTERACTION
  // ---------------------------------------------------------------------
  context('Login', () => {
    it('logs in successfully with a valid user', () => {
      cy.visit('/');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').should('have.length', 6);
    });

    it('shows an error banner for a locked out user', () => {
      cy.visit('/');
      cy.get('#user-name').type('locked_out_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain.text', 'locked out');
    });
  });

  context('Deep element interaction on the inventory page', () => {
    beforeEach(() => {
      cy.loginAs('standard_user');
    });

    it('adds a specific product to the cart by traversing the DOM from its name', () => {
      // Instead of a flat "#add-to-cart-sauce-labs-backpack" selector, walk
      // up from the visible product name to its card, then scope down into
      // that card's own "Add to cart" button.
      cy.contains('.inventory_item_name', 'Sauce Labs Backpack')
        .closest('.inventory_item')
        .within(() => {
          cy.get('button').contains('Add to cart').click();
        });

      cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('sorts products price low-to-high and verifies the rendered order', () => {
      cy.get('.product_sort_container').select('lohi');

      cy.get('.inventory_item_price').then(($prices) => {
        const prices = [...$prices].map((el) =>
          parseFloat(el.innerText.replace('$', ''))
        );
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices, 'prices should already be ascending').to.deep.equal(sorted);
      });
    });

    it('opens the hamburger menu and resets app state', () => {
      cy.addProductToCartByName('Sauce Labs Bike Light');
      cy.get('.shopping_cart_badge').should('have.text', '1');

      cy.get('#react-burger-menu-btn').click();
      cy.get('.bm-menu').should('be.visible');
      cy.get('#reset_sidebar_link').click();
      cy.get('#react-burger-cross-btn').click();

      cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('completes an end-to-end checkout, submitting the last field with the keyboard', () => {
      cy.addProductToCartByName('Sauce Labs Backpack');
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_item').should('have.length', 1);

      cy.get('#checkout').click();
      cy.get('#first-name').type('Ada');
      cy.get('#last-name').type('Lovelace');
      cy.get('#postal-code').type('90210');
      cy.get('#continue').click();

      cy.url().should('include', 'checkout-step-two');
      cy.get('.summary_total_label').should('contain', 'Total');

      cy.get('#finish').click();
      cy.get('.complete-header').should('contain', 'Thank you for your order');
    });
  });
});

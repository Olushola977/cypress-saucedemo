import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Sauce Demo — Page Object Model tests', () => {
  // ---------------------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------------------
  context('Login', () => {
    it('logs in successfully with a valid user', () => {
      LoginPage.visit().login('standard_user');
      cy.url().should('include', '/inventory.html');
      InventoryPage.items.should('have.length', 6);
    });

    it('shows an error banner for a locked out user', () => {
      LoginPage.visit().login('locked_out_user');
      LoginPage.errorBanner.should('be.visible').and('contain.text', 'locked out');
    });
  });

  // ---------------------------------------------------------------------
  // DEEP ELEMENT INTERACTION
  // ---------------------------------------------------------------------
  context('Deep element interaction on the inventory page', () => {
    beforeEach(() => {
      cy.loginAs('standard_user');
    });

    it('adds a specific product to the cart via DOM traversal', () => {
      InventoryPage.addProductToCartByName('Sauce Labs Backpack');
      InventoryPage.cartBadge.should('have.text', '1');
    });

    it('sorts products price low-to-high and verifies the rendered order', () => {
      InventoryPage.sortBy('lohi');
      InventoryPage.getRenderedPrices().then((prices) => {
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices, 'prices should already be ascending').to.deep.equal(sorted);
      });
    });

    it('opens the hamburger menu and resets app state', () => {
      InventoryPage.addProductToCartByName('Sauce Labs Bike Light');
      InventoryPage.cartBadge.should('have.text', '1');

      InventoryPage.openMenu();
      cy.get('.bm-menu').should('be.visible');
      InventoryPage.resetAppState();

      InventoryPage.cartBadge.should('not.exist');
    });

    it('completes an end-to-end checkout across all three page objects', () => {
      InventoryPage.addProductToCartByName('Sauce Labs Backpack');
      InventoryPage.goToCart();

      CartPage.cartItems.should('have.length', 1);
      CartPage.checkout();

      CheckoutPage.fillInfo('Ada', 'Lovelace', '90210');
      cy.url().should('include', 'checkout-step-two');
      CheckoutPage.totalLabel.should('contain', 'Total');

      CheckoutPage.finish();
      CheckoutPage.completeHeader.should('contain', 'Thank you for your order');
    });
  });
});

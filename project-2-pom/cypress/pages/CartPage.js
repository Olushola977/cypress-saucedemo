class CartPage {
  get cartItems() {
    return cy.get('.cart_item');
  }

  get checkoutButton() {
    return cy.get('#checkout');
  }

  get continueShoppingButton() {
    return cy.get('#continue-shopping');
  }

  checkout() {
    this.checkoutButton.click();
    return this;
  }
}

export default new CartPage();

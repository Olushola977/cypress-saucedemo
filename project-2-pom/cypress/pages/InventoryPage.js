class InventoryPage {
  get items() {
    return cy.get('.inventory_item');
  }

  get itemPrices() {
    return cy.get('.inventory_item_price');
  }

  get itemImages() {
    return cy.get('.inventory_item_img img');
  }

  get sortDropdown() {
    return cy.get('.product_sort_container');
  }

  get cartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  get cartLink() {
    return cy.get('.shopping_cart_link');
  }

  get burgerMenuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  get burgerMenuCloseButton() {
    return cy.get('#react-burger-cross-btn');
  }

  get resetAppStateLink() {
    return cy.get('#reset_sidebar_link');
  }

  get logoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  sortBy(value) {
    this.sortDropdown.select(value);
    return this;
  }

  /**
   * Deep element interaction: starts from the visible product name, walks
   * up to its containing card with .closest(), then scopes back down into
   * that card with .within() to click only *that* card's button.
   */
  addProductToCartByName(name) {
    cy.contains('.inventory_item_name', name)
      .closest('.inventory_item')
      .within(() => {
        cy.get('button').contains('Add to cart').click({force: true});
      });
    return this;
  }

  addProductToCartBySlug(slug) {
    cy.get(`#add-to-cart-${slug}`).click({force: true});
    return this;
  }

  openMenu() {
    this.burgerMenuButton.click({force: true});
    return this;
  }

  closeMenu() {
    this.burgerMenuCloseButton.click();
    return this;
  }

  resetAppState() {
    this.resetAppStateLink.click();
    this.closeMenu();
    return this;
  }

  logout() {
    this.openMenu();
    this.logoutLink.click();
    return this;
  }

  goToCart() {
    this.cartLink.click();
    return this;
  }

  /** Returns an array of numeric prices for the currently rendered products. */
  getRenderedPrices() {
    return this.itemPrices.then(($prices) =>
      [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))
    );
  }
}

export default new InventoryPage();

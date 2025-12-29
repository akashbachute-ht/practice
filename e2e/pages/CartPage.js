import { expect } from '@playwright/test';

export default class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.cartItems.first()).toBeVisible();
  }

  async expectItemPresent(name) {
    const item = this.page.locator('.cart_item', { hasText: name });
    await expect(item).toBeVisible();
  }

  async proceedToCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }
}

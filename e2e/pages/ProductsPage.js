import { expect } from '@playwright/test';

export default class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.inventoryList).toBeVisible();
  }

  productLocatorByName(name) {
    return this.page.locator('.inventory_item', { hasText: name });
  }

  async addProductByName(name) {
    const product = this.productLocatorByName(name);
    await expect(product).toBeVisible();
    const addButton = product.locator('button');
    await expect(addButton).toBeVisible();
    await addButton.click();
  }

  async getProductPriceByName(name) {
    const product = this.productLocatorByName(name);
    const priceLocator = product.locator('.inventory_item_price');
    await expect(priceLocator).toBeVisible();
    return (await priceLocator.textContent()).trim();
  }

  async openCart() {
    await expect(this.cartLink).toBeVisible();
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart.html/);
  }

  async cartCount() {
    if (await this.cartBadge.count() === 0) return 0;
    const text = await this.cartBadge.textContent();
    return Number(text.trim());
  }
}

import { test, expect } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

test('add Sauce Labs Backpack to cart and verify cart contents', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await products.expectLoaded();

  const productName = 'Sauce Labs Backpack';
  const price = await products.getProductPriceByName(productName);
  await products.addProductByName(productName);

  // verify cart badge
  const count = await products.cartCount();
  expect(count).toBe(1);

  // open cart and assert item present and price matches
  await products.openCart();
  await expect(page.locator('.cart_list')).toBeVisible();
  await expect(page.locator('.cart_item', { hasText: productName })).toBeVisible();
  await expect(page.locator('.inventory_item_price', { hasText: price })).toBeVisible();
});

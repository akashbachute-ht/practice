import { test, expect } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

test('E2E happy path: login -> add product -> checkout -> confirm', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Login
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await products.expectLoaded();

  // Select product and add to cart
  const productName = 'Sauce Labs Backpack';
  const price = await products.getProductPriceByName(productName);
  await products.addProductByName(productName);
  expect(await products.cartCount()).toBe(1);

  // Cart
  await products.openCart();
  await cart.expectItemPresent(productName);

  // Checkout
  await cart.proceedToCheckout();
  await checkout.fillCustomerInfo('E2E', 'User', '99999');
  await checkout.expectOverviewTotals();
  await checkout.finishCheckout();
  await checkout.expectOrderComplete();

  // final sanity: confirmation message present
  await expect(page.locator('.complete-text')).toContainText(/order/i);
});

import { test, expect } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

test('checkout flow completes an order', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await products.expectLoaded();

  const productName = 'Sauce Labs Backpack';
  await products.addProductByName(productName);
  await products.openCart();

  await cart.expectLoaded();
  await cart.expectItemPresent(productName);
  await cart.proceedToCheckout();

  // fill customer info and continue
  await checkout.fillCustomerInfo('Test', 'User', '12345');
  await checkout.expectOverviewTotals();
  await checkout.finishCheckout();
  await checkout.expectOrderComplete();
});

import { test, expect } from '@playwright/test';
import LoginPage from './pages/LoginPage';

test.describe('Login flow - focused tests', () => {
  test('valid login with standard_user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    // inventory list visible
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('invalid login shows locked out message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await login.expectError('locked out');
    // ensure we did not navigate to inventory
    await expect(page).not.toHaveURL(/inventory.html/);
  });
});

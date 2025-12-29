import { expect } from '@playwright/test';

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com/';
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.error = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
  }

  async login(username, password) {
    await expect(this.username).toBeVisible();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectError(messageSubstring) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toContainText(messageSubstring);
  }

  async expectLoginButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }
}

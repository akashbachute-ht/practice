import { expect } from '@playwright/test';

export default class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryTotal = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }

  async expectOverviewTotals() {
    await expect(this.summaryTotal).toBeVisible();
  }

  async finishCheckout() {
    await expect(this.finishButton).toBeVisible();
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete.html/);
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toContainText(/THANK YOU/i);
  }
}

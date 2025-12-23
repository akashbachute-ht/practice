import {test,expect} from '@playwright/test';


test('Practice_01',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.title();
    await expect(page).toHaveTitle("Practice Page");

});
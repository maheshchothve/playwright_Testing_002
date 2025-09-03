// @ts-check
const { test, expect } = require('@playwright/test');

test('Amazon product search and filter test', async ({ page, context }) => {
  // Take product input from user (replace with any hardcoded product if needed)
  const product = "earphones and buds";  // <-- you can replace with dynamic input later

  // Open Amazon
  await page.goto("https://www.amazon.in/");

  // Search for product
  await page.fill('#twotabsearchtextbox', product);
  await page.click('#nav-search-submit-button');
  await page.waitForTimeout(5000);

  // Click on Brand: boAt
  const brandLocator = page.locator("//span[@class='a-size-base a-color-base' and text()='boAt']");
  if (await brandLocator.isVisible()) {
    await brandLocator.click();
  }
  await page.waitForEvent('load');
  // Wait for the results to load
  await page.hover("//span[normalize-space()='Cameras']");
  await page.waitForTimeout(2000);
  await page.screenshot({path:'screenshot/filter.png'});
 await page.waitForTimeout(4500);

});

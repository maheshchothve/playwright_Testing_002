import { test, expect } from '@playwright/test';

test('google page', async ({ page }) => {

   await page.goto("https://www.google.com/")

   const url= await page.title
   console.log(url)

});
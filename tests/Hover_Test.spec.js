const { test, expect } = require('@playwright/test');
const { Amazon_Search } = require('../Pages/Amazon_Search');


test.only("amazon test" ,async ({page})=>{ 

    const searchPage = new Amazon_Search(page);
    await page.goto("https://www.amazon.in/");
    await searchPage.searchForProduct("Laptop");


    await page.waitForTimeout(4500);
    await page.locator("span #nav-search-submit-button").click();


     await page.waitForSelector("#brandsRefinements");

    // Use a more robust selector for brand names
    const brands = await page.$$('#brandsRefinements ul span.a-list-item span.a-size-base');
    // const allTexts = await page.locator('#brandsRefinements ul span.a-list-item span.a-size-base').allTextContents();
    // console.log(allTexts);
    console.log("Brands found:", brands.length);
    let brandClicked = false;
    for (const brand of brands) {
        const text = await brand.textContent();
        if (text === 'HP') {
            await brand.click();
            brandClicked = true;
            break;
        }
    }

    if (!brandClicked) {
        throw new Error('HP brand not found or could not be clicked.');
    }

    await page.waitForTimeout(4500);
    await page.hover("//span[normalize-space()='Laptops & Accessories']");
    await page.waitForTimeout(2000);
    await page.locator("//a[normalize-space()='Thin and light laptops']").click();
    await page.waitForTimeout(4500);

    // Assert the page title to confirm navigation after clicking
    const pageTitle = await page.title();
    expect(pageTitle).toContain("Thin and light laptops");

    await page.screenshot({ path: 'screenshot/amazon.png' });
    await page.waitForTimeout(4500);
});
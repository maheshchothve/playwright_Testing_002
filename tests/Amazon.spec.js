
const { test, expect } = require('@playwright/test');
const { Amazon_Search } = require('../Pages/Amazon_Search');


test.only("amazon test" ,async ({page})=>{ 

    const searchPage = new Amazon_Search(page);
    await page.goto("https://www.amazon.in/");
    await searchPage.searchForProduct("Laptop");


    await page.waitForTimeout(4500);
    await page.locator("span #nav-search-submit-button").click();

    // Wait for the brands section to be visible
        await page.waitForTimeout(4500);

    await page.waitForSelector("#brandsRefinements");

    // Use a more robust selector for brand names
    const brands = await page.$$('#brandsRefinements ul span.a-list-item span.a-size-base');
    console.log("Brands found:", brands.length);
    for (const brand of brands) {
        const text = await brand.textContent();
        // if (text && text.trim().length > 0) {
        //     console.log(text.trim());
        // }
        if(text==='Dell'){
            await brand.click();
            break;
        }

    }
    await expect(page).toHaveTitle("Amazon.in : Laptop");
    console.log("title verified case");

    await page.screenshot({path:'screenshot/amazon.png'});
    

});
class Amazon_Search {
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator('#twotabsearchtextbox');
        this.searchButton = page.locator('#nav-search-submit-button');
    }

    async searchForProduct(productName) {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }
}

module.exports = { Amazon_Search };
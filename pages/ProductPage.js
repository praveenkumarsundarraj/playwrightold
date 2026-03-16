class ProductPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
    }

    async searchProductAndAddCart(productsName) {
        const productCount = await this.products.count();
        for (let i = 0; i < productCount; i++) {
            const productName = await this.products.nth(i).locator('b').textContent();
            if (productName == productsName) {
                //locator chaining to find the button inside the specific product card
                await this.products.nth(i).locator('text=  Add To Cart').click();
                break;
            }
        }
    }
}
module.exports = { ProductPage };
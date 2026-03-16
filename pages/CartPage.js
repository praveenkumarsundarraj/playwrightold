class CartPage {
    constructor(page, expect) {
        this.expect = expect;
        this.page = page;
        this.cartPage = page.locator('button i.fa-shopping-cart');
        this.validateProduct = page.locator('div .cartSection');
        this.checkoutButton = page.locator('text= Checkout');
        this.creditCardField = page.locator('div.field input[class *=\'input\']');
        this.ccDate = page.locator('select.ddl').first();
        this.ccYear = page.locator('select.ddl').nth(1);
        this.cvv = page.locator('div:has-text(\'CVV\') + input');
        this.nameOnCard = page.locator('div:has-text(\'Name on Card \') + input');
        this.countrySelect = page.locator('input[placeholder=\'Select Country\']');
        this.selectCountry = page.locator('section.ta-results button');
        this.submitOrder = page.locator('.action__submit');
        this.thankYouText = page.locator('h1').first();
        this.orderid = page.locator('tbody').nth(3).locator('tr').nth(2).locator('td');
    }

    async placeOrder(cardDetails, countrySearchText, orderPlacedText) {
        await this.cartPage.nth(0).click();
        await this.validateProduct.nth(0).waitFor();
        this.expect(await this.validateProduct.nth(0).locator('h3').isVisible()).toBeTruthy();
        await this.checkoutButton.click();
        await this.creditCardField.first().fill(cardDetails.number);
        await this.ccDate.selectOption(cardDetails.month);
        await this.ccYear.selectOption(cardDetails.year);
        await this.cvv.fill(cardDetails.cvv);
        await this.nameOnCard.fill(cardDetails.name);
        await this.countrySelect.pressSequentially(countrySearchText, { delay: 150 });
        await this.selectCountry.first().waitFor();
        const countryCount = await this.selectCountry.count();
        for (let i = 0; i < countryCount; i++) {
            let text = await this.selectCountry.nth(i).textContent();
            if (text === ' India') {
                await this.selectCountry.nth(i).click();
                break;
            }
        }
        await this.submitOrder.click();
        this.expect(await this.thankYouText.textContent()).toEqual(orderPlacedText);
        return await this.orderid.textContent();
    }
}
module.exports = { CartPage };
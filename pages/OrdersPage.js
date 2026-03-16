class OrdersPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.ordersTab = page.locator('button:has-text(\'  ORDERS\')');
        this.orderList = page.locator('tr:has(th[scope=\'row\'])');
        this.orderedId = page.locator('div small + div');
    }

    async validateOrder(orderNumber) {
        await this.ordersTab.click();
        await this.orderList.first().waitFor();
        const orderCount = await this.orderList.count();
        for (let i = 0; i < orderCount; i++) {
            const chkOrderId = await this.orderList.locator('th').nth(i).textContent();
            if (orderNumber.includes(chkOrderId)) {
                await this.orderList.first().locator('td').nth(4).locator('button').click();
                break;
            }
        }
        this.expect(await this.orderedId.textContent()).toEqual(orderNumber.replaceAll('|', '').trim());
    }
}
module.exports = { OrdersPage };
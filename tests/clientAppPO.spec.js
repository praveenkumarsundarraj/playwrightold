import { test, expect } from '@playwright/test';
import { POManager } from '../pages/POManager';
import dataSet from '../utils/clientDataTestData.json';
//import custom test 
import {customTest} from '../utils/customTestData'

for (const data of dataSet) {
    test('Client Page Testing ' + data.productsName, async ({ page }) => {
        //Page Initialization
        const poManager = new POManager(page, expect);
        const loginPage = poManager.getLoginPage();
        const productPage = poManager.getProductPage();
        const cartPage = poManager.getCartPage();
        const orderPage = poManager.getOrdersPage();

        //Test Steps
        await loginPage.goTo();
        await loginPage.loginUser(data.userEmail, data.userPassword);
        await productPage.searchProductAndAddCart(data.productsName);
        let orderNumber = await cartPage.placeOrder(data.cardDetails, data.countrySearchText, data.orderPlacedText);
        await orderPage.validateOrder(orderNumber);

        console.log("Order Placed and verified successflly");
    });
}

customTest('@smoke this test is driven by custom data', async ({ page,testDataforOrder }) => {
        //Page Initialization
        const poManager = new POManager(page, expect);
        const loginPage = poManager.getLoginPage();
        const productPage = poManager.getProductPage();
        const cartPage = poManager.getCartPage();
        const orderPage = poManager.getOrdersPage();

        //Test Steps
        await loginPage.goTo();
        await loginPage.loginUser(testDataforOrder.userEmail, testDataforOrder.userPassword);
        await productPage.searchProductAndAddCart(testDataforOrder.productsName);
    }
);

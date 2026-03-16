import { test, expect, request } from '@playwright/test';
import { APIUtils} from '../utils/APIUtils';

let loginPayLoad = {userEmail: "praveenkum261@gmail.com", userPassword: "Testing@1"};
let createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let orderId, orderResponse, apiContext, apiUtils;

test.beforeAll('Call Login API', async()=> {
    apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext,loginPayLoad);
    orderResponse =await apiUtils.createOrder(createOrderPayload);
    orderId = orderResponse.orderID;
});

test('Client Page Testing' ,async ({page}) => {
    const cardTitles = page.locator('.card-body h5 b');
    const ordersTab = page.locator('button:has-text(\'  ORDERS\')');
    const orderList = page.locator('tr:has(th[scope=\'row\'])');
    const orderedId = page.locator('div small + div');
    await apiUtils.addLocalStorage(page,orderResponse.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());
    const orderNumber = orderId;
    console.log(orderNumber);
    await ordersTab.click();
    await orderList.first().waitFor();
    const orderCount = await orderList.count();
    for(let i=0;i<orderCount;i++){
        const chkOrderId = await orderList.locator('th').nth(i).textContent();
        if(orderNumber.includes(chkOrderId)){
            await orderList.first().locator('td').nth(4).locator('button').click()
            break;
        }
    } 
    expect(await orderedId.textContent()).toEqual(orderNumber.toString())

});
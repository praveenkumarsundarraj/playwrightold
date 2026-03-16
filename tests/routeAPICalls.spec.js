import { test, expect, request } from '@playwright/test';
import { APIUtils} from '../utils/APIUtils';

let loginPayLoad = {userEmail: "praveenkum261@gmail.com", userPassword: "Testing@1"};
let createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let fakeorderPayload ={data:[],message:"No Orders"};
let routeCall = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*';
let viewOrderCall= 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*';
let orderId, orderResponse, apiContext, apiUtils;

test.beforeAll('Call Login API', async()=> {
    apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext,loginPayLoad);
    orderResponse =await apiUtils.createOrder(createOrderPayload);
    orderId = orderResponse.orderID;
});

test('Request Intercept' ,async ({page}) => {
    const cardTitles = page.locator('.card-body h5 b');
    const ordersTab = page.locator('button:has-text(\'  ORDERS\')');
    await apiUtils.addLocalStorage(page,orderResponse.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());
    const orderNumber = orderId;
    console.log(orderNumber);
    await ordersTab.click();
    await page.locator('button:has-text(\'View\')').first().click();
    await page.route(viewOrderCall,
        routeIt => {routeIt.continue({
          url : viewOrderCall,  
        });
    });
    await page.waitForResponse(viewOrderCall);

});

test('response intercept' ,async ({page}) => {
    const cardTitles = page.locator('.card-body h5 b');
    const ordersTab = page.locator('button:has-text(\'  ORDERS\')');
    await apiUtils.addLocalStorage(page,orderResponse.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());
    const orderNumber = orderId;
    console.log(orderNumber);
    await page.route(routeCall,
        async routeIt => {
            const response = await page.request.fetch(routeIt.request());
            let body = JSON.stringify(fakeorderPayload);
            routeIt.fulfill(
                {
                    response,
                    body,
                }
            );
        }
    );
    await ordersTab.click();
    await page.waitForResponse(routeCall);

});
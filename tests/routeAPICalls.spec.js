import {test, expect,request} from '@playwright/test';

const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {userEmail:"rahulshettyacademy@mailinator.com",userPassword:"Testing@1"};//the JS object will not have qoutes for key, only values are covered with qoutes
const createOrderPayload = {orders:[{country:"India",productOrderedId:"68a961459320a140fe1ca57a"}]};
const fakeOrderResponse={data:[],message:"No Orders"};
const headertoRoute = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*';
let APIresponse;
test.beforeAll('Call Login API',async()=>{
    //apiContext stores the new context which invokes API using request object, this doesnt need any page to be created
    const apicontext = await request.newContext();
    const utils= new APIUtils(apicontext,loginPayload);
    APIresponse= await utils.createOrder(createOrderPayload);
});


test('Client Page API Testing' ,async ({page}) => {
    const utils = new APIUtils();
    await utils.addLocalStorage(page,APIresponse.token);
    const ordersTab = page.locator('button:has-text(\'  ORDERS\')');
    const orderList = page.locator('tr:has(th[scope=\'row\'])');
    const orderedId = page.locator('div small + div');
    let productName = 'ZARA COAT 3';
    //route request to show empty order page by manipulating response
    await page.route(headertoRoute,
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeOrderResponse);
            //now maniputlating the response received above
            route.fulfill(// this takes the real response and manipilated response and assigns the manipulated to real one
                {
                    response,
                    body,
                }
            );
        }
    )

    await page.goto("https://rahulshettyacademy.com/client");
    await ordersTab.waitFor();
    await ordersTab.click();
    await page.waitForResponse(headertoRoute);
    await page.pause();

});
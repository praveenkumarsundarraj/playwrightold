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
    const orderList = page.locator('button:has-text(\'view\')');
    const orderedId = page.locator('div small + div');
    let productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");
    await ordersTab.waitFor();
    await ordersTab.click();
    //Network intercepting and changing the request
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route=> route.continue({
            url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6932880c32ed865871212321',
        })        
    )
    await orderList.first().click();
    await page.pause();

});
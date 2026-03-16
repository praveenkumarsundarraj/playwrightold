import {test, expect,request} from '@playwright/test';

const {APIUtils} = require('../utils/APIUtils');

const loginPayload = {userEmail:"rahulshettyacademy@mailinator.com",userPassword:"Testing@1"};//the JS object will not have qoutes for key, only values are covered with qoutes
const createOrderPayload = {orders:[{country:"India",productOrderedId:"68a961459320a140fe1ca57a"}]};
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
    await page.goto("https://rahulshettyacademy.com/client");
    const orderNumber = APIresponse.orderID;
    await ordersTab.waitFor();
    await ordersTab.click();
    await orderList.first().waitFor();
    const orderCount = await orderList.count();
    for(let i=0;i<orderCount;i++){
        const chkOrderId = await orderList.locator('th').nth(i).textContent();
        if(orderNumber.includes(chkOrderId)){
            console.log(await orderList.first().locator('td').nth(4).locator('button').click());
            break;
        }
    } 
    expect(await orderedId.textContent()).toEqual(orderNumber)

    
});
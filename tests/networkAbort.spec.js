import {test, expect,request} from '@playwright/test';

const {APIUtils} = require('../utils/APIUtils');

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
    // this is a regular experession to denote all the url which has css file loaded in the page, we can also use it for js files and images by changing the file extension in the regular expression
    page.route('**/*.js',route=>route.abort());
    // this is a regular experession to block more than one file type at once.. here i blocked images from the page.
    page.route('**/*.{jpg,png}',route=>route.abort());
    //listens the request call and prints the request url
    page.on('request',request=>console.log(request.url()));
    //listens the response and prints the status code
    page.on('response',Response=>console.log(Response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
});
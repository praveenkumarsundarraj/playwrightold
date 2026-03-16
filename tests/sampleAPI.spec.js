import {test , expect, request} from '@playwright/test';
import { APITest } from '../utils/APITest';

const loginPayload = {userEmail:"rahulshettyacademy@mailinator.com",userPassword:"Testing@1"}
const orderPayload = {orders:[{country:"Malaysia",productOrderedId:"68a961719320a140fe1ca57c"}]};

let token, orderId, message;
test.beforeAll('API Practice',async({browser})=>{
    const apiContext = await request.newContext();
    const apiTest = new APITest(apiContext,loginPayload);
    const repsonse =await apiTest.createOrder(orderPayload);
    token = repsonse.token;
    console.log(repsonse.orderId,' : ', repsonse.message);
});

test('api sample practise',async({page})=>{
    await page.addInitScript(value=>{
        localStorage.setItem('token',value)
    },token);
    await page.goto("https://rahulshettyacademy.com/client/");
    
});
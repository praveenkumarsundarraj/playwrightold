import { test, expect } from '@playwright/test';

let contextWithState;
test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signIn = page.locator('#login');
    const cardTitles = page.locator('.card-body h5 b');
    await page.goto("https://rahulshettyacademy.com/client");
    await userName.fill('rahulshettyacademy@mailinator.com');
    await password.fill('Testing@1');
    await signIn.click();
    await cardTitles.first().waitFor();
    await context.storageState({path: 'State.json'});
    contextWithState =await browser.newContext({storageState: 'State.json'});
});

test('Client Page Testing' ,async () => {
    const page = await contextWithState.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const cardTitles = page.locator('.card-body h5 b');
    const products = page.locator('.card-body');
    const cartPage = page.locator('button i.fa-shopping-cart');
    const validateProduct = page.locator('div .cartSection');
    const checkoutButton = page.locator('text= Checkout');
    const creditCardField = page.locator('div.field input[class *=\'input\']');
    const ccDate = page.locator('select.ddl').first();
    const ccYear = page.locator('select.ddl').nth(1);
    const cvv = page.locator('div:has-text(\'CVV\') + input');
    const nameOnCard = page.locator('div:has-text(\'Name on Card \') + input');
    const countrySelect = page.locator('input[placeholder=\'Select Country\']');
    const selectCountry = page.locator('section.ta-results button');
    const submitOrder = page.locator('.action__submit');
    const thankYouText = page.locator('h1').first();
    const orderid = page.locator('tbody').nth(3).locator('tr').nth(2).locator('td');
    const ordersTab = page.locator('button:has-text(\'  ORDERS\')');
    const orderList = page.locator('tr:has(th[scope=\'row\'])');
    const orderedId = page.locator('div small + div');
    let productName = 'ZARA COAT 3';
    // console.log(await cardTitles.first().textContent());
    // await page.waitForLoadState('networkidle');
    console.log(await cardTitles.allTextContents());
    const productCount = await products.count();
    for(let i = 0 ; i < productCount ; i++){
        const productName = await products.nth(i).locator('b').textContent();
        console.log(await products.nth(i).locator('b').textContent());
        if(productName == productName){
            console.log(await products.nth(i).locator('button').nth(1).textContent());
            await products.nth(i).locator('text=  Add To Cart').click();
            break;
        }
    }
    await cartPage.nth(0).click();
    await await validateProduct.nth(0).waitFor();
    expect(await validateProduct.nth(0).locator('h3').isVisible()).toBeTruthy();
    await checkoutButton.click();
    await creditCardField.first().fill('4542 9931 9292 2293');
    await ccDate.selectOption('05');
    await ccYear.selectOption('29');
    await cvv.fill('722');
    await nameOnCard.fill('Praveen Kumar Sundarraj');
    await countrySelect.pressSequentially('ind',{delay:150});
    await selectCountry.first().waitFor();
    const countryCount =await selectCountry.count();
    console.log(countryCount);
    for(let i=0;i<countryCount;i++){
        let text = await selectCountry.nth(i).textContent();
        console.log(text);
        if(text === ' India'){
            await selectCountry.nth(i).click();   
            break;
        }
    }
    await expect(await page.locator('div.user__name label').textContent()).toEqual(await page.locator('div.user__name input[type=\'text\']').inputValue());
    await submitOrder.click();
    expect(await thankYouText.textContent()).toEqual(' Thankyou for the order. ');
    const orderNumber = await orderid.textContent();
    console.log(orderNumber.replaceAll('|','').trim());
    await ordersTab.click();
    await orderList.first().waitFor();
    const orderCount = await orderList.count();
    for(let i=0;i<orderCount;i++){
        const chkOrderId = await orderList.locator('th').nth(i).textContent();
        if(orderNumber.includes(chkOrderId)){
            console.log(chkOrderId);
            console.log(await orderList.first().locator('td').nth(4).locator('button').click());
            break;
        }
    } 
    expect(await orderedId.textContent()).toEqual(orderNumber.replaceAll('|','').trim())

    
});
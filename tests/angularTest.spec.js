import {test,expect} from "@playwright/test"

test.only('Angular test scripting', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByLabel('Employed').check();
    await page.getByRole('link',{name: 'shop'}).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button',{name: 'Add'}).click();
    await page.pause();
    await page.getByRole('button',{name: 'Checkout'}).click();
    // await page.getAttribute('type = date');
});
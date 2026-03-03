import {test,expect} from '@playwright/test';

test('moreValidations',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://www.google.com');
    await page.goBack();
    await page.goForward();
    await page.goBack();
    
    //npx playwright test --debug -> this is user to debug the code line by line
    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();//helps to check whether the element is visible
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();//helps to check whether the element is hidden
    
    //handle alert popup
    await page.locator('#alertbtn').click();
    await page.on('dialog',dialog=>dialog.accept());//.on denotes the event to wait for the dialog box, dialog denotes the alert and accept denotes the OK button
    await page.locator('#alertbtn').click();
    await page.on('dialog',dialog=>dialog.dismiss());//.on denotes the event to wait for the dialog box, dialog denotes the alert and accept denotes the OK button
    
    //hover element
    await page.locator('#mousehover').hover();
    await page.locator('div.mouse-hover-content a').first().click();

    //Handle frames
    const newFrame = await page.frameLocator('#courses-iframe');//helps to switch and create a new page object by framing the new frame
    await newFrame.locator('a:has-text(\'Sign Up\')').click();
    await page.pause();

    //a[href='value']:visible -> this :visible helps to select the visible selector from the list of selectors available in DOM
});

test.only('screenshot validation',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //npx playwright test --debug -> this is user to debug the code line by line
    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();//helps to check whether the element is visible
    await page.locator('#displayed-text').screenshot({path:'./screenshots/screenshotSample2.png'});//take screenshot for element..
    await page.screenshot({path:'./screenshots/screenshotSample.png'});//take screenshot of whole page
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();//helps to check whether the element is hidden


});
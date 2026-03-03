import { test, expect } from '@playwright/test';

// test('First Sample Test' ,async ({browser}) => {
//     const context = await browser .newContext();
//     const page = await context.newPage();
//     await page.goto("httpS://www.google.com");
// });

test('First Sample Test without context' ,async ({page}) => {

    //Elements
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    const alertIncorrect = page.locator('[style*=\'block\']')
    const userRadio = page.locator('[value=\'user\']');
    const radioAlert = page.locator('#okayBtn');
    const userSelect = page.locator('select.form-control');
    const blinkText = page.locator('.blinkingText');
    const termsCheck = page.locator('#terms');

    //Script
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //Assertion - check title
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill('rahulshettyacadem');
    await password.fill('learning');
    await signIn.click();
    let errorMessage = await alertIncorrect.textContent();
    console.log(errorMessage.toString())
    expect(errorMessage).toContain("Incorrect");
    await userName.fill('rahulshettyacademy');
    await password.fill('learning');
    expect(await blinkText).toBeVisible();
    expect(await blinkText.isVisible()).toBeTruthy(); //can assert using the BOOLEAN value returned from output
    await expect(blinkText).toHaveAttribute('class','blinkingText'); //assert on valiating the element is present using the attribut name and value, need to put await in from because this action is performed on expect not inside the expect argument. 
    await userRadio.check(); //radio button check() and uncheck(), can also use click()
    expect(await userRadio).toBeChecked();
    await radioAlert.click();
    await userSelect.selectOption('teach'); //Select a dropdown using elecment with select and option tags 
    await termsCheck.check();
    expect(await termsCheck).toBeChecked();//assert that it is checked or not
    await termsCheck.uncheck();
    expect(await termsCheck.isChecked()).toBeFalsy()
    await signIn.click();
    // console.log(await cardTitles.nth(0).textContent());
    // //this also returns the first element...
    // console.log(await cardTitles.first().textContent());
    await cardTitles.first().waitFor(); // dynamic wait for one specific element to load
    await page.waitForLoadState('networkidle'); // wait until all the network calls are loaded for the page, but its bit flacky
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);
});

test('child window handling',async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const blinkText = page.locator('.blinkingText');
    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //handle async event to click the button for navigation and catch the new window launched event to assingn to a new page by updating the context
    const [childPage] = await Promise.all([
        context.waitForEvent('page'), //any method inside this should not have await because it will be waiting for each to complete and fail because both are depended on each other to occur parallel
        blinkText.click(),
    ]);
    
    const emailID = childPage.locator('p.red strong a');

    console.log(await childPage.title());
    const text = await emailID.textContent();
    const textValues = text.split('@');
    const domainName = textValues[1].trim();
    
    await userName.fill(domainName); // Can use the previous window by accessing the old page name ie. page is the window 1 and chidPage is window 2
    console.log(await userName.inputValue()); // input value gives the value which is added or alttered dynamically after the DOM loaded
    // Textcontent() will return the value when it is orginally with the DOM

});
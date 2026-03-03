import {test,expect} from '@playwright/test';

test('calendar testing', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const date = '16';
    const Month = '12';
    const year = '1992';
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('div.react-date-picker__inputGroup').waitFor();
    await page.locator('div.react-date-picker__inputGroup').click();
    await page.locator('span.react-calendar__navigation__label__labelText').waitFor();
    await page.locator('span.react-calendar__navigation__label__labelText').click();
    await page.locator('span.react-calendar__navigation__label__labelText').click();
    await page.locator('span.react-calendar__navigation__label__labelText').click();
    await page.locator('button.react-calendar__navigation__arrow').first().click();
    await page.locator('button.react-calendar__tile').last().waitFor();
    await page.locator('button.react-calendar__tile').last().click();
    await page.locator('button:has-text(\''+year+'\')').waitFor();
    await page.locator('button:has-text(\''+year+'\')').click();
    await page.locator('button.react-calendar__year-view__months__month').nth(Number(Month)-1).click();
    await page.locator('button abbr:has-text(\''+date+'\')').click();
    
});
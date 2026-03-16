import {test,expect} from '@playwright/test';
import excelWrite from './excelDemo';
test('Upload Download Test', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    await downloadPromise;
    const downloadFilePath = "C:/Users/admin/Downloads/download.xlsx";
    await excelWrite.writeExcel('Mango', 'price', 350, downloadFilePath);
    await page.locator('#fileinput').setInputFiles(downloadFilePath);
    const fruiteNames = page.locator('#cell-2-undefined');
    let count =await fruiteNames.count();
    for(let i=0;i<count;i++){
        if(await fruiteNames.nth(i).textContent() === 'Mango'){
            expect(await fruiteNames.nth(i).locator('~#cell-4-undefined').textContent()).toEqual('350');
            console.log(await fruiteNames.nth(i).textContent());
        }    
    }
});
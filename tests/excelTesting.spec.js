const ExcelJs = require('exceljs');

const Workbook = new ExcelJs.Workbook();
Workbook.xlsx.readFile('utils/testExcel.xlsx').then(function()
{
    const Sheet = Workbook.getWorksheet('Sheet1');
Sheet.eachRow((row,rowNumber) =>
{
    row.eachCell((cell,colNumber) =>
        {
            console.log(cell.value(),'\t');
        });
        console.log('\n');
});
});

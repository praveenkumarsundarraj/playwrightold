const excelJS = require('exceljs');

class excelWrite{
    async writeExcel(rowSearchValue, colSearchValue, changeValue, excelPath) {
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);
    const worksheet =await workbook.getWorksheet('Sheet1');
    const output = await this.readExcel(worksheet, rowSearchValue, colSearchValue);
    console.log(output);
    const cellValue = worksheet.getCell(output.rowNum, output.colNum);
    cellValue.value = changeValue;
    await workbook.xlsx.writeFile(excelPath);
}

async readExcel(worksheet, rowSearchValue, colSearchValue) {

    let output = { rowNum: -1, colNum: -1 };
    await worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, ColNumber) => {
            
            if (worksheet.getCell(rowNumber,2).value === rowSearchValue 
            && 
            worksheet.getCell(1,ColNumber).value === colSearchValue) {                
                output.rowNum = rowNumber;
                output.colNum = ColNumber;
            }
        })
    });
    return output;
}
}
module.exports = new excelWrite();
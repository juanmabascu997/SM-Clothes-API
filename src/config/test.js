const { getAuthToken, getSpreadSheet, getSpreadSheetValues } = require ( './createsheets.js' ); 
const spreadsheetId = '1X7eBWeFmCygbOevuOg8dFRmeRfRZ6ZKlRl-88V2EMAk'; 
const sheetName = 'Hoja 1'; 

async function testGetSpreadSheet ( ) { 
    try { 
        const auth = await getAuthToken(); 
        const response = await getSpreadSheet({ spreadsheetId, auth }) 

        console.log( 'output for getSpreadSheet' , JSON .stringify(response.data, null , 2 )); 
    } catch (error) { 
        console.log(error.message, error.stack); 
    } 
} 

async function testGetSpreadSheetValues ( ) { 
    try { 
        const auth = await getAuthToken(); 
        const response = await getSpreadSheetValues({ spreadsheetId, sheetName, auth }) 
        console.log( 'output for getSpreadSheetValues' , JSON .stringify(response.data, null , 2 )); 
    } catch (error) { 
        console.log(error.message, error.stack); 
    } 
} 

function test ( ) { 
    testGetSpreadSheet(); 
    testGetSpreadSheetValues(); 
}

module.exports = { test };

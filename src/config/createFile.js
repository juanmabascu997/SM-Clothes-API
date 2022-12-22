const { authorize } = require('./driveConfig')
const path = require('path');
const {google} = require('googleapis');
const fs = require('fs');

async function uploadFile(filePath,From) {
    try{
        authorize().then(
            async (client)=>{
                const drive = google.drive({version: 'v3', auth: client});
                const response = await drive.files.create({
                      media: {
                          name: From,
                          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                          body: fs.createReadStream(filePath),
                      },
                  });  
                  // report the response from the request
                  console.log("Drive upload");
            }
        )
    }catch (error) {
        //report the error message
        console.log(error.message);
    }
} 

module.exports = {
    uploadFile
}

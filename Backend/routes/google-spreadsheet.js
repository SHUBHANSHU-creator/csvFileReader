const router = require("express").Router();
const { google } = require("googleapis");
var bodyParser = require('body-parser')
const  parse  = require('csv-parser');
const multer = require('multer');
const fs = require('fs');

//adding the google authentication on basis of the credentils you downloaded while making a service account
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

//this is my unique spreadsheet Id
const spreadsheetId = "1NFHd_3OjVYOmyY3OXh_kc-q_fPsBHIG7qJODAlYh4zI";


//built this feature to ensure the interaction between the code and the sheet
router.get("/", async (req, res) => {

  // Create client instance for auth
  const client = await auth.getClient();
  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });

  res.send(getRows.data);
});


//Multer is used to store the files with desired name and at desired location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file (you can customize this)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });



router.post('/',upload.single('csvFile'), async (req, res) =>{
    // Write row(s) to spreadsheet
    // Create client instance for auth
    const client = await auth.getClient();
    // // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const {from,to} = req.body
    try {
      //check if you got the file or not
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }

      const results = []
      //parsing the csv data
      fs.createReadStream(req.file.path)
      .pipe(parse({ delimiter: ","}))
      .on("data", async (row) => {
        //slicing the rows according to the user
        const arow = Object.values(row).slice(from,to)
        results.push(arow)

      })
      //after parsing, send the data to your sheet
      .on("end", function () {
        const requestBody = {
          values: results,
        };
        googleSheets.spreadsheets.values.append({
          auth,
          spreadsheetId,
          range : 'Sheet1!A1',
          valueInputOption: "USER_ENTERED",
          resource: requestBody
        });
        // console.log("finished");
        res.send(results)
      })
      .on("error", function (error) {
        console.log(error.message);
      });

    } catch (error) {
      // console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    
})

module.exports = router
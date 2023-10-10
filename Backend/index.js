const express = require('express');
require('dotenv').config()
const  parse  = require('csv-parser');
const app = express();
const cors = require('cors');


app.use(cors());

//built a route to send the data to the sheet
app.use('/sheet',require('./routes/google-spreadsheet'))

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

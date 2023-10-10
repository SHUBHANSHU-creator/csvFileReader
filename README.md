## ✨ **Problem Statement: Crafting a CSV Importer for Google Sheets** ✨

**Context**:
Data analysts around the world 🌍, handle massive amounts of data to derive meaningful insights for their organization 📊. Among the tools they use, Google Sheets 📈 stands out due to its ease of use, accessibility, and collaborative features. However, many analysts have identified a recurring pain point: the cumbersome process of importing CSV files into Google Sheets repeatedly.

A typical week of an analyst in an e-commerce company 🛒 involves receiving multiple CSV files 📁 containing sales, inventory, customer feedback, and more. The data from these files needs to be meticulously analyzed and presented in the company’s weekly meetings. However, instead of diving directly into analysis, most analysts need to spend an inordinate amount of time just importing and structuring these CSV files into Google Sheets ⏳. This repetitive, time-consuming task reduces the efficiency of these professionals and delays the extraction of crucial insights 😫.


**Problem Statement**:
Make a CSV Importer for Google Sheets that lets users drag and drop CSV files onto the Google Sheet. The moment they drop the CSV file, allow them to select which columns to import 🗂️.


<!-- **Other pointers**:
- Import to Sheet – After validation and mapping, devise a method to populate the data into a chosen Google Sheet, either appending to existing data or creating a new sheet 📥📋.
- Optimize for Large Files – Large datasets are common in analytics. Your solution should effectively handle large CSV files (~15MB CSV file) without causing performance issues or prolonged waiting times 📈📦. -->


## Developer's Section
Vedio Link : https://drive.google.com/file/d/1G3Vk_0oOmZHhxzS2w5YpiyvjZ3fFzd4y/view?usp=sharing

Code description - 
I developed this project using MERN stack

FrontEnd - Using Reactjs and ChakraUI


Upload.js


I developed UI which will take input of a file (csv file) by either browing through your device or dragging and dropping the file

Add the from and to column number to select which columns you want to add to the google sheets

Backend - Expressjs, Nodejs

routes/google-spreadsheet.js
created apis
configured the google sheets api with my own credentials file which I downloaded after creating my service account 
added spreadsheet ID - which is unique for every sheet

made a post request which gets file, from and to from the body
csv-parser parses the file row by row and adds the data to results array. Creating batch of arrays
While parsing, I sliced the rows according the user from and to inputs.
then this results array was passed to google sheets api which adds the data to my file.
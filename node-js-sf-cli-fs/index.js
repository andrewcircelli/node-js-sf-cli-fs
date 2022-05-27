const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const contactsFileName = path.resolve("./csv-data", "Contact_Data.csv");

// callback pattern
// fs.readFile(contactsFileName, "utf8", (err, contactsFile) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(contactsFile);
// });

// promise pattern
const readContactsFilePromise = promisify(fs.readFile);
async function csvModule() {
  try {
    const contactsFile = await readContactsFilePromise(
      contactsFileName,
      "utf8"
    );
    parseFile(contactsFile);
  } catch (err) {
    // console.error(error);
    return [];
  }
}
// convert CSV into JSON file
const parseFile = (fileName) => {
  const records = [];
  let headers = [];
  // split row elements by new line character
  let rows = fileName.split("\n");
  rows.forEach((row, i) => {
    if (i === 0) {
      headers = row.split(",");
      return;
    }
    const record = {};
    const values = row.split(",");
    headers.forEach((header, i) => {
      record[header] = values[i];
    });
    records.push(record);
  });
  // console.log(JSON.stringify(records, null, 2));
  return JSON.stringify(records, null, 2);
};

csvModule();

module.exports = csvModule;

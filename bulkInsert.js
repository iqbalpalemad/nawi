const csv = require('async-csv');
const fs = require('fs').promises;
const dotenv = require('dotenv');

const nameService = require('./services/name');
const connectToMongoDB = require('./dbConnection');
(async() => {
  dotenv.config();
  const csvString = await fs.readFile('./names.csv', 'utf-8');
  console.log(csvString)
  const rows = await csv.parse(csvString);
  console.log(rows.flat().join(','))
  await connectToMongoDB();
  const result = await nameService.saveName({name : rows.flat().join(',')});
  console.log(result);
})();

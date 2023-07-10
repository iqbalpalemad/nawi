var express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
var app = express();
app.use(express.json());
const connectToMongoDB = require('./dbConnection');
const nameRoute = require('./routes/name');

connectToMongoDB();
app.use('/',nameRoute);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
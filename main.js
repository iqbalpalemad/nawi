var express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
var app = express();
app.use(cors());
app.use(express.json());
const connectToMongoDB = require('./dbConnection');
const nameRoute = require('./routes/name');

connectToMongoDB();
app.use('/',nameRoute);
app.listen(3000, function () {
  console.log('App running on port 3000');
});
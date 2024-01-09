const express = require("express");
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/', cors(), require('./routes/icalProcessor'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

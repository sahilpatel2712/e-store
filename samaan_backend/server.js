const express = require("express");
require("dotenv").config();
const cors = require("cors");

const bodyParser = require("body-parser");

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", require("./routes/index"));

app.listen(5000);

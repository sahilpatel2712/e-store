const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const bodyParser = require("body-parser");

let app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 48 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", require("./routes/index"));
app.use("/", require("./routes/admin"));

app.listen(5000);

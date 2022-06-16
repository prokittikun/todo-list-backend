const express = require("express");
const api = require("./app/router/api.js");
var createError = require('http-errors');
var cors = require('cors')
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const db = require("./app/model");
db.sequelize.sync();
app.use("/", api);
app.use("/", api);
app.use(function (req, res, next) {
//   next(createError(404));
  res.send('404')
});
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
module.exports = app;

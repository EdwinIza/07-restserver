const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./config/config");



const mongoose = require("mongoose");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require("./routes/usuario"));

app.use(require("./routes/categoria"));

app.use(require("./routes/producto"));

mongoose.connect("mongodb://localhost:27017/cafe", (err, res) => {
  if (err) throw err;
  console.log("Base de Datos Online");
});

app.listen(process.env.PORT, () => {
  console.log("escuchando el puerto", 3000);
});

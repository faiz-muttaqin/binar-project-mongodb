const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 7000;


require('dotenv').config();
//middleWare
app.use(morgan("dev"));
//middleware untuk akses get asset folder public di server
app.use(express.static("public"));

//middleware untuk convert dari fe ke be
app.use(express.json()); //terima dataa json
app.use(express.urlencoded({ extended: true }));

//middleware untuk tampilan
app.set("view engine", "ejs");

//untuk menjalankan server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//impor router dari routes
const Routes = require("./routes/routes");
app.use(Routes);

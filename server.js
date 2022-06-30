// const os = require(`os`);
// const luasSegitiga = require("./segitiga.js");
// const luasPersegi = require("./luasPersegi.js");
// const luasPersegiPanjang = require("./luasPersegiPanjang.js");
// const luasTrapesium = require("./luasTrapesium.js");
// const luasLingkaran = require("./luasLingkaran.js");

// console.log("luas segitiga = " + luasSegitiga(10, 10));
// console.log("luas Persegi = " + luasPersegi(20));
// console.log("luas Persegi Panjang = " + luasPersegiPanjang(30, 20));
// console.log("luas Trapesium = " + luasTrapesium(20, 30, 10));
// console.log("luas Lingkaran = " + luasLingkaran(20));

// const http = require("http");
// const fs = require("fs");
// const { json } = require("stream/consumers");

// function onRequest(request, respose) {
//   respose.writeHead(200, { ContentType: "text/html" });

//   //path / lokasi file yg di baca
//   fs.readFile("./views/index.html", null, function (error, data) {
//     if (error) {
//       respose.writeHead(404);
//       respose.write("File Not Found");
//       console.log("ini test");
//     } else {
//       respose.write(data);
//     }

//     respose.end();
//   });
// }

// function onJson(request, response) {
//   response.writeHead(200, { ContentType: "application/json" });
//   const data = {
//     title: "data mahasiswa",
//     result: [
//       { nama: "sasuke", nim: 283872 },
//       { nama: "naruto", nim: 283210 },
//       { nama: "sakura", nim: 283318 },
//     ],
//   };
//   response.end(JSON.stringify(data));
// }

// http.createServer(onJson).listen(7000);

const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 7000;

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

const morgan = require("morgan");
const express = require("express");
const homeController = require('./controller/home.controller');
const brandController = require('./controller/brand.controller');
const app = express();
const port = 3000;
const path = require("path");


//http logger
app.use(morgan("combined"));
app.use('', homeController);
app.use('/brand', brandController);
//template engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});

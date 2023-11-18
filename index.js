const morgan = require("morgan");
const express = require("express");
const homeController = require('./controller/home.controller');
const brandController = require('./controller/brand.controller');
const productController = require('./controller/product.controller');
const app = express();
const path = require("path");

//http logger
app.use(morgan("combined"));
app.use('', homeController);
app.use('/brand', brandController);
app.use('/product', productController);
//template engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(3000, () => {
  
  console.log(`Example app listening on port 3000`);
});

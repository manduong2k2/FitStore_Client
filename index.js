const morgan = require("morgan");
const express = require("express");
const homeController = require('./controller/home.controller');
const brandController = require('./controller/brand.controller');
const app = express();
const port = 3000;
const path = require("path");
const request = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

//http logger
app.use(morgan("combined"));
app.use('', homeController);
app.use('/brand', brandController);
//template engine
app.use('public',express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, async () => {
  const response = await request("http://jul2nd.ddns.net/product");
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
  }
  console.log(`Example app listening on port ${port}`);
});

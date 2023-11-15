const morgan = require("morgan");
const express = require("express");
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

//template engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, async () => {
  const response = await request("http://jul2nd.ddns.net/product");
  if (response.status === 200) {
    const data = await response.json();
    app.get("/", (req, res) => {
      res.render("home", { titlePage: "home", data: data });
    });
    app.get("/introduce", (req, res) => {
      res.render("introduce", { titlePage: "introduce" });
    });
    app.get("/signin", (req, res) => {
      res.render("signin", { titlePage: "Đăng nhập" });
    });
    app.get("/signup", (req, res) => {
      res.render("signup", { titlePage: "Đăng ký" });
    });
    console.log(data);
  }
  console.log(`Example app listening on port ${port}`);
});

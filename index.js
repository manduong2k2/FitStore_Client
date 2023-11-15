const morgan = require("morgan");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
//http logger
app.use(morgan("combined"));

//template engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("home", { titlePage: "Trang chủ" });
});
app.get("/introduce", (req, res) => {
  res.render("introduce", { titlePage: "Giới thiệu" });
});
app.get("/signin", (req, res) => {
  res.render("signin", { titlePage: "Đăng nhập" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { titlePage: "Đăng ký" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

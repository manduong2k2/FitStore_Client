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
  res.render("home", { titlePage: "home" });
});
app.get("/introduce", (req, res) => {
  res.render("introduce", { titlePage: "introduce" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

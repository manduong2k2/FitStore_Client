const express = require("express");
const router = express.Router();
const axios = require("axios");
router.use(express.json());
const cookieParser = require('cookie-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch'); 

router.use(express.urlencoded({ extended: true }));
const request = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/create", (req, res) => {
  res.render("category/createCategory", { titlePage: "Thêm category" });
});
router.get("/list", (req, res) => {
  axios.get("http://jul2nd.ddns.net/category").then((response) => {
    if (response.status === 200) {
      const data = response.data;
      res.render("category/listCategory", { titlePage: "Danh sách category", data: data });
    }
  });
});
module.exports = router;
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
  res.render("product/createProduct", { titlePage: "Thêm sản phẩm" });
});
router.get("/list", (req, res) => {
  axios.get("http://jul2nd.ddns.net/product").then((response) => {
    if (response.status === 200) {
      const data = response.data;
      res.render("product/listProduct", { titlePage: "Danh sách sản phẩm", data: data });
    }
  });
});
module.exports = router;
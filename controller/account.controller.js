const express = require("express");
const router = express.Router();
const axios = require("axios");
router.use(express.json());
const cookieParser = require('cookie-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch'); 
const jwt = require('jsonwebtoken');

router.use(express.urlencoded({ extended: true }));
const request = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
router.get("/detail", (req, res) => {
  var token = localStorage.getItem('token');
  decodedToken = jwt.verify(token, 'ABC'); 
  const { roles } = decodedToken;
  res.render("account/detailAccount", { titlePage: "Thông tin tài khoản",isAdmin: roles.some((role) => [1, 2].includes(role.id)) });
});
router.get("/list", (req, res) => {
  axios.get("http://jul2nd.ddns.net/account").then((response) => {
    if (response.status === 200) {
      const data = response.data;
      res.render("account/listAccount", { titlePage: "Danh sách tài khoản", data: data });
    }
  });
});
module.exports = router;

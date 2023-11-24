const express = require("express");
const router = express.Router();
const axios = require("axios");
router.use(express.json());
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch'); 
const request = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.use(express.urlencoded({ extended: true }));


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
router.get("/details/:id", async (req, res) => {
  try{
    const response = await request('http://jul2nd.ddns.net/product/'+req.params.id,{
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    res.render("product/detailProduct", { titlePage: "Chi tiết sản phẩm" , product: data.product , solds: data.solds});
  }catch(err){
    res.send(err);
  }
});
module.exports = router;
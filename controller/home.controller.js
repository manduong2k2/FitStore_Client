const express = require("express");
const router = express.Router();
router.use(express.json());  // Place this before express.static()
const path = require("path");
router.use(express.static(path.join(__dirname, "public")));
const request = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

router.get("/", (req, res) => {
  res.render("home", { titlePage: "Trang chủ" });
});
router.get("/product", async (req, res) => {
    const response = await request("http://jul2nd.ddns.net/product");
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
  
    res.render("product", { titlePage: "Sản phẩm", data: data });
  }});
router.get("/contact", (req, res) => {
  res.render("contact", { titlePage: "Liên hệ" });
});
router.get("/introduce", (req, res) => {
  res.render("introduce", { titlePage: "Giới thiệu" });
});
router.get("/signup", (req, res) => {
  res.render("signup", { titlePage: "Đăng ký" });
});
router.get("/signin", (req, res) => {
  res.render("signin", { titlePage: "Đăng nhập" });
});
module.exports = router;

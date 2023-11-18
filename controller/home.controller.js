const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.render("home", { titlePage: "Trang chủ" });
});
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

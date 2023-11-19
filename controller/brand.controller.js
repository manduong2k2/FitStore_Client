const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.json());
router.get("/create", (req, res) => {
  res.render("brand/createBrand", { titlePage: "Trang chủ" });
});
module.exports = router;
const express = require("express");
const router = express.Router();

router.use(express.json());
router.get("/create", (req, res) => {
  res.render("brand/createBrand", { titlePage: "Trang chủ" });
});
module.exports = router;
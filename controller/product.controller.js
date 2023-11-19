const express = require("express");
const router = express.Router();
router.use(express.json());
router.get("/create", (req, res) => {
  res.render("product/createProduct", { titlePage: "Thêm sản phẩm" });
});
module.exports = router;
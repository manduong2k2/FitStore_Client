const express = require("express");
const router = express.Router();
router.use(express.json());
router.get("/detail", (req, res) => {
  res.render("account/detailAccount", { titlePage: "Thông tin tài khoản" });
});
module.exports = router;

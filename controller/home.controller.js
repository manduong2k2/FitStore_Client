const express = require("express");
const router = express.Router();
router.use(express.json());

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
})
//
router.use(cookieParser());
//
router.post('/login', (req, res) => {
  // Gửi yêu cầu đăng nhập tới server
  axios.post('http://jul2nd.ddns.net/account/login', {
    username: req.body.email,
    password: req.body.password
  })
  .then(response => {
    // Lưu session ID vào cookie
    var account = JSON.parse(response.data.account);
    console.log(account);
    res.cookie('id', account.id );
    res.cookie('username', account.username);
    res.cookie('name', account.name);
    res.cookie('image', account.image);
    res.cookie('email', account.email);
    res.cookie('sessionId', response.data.sessionId);
    res.redirect('/');
  })
  .catch(error => {
    res.send(error);
  });
});
router.get('/logout', (req, res) => {
  // Xóa cookie có tên 'sessionId'
  res.clearCookie('sessionId', { SameSite: 'None', httpOnly: false, secure: true });
  res.clearCookie('id', { SameSite: 'None', httpOnly: false, secure: true });
  res.clearCookie('username', { SameSite: 'None', httpOnly: false, secure: true });
  res.clearCookie('name', { SameSite: 'None', httpOnly: false, secure: true });
  res.clearCookie('image', { SameSite: 'None', httpOnly: false, secure: true });
  res.clearCookie('email', { SameSite: 'None', httpOnly: false, secure: true });
  res.redirect('/');
});
router.get('/protected', async (req, res) => {
    try {
      const response = await axios.get('http://jul2nd.ddns.net/account/protected', { withCredentials: true });
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ message: error.response.data.message });
    }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require('axios');
router.use(express.json());
const cookieParser = require('cookie-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.use(express.urlencoded({ extended: true }));
const request = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get("/", (req, res) => {
  res.render("home", { titlePage: "Trang chủ" });
});
router.get("/product", async (req, res) => {
  axios.get("http://jul2nd.ddns.net/product")
  .then(response => {
    if (response.status === 200) {
      const data = response.data;
      res.render("product", { titlePage: "Sản phẩm", data: data });
    }
  })
  
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
  const message = req.query.message ;
  res.render("signin", { titlePage: "Đăng nhập" , message});
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
    if(response.message === 401){
    }
    else{
      var account = JSON.parse(response.data.account);
      console.log(account);
      res.cookie('id', account.id );
      res.cookie('username', account.username);
      res.cookie('name', account.name);
      res.cookie('image', account.image);
      res.cookie('email', account.email);
      res.cookie('token', response.data.token);
      localStorage.setItem('token',response.data.token);
      res.redirect('/');
    }
  })
  .catch(error => {
    const message = '';
    res.redirect('/signin?message=Sai thông tin đăng nhập');
  });
});
router.get('/logout', (req, res) => {
  try{
    request('http://jul2nd.ddns.net/account/logout',{
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    .then(response =>{
      console.log(response);
    }).catch(error =>{
      console.log(error);
    });
    res.clearCookie('id', { SameSite: 'None', httpOnly: false, secure: true });
    res.clearCookie('username', { SameSite: 'None', httpOnly: false, secure: true });
    res.clearCookie('name', { SameSite: 'None', httpOnly: false, secure: true });
    res.clearCookie('image', { SameSite: 'None', httpOnly: false, secure: true });
    res.clearCookie('email', { SameSite: 'None', httpOnly: false, secure: true });
    res.redirect('/');
  }catch (err){
    console.log(err);
  }
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

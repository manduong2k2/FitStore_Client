const express = require("express");
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
router.use(express.json());
const cookieParser = require('cookie-parser');
var LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch'); 

router.use(express.urlencoded({ extended: true }));
const request = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get("/", (req, res) => {
  var token = localStorage.getItem('token');
  if(token){
    decodedToken = jwt.verify(token, 'ABC'); 
    const { roles } = decodedToken;
    res.render("home", { titlePage: "Trang chủ" ,isAdmin: roles.some((role) => [1, 2].includes(role.id))});
  }
  else{
    res.render("home", { titlePage: "Trang chủ" ,isAdmin: false});
  }
});
router.get("/signup", (req, res) => {
  res.render("signup", { titlePage: "Đăng ký" , isAdmin: false});
});
router.get("/signin", (req, res) => {
  const message = req.query.message ;
  res.render("signin", { titlePage: "Đăng nhập" , message, isAdmin: false});
})
router.get("/forgot", (req, res) => {
  res.render("forgotPassword", { titlePage: "Quên mật khẩu" , isAdmin: false});
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
      res.cookie('name', account.name);
      res.cookie('image', account.image);
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
    res.clearCookie('name', { SameSite: 'None', httpOnly: false, secure: true });
    res.clearCookie('image', { SameSite: 'None', httpOnly: false, secure: true });
    res.clearCookie('token', { SameSite: 'None', httpOnly: false, secure: true });
    localStorage.removeItem('token');
    res.redirect('/');
  }catch (err){
    console.log(err);
  }
});
module.exports = router;
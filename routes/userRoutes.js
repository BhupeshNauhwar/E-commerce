const express = require('express');
const session = require('express-session');
 
const config = require('../config/config');
const auth = require('../middleware/auth');
const usercontroller = require('../controllers/usercontrollers');

const user_route = express();

user_route.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 7*4*60*60*1000}
}));

user_route.set('view engine', 'hbs');
user_route.set('views', './views/user');
user_route.use(express.json());
user_route.use(express.urlencoded({ extended: true }));
user_route.use(express.static('public'));

user_route.get('/register', auth.isLogout, usercontroller.loadRegister);
user_route.post('/register', auth.isLogout, usercontroller.insertUser);
user_route.get('/', auth.isLogout, usercontroller.loginload);
user_route.get('/login', usercontroller.loginload);
user_route.post('/login', usercontroller.verifyLogin);
user_route.get('/home', auth.isLogin, usercontroller.loadHome);
user_route.get('/men', auth.isLogin, usercontroller.loadMen);
user_route.get('/women', auth.isLogin, usercontroller.loadWomen);
user_route.get('/kid', auth.isLogin, usercontroller.loadKid);
user_route.get('/cart', auth.isLogin, usercontroller.loadCart);
user_route.post('/cart', auth.isLogin, usercontroller.addtocart);
user_route.get('/cart/removeproduct', auth.isLogin, usercontroller.loadremoveproduct);
user_route.post('/cart/removeproduct', auth.isLogin, usercontroller.removeproduct);

user_route.get('/cart/buyremoveproduct', auth.isLogin, usercontroller.loadbuyremoveproduct);
user_route.post('/cart/buyremoveproduct', auth.isLogin, usercontroller.buyremoveproduct);
user_route.get('/payment', auth.isLogin, usercontroller.loadPayment);
user_route.get('/order',auth.isLogin,usercontroller.loadOrder)
user_route.get('/logout', auth.isLogin, usercontroller.userLogout);

module.exports = user_route;

const express=require('express')
const user_route=express();
const session=require("express-session");
//session
const config=require('../config/config')
user_route.use(session({secret:config.sessionSecret}))

const auth=require('../middleware/auth')
user_route.set('view engine','hbs');
user_route.set('views','./views/user');
user_route.use(express.json());
user_route.use(express.urlencoded({extended:true}))
user_route.use(express.static('public'));

const usercontroller=require("../controllers/usercontrollers");

user_route.get('/register',auth.isLogout,usercontroller.loadRegister);

user_route.post('/register',usercontroller.insertUser);
user_route.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

 
//user_route.get('/verifiy',usercontroller.verifyMail);
user_route.get('/',auth.isLogout,usercontroller.loginload);
user_route.get('/login',usercontroller.loginload);
user_route.post('/login',usercontroller.verifyLogin);
user_route.get('/home',auth.isLogin,usercontroller.loadHome)
user_route.get('/men',auth.isLogin,usercontroller.loadMen)
user_route.get('/women',auth.isLogin,usercontroller.loadWomen)
user_route.get('/kid',auth.isLogin,usercontroller.loadKid)
user_route.get('/cart',auth.isLogin,usercontroller.loadCart)
user_route.post('/cart',auth.isLogin,usercontroller.addtocart)
user_route.get('/cart/removeproduct',auth.isLogin,usercontroller.loadremoveproduct)
 user_route.post('/cart/removeproduct',auth.isLogin,usercontroller.removeproduct);
 user_route.get('/payment',auth.isLogin,usercontroller.loadPayment)
user_route.get('/logout',auth.isLogout,usercontroller.userLogout)
module.exports=user_route;


const express=require('express')
const admin_route=express();
 const session=require("express-session");

const config=require('../config/config')

admin_route.use(session({
    secret: config.sessionSecret,
    resave: true, 
    saveUninitialized: true, 
    cookie: { maxAge: 3600000 }, 
}));

admin_route.use(express.json());
admin_route.use(express.urlencoded({extended:true}))
admin_route.set('view engine','hbs');
admin_route.set('views','./views/admin');
admin_route.use(express.json());
admin_route.use(express.urlencoded({extended:true}))
admin_route.use(express.static('public'));

const auth=require('../middleware/adminauth');
const admincontroller=require("../controllers/admincontroller");



admin_route.get('/',auth.isLogout,admincontroller.loadLogin)
admin_route.post('/',admincontroller.verifyLogin)



admin_route.get('/home',auth.isLogin,admincontroller.loadDashboard);//data yha pr chahiye line no-44
admin_route.get('/logout',auth.isLogout,admincontroller.logout);

admin_route.get('/newproductmen',auth.isLogin,admincontroller.loadnewproductmen);
admin_route.post('/newproductmen',auth.isLogin,admincontroller.insertProductmen);
admin_route.get('/newproductwomen',auth.isLogin,admincontroller.loadnewproductwomen);
admin_route.post('/newproductwomen',auth.isLogin,admincontroller.insertProductwomen);
admin_route.get('/newproductkid',auth.isLogin,admincontroller.loadnewproductkid);
admin_route.post('/newproductkid',auth.isLogin,admincontroller.insertProductkid);

admin_route.get('/mendata',auth.isLogin,admincontroller.loadmendata);
admin_route.get('/deletemenproduct',auth.isLogin,admincontroller.loaddeleteproductmen);
admin_route.post('/deletemenproduct',auth.isLogin,admincontroller.deleteproductmen);



admin_route.get('/womendata',auth.isLogin,admincontroller.loadwomendata);
admin_route.get('/deletewomenproduct',auth.isLogin,admincontroller.loaddeleteproductwomen);
admin_route.post('/deletewomenproduct',auth.isLogin,admincontroller.deleteproductwomen);

admin_route.get('/kiddata',auth.isLogin,admincontroller.loadkiddata);
admin_route.get('/deletekidproduct',auth.isLogin,admincontroller.loaddeleteproductkid);
admin_route.post('/deletekidproduct',auth.isLogin,admincontroller.deleteproductkid);

admin_route.get('*',function(req,res){
    res.redirect('/admin');
})
module.exports=admin_route;
const mongoose = require('mongoose');
const { query } = require('express');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const Men=require('../models/men');
const Women=require('../models/women');
const Kid=require('../models/kid');
const Cart=require('../models/cart')
const Order=require('../models/orders')
const NewOrder=require('../models/newOrders');

const session = require('express-session');



const securePassword=async(password)=>{
    try {
        const passwordHash=await bcrypt.hash(password,5);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}




const loadRegister=async(req,res)=>{
    try {
        res.render('register')
    } catch (error) {
        console.log(error.message)
    }
}
const insertUser=async(req,res)=>{
    try {
        const spassword= await securePassword(req.body.password);
       const user=new User({
            name:req.body.name,
            mobile:req.body.mob,
            email:req.body.email,
            password:spassword,
            address:req.body.address,
            pincode:req.body.pc,
            is_admin:0,
       });  
       
       
        const userData= await user.save();
        
      if(userData){
               res.render('register',{message:"Your Registration has been done"})
      } 
      else{
        res.render('register',{message:"Your Registration has been failed"})
      }
    } catch (error) {
        console.log(error.message);   
    }
}



    const loginload=async(req,res)=>{
        try {
             
            res.render('login')

        } catch (error) {
            console.log(error.message);
            
        }
    }
const verifyLogin=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const userData=await User.findOne({email:email});
        if(userData){
            const passwordMatch= await bcrypt.compare(password,userData.password);
            
            if (passwordMatch) {
               
                req.session.user_id = userData._id.toString();
                
                   
                    
                 res.redirect('/home')
            } else {
                res.render('login',{message:' password is incorrect'})
            }
        }
        else{
            res.render('login',{message:'Email and password is incorrect'})
        }
    } catch (error) {
        console.log(error.message);
    }
}    
const loadHome=async(req,res)=>{    try {
    const productdata1 = await  Men.find({ p: 1 });
    const productdata2 = await  Women.find({ p: 1 });
    const productdata3 = await  Kid.find({ p: 1 });
        
  
    
    const newdata1 = await Men.find({ j: 1 })
    const newdata2 = await  Women.find({ j: 1 });
    const newdata3 = await  Kid.find({ j: 1 });   
      
        res.render('home',{user1:productdata1,user2:productdata2,user3:productdata3,newdata2:newdata2,newdata1:newdata1,newdata3:newdata3});

    } catch (error) {
        console.log(error.message);
        
    }
}

const loadMen = async (req, res) => {
    try {
        const userData = await Men.find({ is_men: 1 });
        const userData1 = await User.findById(req.session.user_id);
        


        const name = userData1.name;
        const userId = userData1._id;

        if (req.body.url && req.body.cprice) {
            const url = req.body.url;
            const cprice = req.body.cprice;

            const cart = await Cart.findOne({ _id: userId });

            if (cart) {
                cart.products.push({ url, cprice });
                await cart.save();
            } else {
                const newCart = new Cart({
                    id:userId,
                    name: name,
                    products: [{ url, cprice }]
                });
                await newCart.save();
            }
        }

        res.render('Men', { admin: userData });
    } catch (error) {
        console.error(error.message);
       
    }
}

const loadWomen = async (req, res) => {
    try {
        const userData = await Women.find({ is_women: 1 });
        const userData1 = await User.findById(req.session.user_id);
        
        

        const name = userData1.name;
        const userId = userData1._id;
        if (req.body.url && req.body.cprice) {
            const url = req.body.url;
            const cprice = req.body.cprice;

            const cart = await Cart.findOne({ _id: userId });

            if (cart) {
                cart.products.push({ url, cprice });
                await cart.save();
            } else {
                const newCart = new Cart({
                    id:userId,
                    name: name,
                    products: [{ url, cprice }]
                });
                await newCart.save();
            }
        }

        res.render('women', {  admin: userData });
    } catch (error) {
        console.error(error.message);
        
    }
}


const loadKid = async (req, res) => {
    try {
        const userData = await Kid.find({ is_kid: 1 });
        const userData1 = await User.findById(req.session.user_id);
        
       

        const name = userData1.name;
        const userId = userData1._id;
        if (req.body.url && req.body.cprice) {
            const url = req.body.url;
            const cprice = req.body.cprice;

            const cart = await Cart.findOne({ _id: userId });

            if (cart) {
                cart.products.push({ url, cprice });
                await cart.save();
            } else {
                const newCart = new Cart({
                    id:userId,
                    name: name,
                    products: [{ url, cprice }]
                });
                await newCart.save();
            }
        }

        res.render('kid', { admin: userData });
    } catch (error) {
        console.error(error.message);
       
    }
}
const addtocart = async (req, res) => {
    try {
        const userData = await User.findById(req.session.user_id);
        const userId = userData._id;
        const url = req.body.url;
        const cprice = req.body.cprice;
        const id = req.body.id;
        const productName = req.body.category;

        let cart = await Cart.findOne({ id: userId });

        if (cart) {
            const existingProductIndex = cart.cartProducts.findIndex(product => product.id === id);

            if (existingProductIndex === -1) {
                cart.cartProducts.push({ url, cprice, id, productName });
            } else {
                cart.cartProducts[existingProductIndex] = { url, cprice, id, productName };
            }

            await cart.save();
        } else {
            cart = new Cart({
                id: userId,
                name: userData.name,
                cartProducts: [{ url, cprice, id, productName }]
            });

            await cart.save();
        }

        res.render(loadHome(req, res));
    } catch (error) {
        console.log(error.message);
    }
};

  


const loadCart = async (req, res) => {
    try {
        const userData = await User.findById(req.session.user_id);
        const cart = await Cart.findOne({ id: req.session.user_id });

        let cartdata = [];
        if (cart) {
            cartdata = cart.cartProducts;
        }
        //console.log(cartdata);
       // console.log( cartProducts);
        res.render('cart', { cartdata: cartdata, userData: userData });
    } catch (error) {
        console.log(error.message);
        // Handle errors appropriately
    }
};


const loadremoveproduct=async(req,res)=>{
    try {
        res.render('cart')
    } catch (error) {
        console.log(error.message);
    }
}
const removeproduct = async (req, res) => {
    try {
        
        const productIdToRemove = req.body.id;
       
        
       
        const userId=req.session.user_id

       
              
        
        
        const userCart = await Cart.findOne({ id: userId });
        
           
        userCart.cartProducts = userCart.cartProducts.filter(product => product._id.toString() !== productIdToRemove);
        
        
        await userCart.save();

        
        res.redirect('/cart');
    } catch (error) {
        
        console.log( error.message);
        
    }
};

const loadbuyremoveproduct=async(req,res)=>{
    try {
        res.render('cart')
    } catch (error) {
        console.log(error.message);
    }
}
const buyremoveproduct = async (req, res) => {
    try {
        
        const userData = await User.findById(req.session.user_id);
        const userName = userData.name;
        const userId = userData._id;
        const email = userData.email;
        const address = userData.address;
        const mobile = userData.mobile;
        const pincode = userData.pincode;
        const url = req.body.url;
        const cprice = req.body.cprice;
        const productIdToRemove = req.body.id;

       
        let order = await Order.findOne({ _id: userId });
        if (order) {
            order.orderProducts.push({ url, cprice, id: productIdToRemove });
            await order.save();
        } else {
            order = new Order({
                id:userId,
                name: userName,
                orderProducts: [{ url, cprice, id: productIdToRemove }]
            });
            await order.save();
        }

        let newOrder = await NewOrder.findOne({ id:userId });
        console.log(newOrder)
        if (newOrder) {
            newOrder.orderProducts.push({ url, cprice, id: productIdToRemove });
        } else {
            newOrder = new NewOrder({
                id:userId,
                name: userName,
                email: email,
                mobile: mobile,
                address: address,
                pincode: pincode,
                orderProducts: [{ url, cprice, id: productIdToRemove }]
            });
        }
        await newOrder.save();

        const userCart = await Cart.findOne({ id: userId });
        if (userCart) {
            userCart.cartProducts = userCart.cartProducts.filter(product => product._id.toString() !== productIdToRemove);
            await userCart.save();
        } 

        res.redirect('/payment');
    } catch (error) {
        console.error( error);
        }
};


const loadPayment=async(req,res)=>{
    try {
        res.render('payment')
    } catch (error) {
        console.log(error.message);
    }
}
const loadOrder = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findById(userId);
        
        const userName = user.name;
        const userOrders = await Order.find({id: userId }).populate('orderProducts');
        
        res.render('order', { orders: userOrders });
    } catch (error) {
        console.error(error.message);
       
    }
};


const userLogout = async (req, res) => {
    try {
        

        req.session.destroy();
        
        
        res.redirect('/');
    } catch (error) {
        console.log( error.message);
    }
}


module.exports={
    loadRegister,insertUser,loginload,verifyLogin, loadHome,loadMen,userLogout,loadWomen,loadKid,loadCart,addtocart,loadremoveproduct,removeproduct,loadPayment,loadbuyremoveproduct,buyremoveproduct,loadOrder
}

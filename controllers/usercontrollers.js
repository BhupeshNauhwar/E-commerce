const mongoose = require('mongoose');
const { query } = require('express');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const Men=require('../models/men');
const Women=require('../models/women');
const Kid=require('../models/kid');
const Cart=require('../models/cart')
const Order=require('../models/orders')
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
            console.log(req.session);  
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
                //req.session.user_id
                // console.log(userData._id.toString())
                req.session.user_id = userData._id.toString();
                
                    //console.log(userData._id);
                //  console.log(req.session.user_id)
                    console.log(req.session);
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
        
        if (!userData1) {
            throw new Error('User not found');
        }

        const name = userData1.name;

        if (req.body.url && req.body.cprice) {
            const url = req.body.url;
            const cprice = req.body.cprice;

            const cart = await Cart.findOne({ name: name });

            if (cart) {
                cart.products.push({ url, cprice });
                await cart.save();
            } else {
                const newCart = new Cart({
                    name: name,
                    products: [{ url, cprice }]
                });
                await newCart.save();
            }
        }

        res.render('men', { message: "Product added in Cart", admin: userData });
    } catch (error) {
        console.error(error.message);
       
    }
}

const loadWomen = async (req, res) => {
    try {
        const userData = await Women.find({ is_women: 1 });
        const userData1 = await User.findById(req.session.user_id);
        
        if (!userData1) {
            throw new Error('User not found');
        }

        const name = userData1.name;

        if (req.body.url && req.body.cprice) {
            const url = req.body.url;
            const cprice = req.body.cprice;

            const cart = await Cart.findOne({ name: name });

            if (cart) {
                cart.products.push({ url, cprice });
                await cart.save();
            } else {
                const newCart = new Cart({
                    name: name,
                    products: [{ url, cprice }]
                });
                await newCart.save();
            }
        }

        res.render('women', { message: "Product added in Cart", admin: userData });
    } catch (error) {
        console.error(error.message);
        
    }
}


const loadKid = async (req, res) => {
    try {
        const userData = await Kid.find({ is_kid: 1 });
        const userData1 = await User.findById(req.session.user_id);
        
        if (!userData1) {
            throw new Error('User not found');
        }

        const name = userData1.name;

        if (req.body.url && req.body.cprice) {
            const url = req.body.url;
            const cprice = req.body.cprice;

            const cart = await Cart.findOne({ name: name });

            if (cart) {
                cart.products.push({ url, cprice });
                await cart.save();
            } else {
                const newCart = new Cart({
                    name: name,
                    products: [{ url, cprice }]
                });
                await newCart.save();
            }
        }

        res.render('kid', { message: "Product added in Cart", admin: userData });
    } catch (error) {
        console.error(error.message);
       
    }
}
const addtocart = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.user_id });
        const name = userData.name;
        const url = req.body.url;
        const cprice = req.body.cprice;
        const id = req.body.id;
        const productName = req.body.category
        ;

        const cart = await Cart.findOne({ name: name });

        if (cart) {
            const existingProductIndex = cart.cartProducts.findIndex(product => product.id === id);

            if (existingProductIndex === -1) {
                
                cart.cartProducts.push({ url, cprice, id,productName });
            } else {
                
                cart.cartProducts[existingProductIndex] = { url, cprice, id,productName };
            }

            await cart.save();
        } else {
            
            const newCart = new Cart({
                name: name,
                cartProducts: [{ url, cprice, id ,productName}]
            });

            await newCart.save();
            console.log( await newCart.save());
        }
        
        res.render(loadHome(req,res), { message: "Product added in Cart" });
    } catch (error) {
        console.log(error.message);
        
    }
};

  
const loadCart = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.user_id });
        const cartdata = await Cart.find({});

            const filteredCartData = cartdata.map(cart => {
            const filteredProducts = cart.cartProducts.filter(product => product.url && product.cprice);
            return {
                _id: cart._id,
                name: cart.name,
                cartProducts: filteredProducts
            };
        });

        res.render('cart', { cartdata: filteredCartData, userData: userData });
    } catch (error) {
        console.log(error.message);
        
       

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
        const idc=await Cart.find({})
        console.log(idc)
        
        
          
          
          const userName = idc[0].name;
          
          
        const userCart = await Cart.findOne({ name: userName });
       
        if (userCart) {
           
            userCart.cartProducts = userCart.cartProducts.filter(product => product._id.toString() !== productIdToRemove);
        
           
            await userCart.save();
        
            res.redirect('/cart');         
        } 
    } catch (error) {
        console.log(error.message);
       
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
        const url = req.body.url;
        const cprice = req.body.cprice;
        const productIdToRemove = req.body.id;

        const order = await Order.findOne({ name: userName });

        if (order) {
            order.orderProducts.push({ url, cprice, id: productIdToRemove });
            await order.save();

            const userCart = await Cart.findOne({ name: userName });

            if (userCart) {
                userCart.cartProducts = userCart.cartProducts.filter(product => product._id.toString() !== productIdToRemove);
                await userCart.save();
            } else {
                console.log('Cart not found for user:', userName);
            }
        } else {
            const newOrder = new Order({
                name: userName,
                orderProducts: [{ url, cprice, id: productIdToRemove }]
            });
            await newOrder.save();

            const userCart = await Cart.findOne({ name: userName });

            if (userCart) {
                userCart.cartProducts = [];
                await userCart.save();
            } 
        }

        res.redirect('/payment');
    } catch (error) {
        console.error('Error in buyremoveproduct:', error);
       
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
        const userOrders = await Order.find({ name: userName }).populate('orderProducts');
        
        res.render('order', { orders: userOrders });
    } catch (error) {
        console.error(error.message);
       
    }
};


const userLogout = async (req, res) => {
    try {
        console.log("Logging out user:", req.session.user_id.toString());

        req.session.destroy();
        // res.clearCookie('connect.sid');
        console.log("Session destroyed.");
        res.redirect('/');
    } catch (error) {
        console.log("Error logging out:", error.message);
    }
}


module.exports={
    loadRegister,insertUser,loginload,verifyLogin, loadHome,loadMen,userLogout,loadWomen,loadKid,loadCart,addtocart,loadremoveproduct,removeproduct,loadPayment,loadbuyremoveproduct,buyremoveproduct,loadOrder
}

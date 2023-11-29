const mongoose = require('mongoose');
const { query } = require('express');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const Men=require('../models/men');
const Women=require('../models/women');
const Kid=require('../models/kid');
const Cart=require('../models/cart')
const session = require('express-session');

const {STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY}=process.env;
const stripe=require('stripe')(STRIPE_SECRET_KEY)

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


//login user method start
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
                
                req.session.user_id=userData._id;
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

//load men page
const loadMen=async(req,res)=>{
    try {
        const userData=await Men.find({is_men:1})
        const userData1 = await User.findById({ _id: req.session.user_id });
        await addtocart(req, res);
        const name = userData1.name;
        const url1 = req.body.url1;
        const cprice = req.body.cprice;
        const dpi = req.body.dpi;

        const cart = await Cart.findOne({ name: name });

        if (cart) {
            // If a cart exists for the user, update the existing cart
            await Cart.updateOne(
                { name: name },
                { $push: { dpi: req.body.dpi } }
            );
        } else {
           
            const newCart = new Cart({
                name: name,
                url1: req.body.url1,
                cprice: req.body.cprice,
                dpi: [req.body.dpi], 
            });

            await newCart.save();
        }
        
        res.render('men',{ message: "Product added in Cart",admin:userData})
    
       
        
    } catch (error) {
        console.log(error.message);
        
    }
}
//load women page
const loadWomen=async(req,res)=>{
    try {
        
       const userData=await Women.find({is_women:1})
        const userData1 = await User.findById({ _id: req.session.user_id });
        await addtocart(req, res);
        const name = userData1.name;
        const url1 = req.body.url1;
        const cprice = req.body.cprice;
        const dpi = req.body.dpi;

        const cart = await Cart.findOne({ name: name });

        if (cart) {
           
            await Cart.updateOne(
                { name: name },
                { $push: { dpi: req.body.dpi } }
            );
        } else {
           
            const newCart = new Cart({
                name: name,
                url1: req.body.url1,
                cprice: req.body.cprice,
                dpi: [req.body.dpi], 
            });

            await newCart.save();
        }
        res.render('women',{ message: "Product added in Cart",admin:userData})
    } catch (error) {
        console.log(error.message);
        
    }
}

//load kid page
const loadKid=async(req,res)=>{
    try {
        const userData=await Kid.find({is_kid:1})
        const userData1 = await User.findById({ _id: req.session.user_id });
        await addtocart(req, res);
        const name = userData1.name;
        const url1 = req.body.url1;
        const cprice = req.body.cprice;
        const dpi = req.body.dpi;

        const cart = await Cart.findOne({ name: name });

        if (cart) {
            await Cart.updateOne(
                { name: name },
                { $push: { dpi: req.body.dpi } }
            );
        } else {
           
            const newCart = new Cart({
                name: name,
                url1: req.body.url1,
                cprice: req.body.cprice,
                dpi: [req.body.dpi], 
            });

            await newCart.save();
        }

        

        
        
        res.render('kid',{ message: "Product added in Cart",admin:userData})
    } catch (error) {
        console.log(error.message);
        
    }
}
const addtocart = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.user_id });
        const name = userData.name;
        const url1 = req.body.url1;
        const cprice = req.body.cprice;
        const id = req.body.id;

        const cart = await Cart.findOne({ name: name });

        if (cart) {
            
            const existingProductIndex = cart.cartProducts.findIndex(product => product.id === id);
                
            if (existingProductIndex === -1) {
                
                cart.cartProducts.push({ url1, cprice, id });
                await cart.save();
            } else {
               
                console.log('Product with the same id already exists. Choose to update or ignore.');
            }
        } else {
           
            const newCart = new Cart({
                name: name,
                cartProducts: [{ url1, cprice, id }]
            });

            await newCart.save();
        }

        res.render(loadHome(req, res), { message: "Product added in Cart" });
    } catch (error) {
        console.log(error.message);
        // Handle the error appropriately
    }
};

  

  const loadCart = async (req, res) => {
    try {
      const userData = await User.findById({ _id: req.session.user_id });
      const cartdata = await Cart.find({  });
      
      
      res.render('cart', { cartdata: cartdata, userData: userData });
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
        
        
          
          // Accessing the name property
          const userName = idc[0].name;
          
          
        const userCart = await Cart.findOne({ name: userName });
       
        if (userCart) {
            // Remove the product from cartProducts array based on the productId
            userCart.cartProducts = userCart.cartProducts.filter(product => product._id.toString() !== productIdToRemove);
        
            // Save the updated cart
            await userCart.save();
        
            res.redirect('/cart'); // Redirect to the cart page after removal
        } else {
            res.status(404).send('Cart not found');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
};
const loadPayment=async(req,res)=>{
    try {
        res.render('payment')
    } catch (error) {
        console.log(error.message);
    }
}


const userLogout=async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    loadRegister,insertUser,loginload,verifyLogin, loadHome,loadMen,userLogout,loadWomen,loadKid,loadCart,addtocart,loadremoveproduct,removeproduct,loadPayment
}

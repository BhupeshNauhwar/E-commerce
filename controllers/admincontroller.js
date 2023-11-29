const Men=require('../models/men');
const Women=require('../models/women');
const Kid=require('../models/kid');


const bcrypt=require('bcrypt');

// login 
const loadLogin=async(req,res)=>{
    try {
        res.render('login');
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
                if (userData.is_admin===0) {
                    res.render('login',{message:'Email and password are incoorect'})
                } else {
                    req.session.user_id=userData._id;
                    res.redirect("/admin/home")
                }
                
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
const User=require('../models/userModel');
const session = require('express-session');
const loadDashboard=async(req,res)=>{
    try {
        
        const userData=await User.findById({_id:req.session.user_id})
        console.log(userData)
        res.render('home',{admin:userData});
    } catch (error) {
        console.log(error.message);
        
    }
}
const logout=async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message)
        
    }
}

//new product

const loadnewproductmen=async(req,res)=>{
    try {
       
        res.render('newproductmen')
    } catch (error) {
        console.log(error.message)
    }
     }
const loadnewproductwomen=async(req,res)=>{
    try {
        res.render('newproductwomen')
    } catch (error) {
        console.log(error.message)
    }
  }
const loadnewproductkid=async(req,res)=>{
    try {
        res.render('newproductkid')
        
    } catch (error) {
        console.log(error.message)
    }
  }
const insertProductmen=async(req,res)=>{
    try {
        
        const url1=req.body.url1;
        const  url2=req.body.url2;
        const  url3=req.body.url3;
        const  url4=req.body.url4;
        const category= req.body.category;
        const  description=req.body.description;
        const   cprice=req.body.cprice;
        const   aprice=req.body.aprice;
        
        const men=new Men({
           
            url1:url1,
            url2:url2,
            url3:url3,
            url4:url4,
            category:category,
            description:description,
            cprice:cprice,
            aprice:aprice
        })
        const userData=await men.save();
        if (userData) {
            res.render('newproductmen',{message:'Product added successfully'});
        }
        else{
            res.render('newproductmen',{message:'something wrong'});
        }
       }catch (error) {
        console.log(error.message);   
    }

  }
const insertProductwomen=async(req,res)=>{
    try {
        
        const url1=req.body.url1;
        const  url2=req.body.url2;
        const  url3=req.body.url3;
        const  url4=req.body.url4;
        const category= req.body.category;
        const  description=req.body.description;
        const   cprice=req.body.cprice;
        const   aprice=req.body.aprice;
        
        const women=new Women({
            
            url1:url1,
            url2:url2,
            url3:url3,
            url4:url4,
            category:category,
            description:description,
            cprice:cprice,
            aprice:aprice
        })
        const userData=await women.save();
        if (userData) {
            res.render('newproductwomen',{message:'Product added successfully'});
           
        }
        else{
            res.render('newproductwomen',{message:'something wrong'})
        }
       }catch (error) {
        console.log(error.message);   
    }

  }
const insertProductkid=async(req,res)=>{
    try {
        
        const url1=req.body.url1;
        const  url2=req.body.url2;
        const  url3=req.body.url3;
        const  url4=req.body.url4;
        const category= req.body.category;
        const  description=req.body.description;
        const   cprice=req.body.cprice;
        const   aprice=req.body.aprice;
        
        const kid=new Kid({
            
            url1:url1,
            url2:url2,
            url3:url3,
            url4:url4,
            category:category,
            description:description,
            cprice:cprice,
            aprice:aprice
        })
        const userData=await kid.save();
        if (userData) {
            res.render('newproductkid',{message:'Product added successfully'});
           
        }
        else{
            res.render('newproductkid',{message:'something wrong'})
        }
       }catch (error) {
        console.log(error.message);   
    }

  }
//     
//collection data
const loadmendata=async(req,res)=>{
    try {
        const userData=await Men.find({is_men:1})
            
        res.render('mendata',{admin:userData})
    } catch (error) {
        console.log(error.message)
    }
     }
const loadwomendata=async(req,res)=>{
    try {
        const userData=await Women.find({is_women:1})
        res.render('womendata',{admin:userData})
    } catch (error) {
        console.log(error.message)
    }
     }
const loadkiddata=async(req,res)=>{
    try {
        const userData=await Kid.find({is_kid:1})
        res.render('kiddata',{admin:userData})
    } catch (error) {
        console.log(error.message)
    }
     }
module.exports={
    loadLogin,verifyLogin,loadDashboard,logout,loadnewproductmen,loadnewproductwomen,loadnewproductkid,insertProductmen,insertProductwomen,insertProductkid,loadwomendata,loadmendata ,loadkiddata
 }
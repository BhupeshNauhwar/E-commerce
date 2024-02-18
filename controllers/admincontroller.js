const Men=require('../models/men');
const Women=require('../models/women');
const Kid=require('../models/kid');


const bcrypt=require('bcrypt');

 
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
            console.log(passwordMatch)
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
        
        const url=req.body.url;
        const category= req.body.category;
        const  description=req.body.description;
        const   cprice=req.body.cprice;
        const   aprice=req.body.aprice;
        
        const men=new Men({
           
            url:url,
            category:category,
            description:description,
            cprice:cprice,
            aprice:aprice
        })
        const userData=await men.save();
        if (userData) {
            res.redirect('/mendata');
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
        
        const url=req.body.url;
        
        const category= req.body.category;
        const  description=req.body.description;
        const   cprice=req.body.cprice;
        const   aprice=req.body.aprice;
        
        const women=new Women({
            
            url:url,
            
            category:category,
            description:description,
            cprice:cprice,
            aprice:aprice
        })
        const userData=await women.save();
        if (userData) {
            res.redirect('/womendata');
           
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
        
        const url=req.body.url;
        
        const category= req.body.category;
        const  description=req.body.description;
        const   cprice=req.body.cprice;
        const   aprice=req.body.aprice;
        
        const kid=new Kid({
            
            url:url,
            
            category:category,
            description:description,
            cprice:cprice,
            aprice:aprice
        })
        const userData=await kid.save();
        if (userData) {
            res.redirect('/kiddata');
           
        }
        else{
            res.render('newproductkid',{message:'something wrong'})
        }
       }catch (error) {
        console.log(error.message);   
    }

  }

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

const loaddeleteproductmen=async(req,res)=>{
    try {
        res.render('mendata')
    } catch (error) {
        console.log(error.message)
    }
}    
const deleteproductmen=async(req,res)=>{
    const deleteID=req.body.id
    const result = await Men.findByIdAndDelete(deleteID);
    if (result) {
        console.log('Data deleted successfully'); 
        res.redirect('/admin/mendata')
    } 
    

} 
const loaddeleteproductwomen=async(req,res)=>{
    try {
        res.render('womendata')
    } catch (error) {
        console.log(error.message)
    }
}    
const deleteproductwomen=async(req,res)=>{
    const deleteID=req.body.id
    const result = await Women.findByIdAndDelete(deleteID);
    if (result) {
        console.log('Data deleted successfully'); 
        res.redirect('/admin/womendata')
    } 
    

} 
const loaddeleteproductkid=async(req,res)=>{
    try {
        res.render('kiddata')
    } catch (error) {
        console.log(error.message)
    }
}    
const deleteproductkid=async(req,res)=>{
    const deleteID=req.body.id
    const result = await Kid.findByIdAndDelete(deleteID);
    if (result) {
        console.log('Data deleted successfully'); 
        res.redirect('/admin/Kiddata')
    } 
    

} 

module.exports={
    loadLogin,verifyLogin,loadDashboard,logout,loadnewproductmen,loadnewproductwomen,loadnewproductkid,insertProductmen,insertProductwomen,insertProductkid,loadwomendata,loadmendata ,loadkiddata,loaddeleteproductmen,deleteproductmen,loaddeleteproductkid,loaddeleteproductkid,deleteproductkid,deleteproductwomen,loaddeleteproductwomen
}
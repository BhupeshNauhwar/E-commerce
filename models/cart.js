const mongoose=require('mongoose');

const cartSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    cartProducts:[{
        url:{
            type:String

        },
        cprice:{
            type:Number
        },
        id:{
            type:String
        }
        
    }]
    
    
    
})
module.exports=mongoose.model("Cart",cartSchema)

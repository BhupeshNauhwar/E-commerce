const mongoose=require('mongoose');

const cartSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    cartProducts:[{
        url1:{
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

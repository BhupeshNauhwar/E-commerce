const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    orderProducts:[{
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
    
    
    
},
{ timestamps: true } )
module.exports=mongoose.model("Order",orderSchema)

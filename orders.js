const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    id:{
        type:String
    },
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
        },
        date:{
            type: Date,
            default: Date.now
        }
        
    }]
    
    
    
}
 )
module.exports=mongoose.model("Order",orderSchema)

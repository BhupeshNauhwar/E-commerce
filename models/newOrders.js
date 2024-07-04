const mongoose=require('mongoose');

const newOrderSchema=mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
        
    },
    mobile:{
        type:Number
    },
    address:{
        type:String
    },
    pincode:{
        type:Number
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
module.exports=mongoose.model("newOrder",newOrderSchema)

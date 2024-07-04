const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    
    url:{
    type:String,
    required:true
    },
    
    category:{
    type:String,
    required:true
    },
    description:{
    type:String,
    required:true
    },
    cprice:{
    type:Number,
    required:true
    },
    aprice:{
    type:Number,
    required:true
    },
    is_men:{
        type:Number,
        default:0
    },
    is_women:{
        type:Number,
        default:0
    },
    is_kid:{
        type:Number,
        default:1
    }

    
})
module.exports= mongoose.model('Kid',userSchema);

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    
    url1:{
    type:String,
    required:true
    },
    url2:{
    type:String,
    required:true
    },
    url3:{
    type:String,
    required:true
    },
    url4:{
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
        default:1
    },
    is_kid:{
        type:Number,
        default:0
    }
    
})
module.exports= mongoose.model('Women',userSchema);

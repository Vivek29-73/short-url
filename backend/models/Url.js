const mongoose=require("mongoose");

const urlSchema= new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },

    originalUrl:{
        type:String,
        required:true
    },
    clicks:{
        type:Number,
        default:0
    },

    expiresAt:{
        type:Date,
        default:null

    }  ,

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

module.exports=mongoose.model("Url",urlSchema);
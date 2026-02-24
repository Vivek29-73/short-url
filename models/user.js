const monoose=require("mongoose");

const userSchema= new mongoose.create({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    }
}
);

module.exports=mongoose.model("User",userSchema);
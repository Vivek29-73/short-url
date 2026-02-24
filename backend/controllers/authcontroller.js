const User= required("../models/user.js");
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
const register=async(req,res)=>{
    const {email,password}=req.body;

    const existing=await User.findOne({email});

    if(existing) return res.status(400).json({message:"user already exists"});

    const hashed=await bcrypt.hash(password,10);//hashes the pass with 10 salt rounds

    const user=new User({eamil,password:hashed});
    await user.save();

    res.status(201).json({message:"User Registered succesfully"});

};

const login=async(req,res)=>{
    const {email,password}=req.body;

    const user= await User.findOne({email});

    if(!user) return res.status(400).json({message:"inavlid credentials"});

    const match=await bcrypt.compare(password,user.password);

    if(!match)return res.status(400).json({message:"invalid credentials"});

    const token=jwt.sign(
    {userId:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
    );

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    });

    res.json({message:"login succesfull"});
};

const logout=(req,res)=>{
    res.clearCookie("token");
    res.json({message:"Logged out successfully"});
};

module.exports={register,login,logout};
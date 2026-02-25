const express=require("express");
const router=express.Router();
const {register,login,logout}=require("../controllers/authcontroller");
const { validateRegister, validateLogin } = require("../validators/authValidators");
const { authLimiter } = require("../middleware/ratelimiter");

router.post("/register",authLimiter,validateRegister,register);
router.post("/login",authLimiter,validateLogin,login);
router.post("/logout",logout);

module.exports=router;
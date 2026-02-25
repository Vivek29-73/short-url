const rateLimit=require("express-rate-limit");

const authLimiter=rateLimit({
    windowMs:15*60*1000,
    max:10,
    message:{
        message:"Too many attempts,please try again"
}

});

const apiLimiter=rateLimit({
    windowMs:60*1000,
    max:60,
    message:{
        messsage:"too many requests,slow dow"
    }
});

module.exports={authLimiter,apiLimiter};

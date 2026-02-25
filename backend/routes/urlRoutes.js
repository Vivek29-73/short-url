const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
const { createShortUrl, getMyUrls, deleteUrl } = require("../controllers/urlController");
const { validateUrl } = require("../validators/urlValidators");
const { apiLimiter } = require("../middleware/ratelimiter");

router.post("/create",apiLimiter,protect,validateUrl,createShortUrl);
router.get("/myurls",apiLimiter,protect,getMyUrls);
router.delete("/:id",apiLimiter,protect,deleteUrl);

module.exports=router;
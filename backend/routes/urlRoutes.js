const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
const { createShortUrl, redirectUrl, getMyUrls, deleteUrl } = require("../controllers/urlController");

router.post("/create",protect,createShortUrl);
router.get("/myurls",protect,getMyUrls);
router.delete("/:id",protect,deleteUrl);

module.exports=router;
const Url=require("../models/Url");
const shortid=require("shortid");
const {asyncHandler}=require("../middleware/errorMiddleware");

const createShortUrl = asyncHandler(async (req, res) => {
    let { originalUrl, customAlias, expiresInDays } = req.body;
    
    // Add protocol if missing
    if (!/^https?:\/\//i.test(originalUrl)) {
        originalUrl = "https://" + originalUrl;
    }

    let shortId = customAlias || shortid.generate();

    const existing=await Url.findOne({shortId});
    if(existing)return res.status(400).json({menssage:"Alias already taken"});

    let expiryDate=null;

    if(expiresInDays){
        expiryDate=new Date();
        expiryDate.setDate(expiryDate.getDate()+expiresInDays);
    }
        const newUrl=new Url({
            shortId,
            originalUrl,
            expiresAt:expiryDate,
            user: req.user.userId
        });
        await newUrl.save();
        res.status(201).json({
            shortUrl: `${process.env.BACKEND_URL}/${shortId}`
        });
    
    });



const redirectUrl = asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ message: "Url Not Found" });
    
    if (url.expiresAt && new Date() > url.expiresAt)
        return res.status(400).json({ message: "Link expired" });
    
    url.clicks += 1;
    await url.save();

    // Ensure absolute URL before redirecting
    let target = url.originalUrl;
    if (!/^https?:\/\//i.test(target)) {
        target = "https://" + target;
    }

    res.redirect(target);
});

const getMyUrls=asyncHandler(async (req,res)=>{
    const urls=await Url.find({user:req.user.userId});
    res.json(urls);
});

const deleteUrl=asyncHandler(async (req,res)=>{
    const {id}=req.params;

    const url=await Url.findById(id);
    if(!url)return res.status(404).json({message:"Url Not Found"});

    if(url.user.toString()!==req.user.userId)
        return res.status(403).json({message:"Not allowed"});

    await url.deleteOne();
    res.json({message:"Url  deleted"});

});

module.exports={
    createShortUrl,
    redirectUrl,
    getMyUrls,
    deleteUrl
};
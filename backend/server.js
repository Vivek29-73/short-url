require("dotenv").config();
const express =require("express");
const mongoose =require("mongoose");
const cors= require("cors");
const cookieParser=require("cookie-parser");

const urlRoutes = require("./routes/urlRoutes");
const { redirectUrl } = require("./controllers/urlController"); 

const app=express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("db connected");})
.catch((err)=>{console.log(err)});

app.use("/api/url", urlRoutes);

app.get("/:shortId", redirectUrl);

app.listen(process.env.PORT,()=>{
    console.log("server connected");

})

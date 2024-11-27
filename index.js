const express= require("express");
const path= require('path');
const cookieParser = require ("cookie-parser");
const {connectToMongoDB}=require("./connect");
const{restrictToLoggedinUserOnly,checkAuth}=require('./middlewares/auth');

const URL=require("./models/url");
 
const urlRoute = require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute = require ("./routes/user");

const app =express();
const PORT=8001;
 
connectToMongoDB("mongodb://localhost:27017/short-url")
.then((console.log("MongoDB Connected")));

app.set("view engine", "ejs"); //Server side rendering k liye ejs use krte, Server ko bta rh k ejs engine use krna
app.set('views',path.resolve("./views"));
app.use(express.json());//middleware hai k hum json data b use krene
app.use(express.urlencoded({extended:false}));// hum form data b use krenge
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly,urlRoute); //restrictToLoggedinUserOnlyye middleware tb chalega jub req /url pr jaigi
app.use("/user",userRoute);
app.use("/",checkAuth, staticRoute); 

app.get("/url/:shortId",async(req,res)=>{
const shortId=req.params.shortId;
const entry=await URL.findOneAndUpdate({
    shortId},{
        $push:{
            visitHistory:{
                timestamp: Date.now(), 
            },
        }
    })
    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=>console.log(`Server started at PORT:${PORT}`));
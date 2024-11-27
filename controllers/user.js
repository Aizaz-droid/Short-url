const User = require("../models/user");
const {v4: uuidv4}= require('uuid');
const {setUser}= require ('../service/auth')

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;
    await User.create({ // new user create kr rhe
        name,
        email,
        password,
    });
    return res.redirect("/"); // signup kr k wapis home page pr send kr rahe
}

async function handleUserLogin(req,res){
    const {email,password}=req.body; //email aur password doge login k liye
    const user= await User.findOne({email,password});
    if(!user) return res.render("login",{
        error: "Invalid Username or Password",
    });

    const sessionId= uuidv4();
    setUser(sessionId, user);
    res.cookie("uid",sessionId);
    return res.redirect("/"); // signup kr k wapis home page pr send kr rahe
}


module.exports= {
    handleUserSignup,
    handleUserLogin,
};
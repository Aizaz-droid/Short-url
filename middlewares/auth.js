
//Middleware for authentication

const {getUser}= require ("../service/auth");
async function restrictToLoggedinUserOnly(req,res,next)
{
    const userUid = req.cookies.uid;
//Ager user login ni hai to usse login page pr bej denge
    if(!userUid) return res.redirect('/login')
    const user = getUser(userUid);
 if(!user) return  res.redirect("/login");

 req.user=user; //agr user sahi login huwa to ye user is object me dal k next function ko call krdunga
next();

}

async function checkAuth(req,res,next) { //ye bus chk kr rha k authenticate ho k ni ho
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user=user; 
    next();

}


module.exports ={
    restrictToLoggedinUserOnly,
    checkAuth,
};
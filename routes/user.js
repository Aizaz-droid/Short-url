//For authenticaion (User related kam hoga login and Signup)
const express= require("express");
const {handleUserSignup,handleUserLogin}= require("../controllers/user");

const router =express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);


module.exports = router;
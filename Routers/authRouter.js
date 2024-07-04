const express =require ('express')
//import{loginUser} from '../Controllers/authControllers'
const {loginUser, RegisterUser, google} =require ("../Controllers/authControllers")

const router =express.Router();

router.post("/register-user",RegisterUser)
router.post("/login-user",loginUser)
router.post("/google",google)

module.exports=router;
const express = require("express")
const router = express.Router()
const userService = require('../modules/users/users')
const {loginSchemaValidator} = require("../middlewares/validators");



router.get('/',async(req,res)=>{
    try {

        let filter = {};
        let {active_status,user_id} = req.query
        active_status ? filter["active_status"] = active_status  : ""
        user_id ? filter["user_id"]=user_id :""
        console.log("filter",filter)
        let fetchUsersResp =  await userService.fetchUsersAllData(filter)
        res.status(fetchUsersResp.statusCode || 200 ).send(fetchUsersResp)
        
    } catch (error) {
        console.log("error",error)
        res.status(error.statusCode || 500).send(error)
    }
  })

  
router.post('/register',async(req,res)=>{
    try {
   
        
        let registerUserResp =  await userService.registerUser(req.body)
        res.status(200).send(registerUserResp)
        
    } catch (error) {
        console.log("error catch",error)
        res.status(error.statusCode || 500).send(error)
    }
  })

  router.post('/login',async(req,res)=>{
    try {
 
        const {error,value} = loginSchemaValidator.validate(req.body)
        if(error){
            let errorMsg = error.details[0].message.replace(/"/g,"");
            console.log(errorMsg)
            throw {status:"fail",errorCode:400,result:[],error:"Request validation Failed"}
        }
        
        let {user_id,password} = req.body;
        let fetchUsersResp =  await userService.loginUser({"user_id" : user_id.toLowerCase()},password)
       
        return res.status(200).send(fetchUsersResp)
        
    } catch (error) {
        console.log("error",error)
        return res.status(error.statusCode || 500).send(error)
    }
  })

  router.post('/logout',async(req,res)=>{
    try {
 
        let {user_id} = req.body;
        let logoutUserResp =  await userService.logoutUser({"user_id" : user_id})
       
        return res.status(200).send(logoutUserResp)
        
    } catch (error) {
        console.log("error",error)
        return res.status(error.statusCode || 500).send(error)
    }
  })

  router.post('/forgotPassword',async(req,res)=>{
    try {
 
        console.log("forgotPassword")
        let {user_id} = req.body;
        
        let logoutUserResp =  await userService.forgotPassword({"user_id" : user_id})
       
        return res.status(200).send(logoutUserResp)
        
    } catch (error) {
        console.log("error",error)
        return res.status(error.statusCode || 500).send(error)
    }
  })

  router.post('/validateOtp',async(req,res)=>{
    try {
 
        console.log("validateOtp",req.body)
        let {user_id,otp} = req.body;
        let fetchUsersResp =  await userService.fetchUsers({"user_id" : user_id })
        console.log("fetchUsersResp",fetchUsersResp)
        if(fetchUsersResp.status === "success"){
            if(fetchUsersResp.result[0].forgot_password_otp ===  otp){
                
                let resetPasswordResp =  await userService.resetPassword(req.body)
                console.log("resetPasswordResp",resetPasswordResp)

                return  res.status(200).send({
                    status      :   "success",
                    statusCode  :   200,
                    result      :   "Password Reset Successfully",
                    error       :   ""
                })
            }
            else{
                throw {
                    status      :   "fail",
                    statusCode  :   400,
                    result      :   "",
                    error       :   "OTP Validation Failed"
                }
            }
        }
        return res.status(200).send(logoutUserResp)
        
    } catch (error) {
        console.log("error",error)
        return res.status(error.statusCode || 500).send(error)
    }
  })
  
module.exports = router
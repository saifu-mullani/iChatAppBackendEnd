const UsersDao = require("../../mongoCalls/usersDao")
const middlewares   = require("../../middlewares/middlewares");
const sendMail = require("../mail/mail")
const fs = require('fs');



const userService = {
    fetchUsers : async(filter={})=>{
        try {
          
            let data = await UsersDao.fetchUser(filter)
            console.log("data",data)
            return  {
                status      :   "success",
                statusCode  :   200,
                result      :  data,
                error       :   ""
            }
        } catch (error) {
            console.log("error",error)
            throw {
                status      :   error.status || "fail",
                statusCode  :   error.statusCode || 500,
                result      :   [],
                error       :   error.error || error || "Something went wrong"
            }
        }
    },

    fetchUsersAllData : async(filter={})=>{
        try {
          
            let data = await UsersDao.fetchUserAllData(filter)
            console.log("data",data)
            return  {
                status      :   "success",
                statusCode  :   200,
                result      :  data,
                error       :   ""
            }
        } catch (error) {
            console.log("error",error)
            throw {
                status      :   error.status || "fail",
                statusCode  :   error.statusCode || 500,
                result      :   [],
                error       :   error.error || error || "Something went wrong"
            }
        }
    },

    loginUser : async(filter={},password)=>{
        try {
          
            let data = await UsersDao.fetchUser(filter)

            if(data.length === 0 ){
                throw { 
                    status      :   "fail",
                    statusCode  :   400,
                    result      :   [],
                    error       :   `Not registered. Please Register first`
                }
            }
            console.log("password",password)
            let decryptPasswordResp = await middlewares.decryptPassword(password,data[0].password)
            console.log("decryptPasswordResp",decryptPasswordResp)
            if(decryptPasswordResp.status === "fail"){
                throw  {
                    status      :   decryptPasswordResp.status,
                    statusCode  :   decryptPasswordResp.statusCode,
                    result      :   [],
                    error       :   decryptPasswordResp.error
                }
            }
            let updateUserResp = await UsersDao.updateUser(filter,{active_status : "true"})
            return  {
                status      :   "success",
                statusCode  :   200,
                result      :   "Authenticated Successfully",
                error       :   ""
            }
        } catch (error) {
            console.log("error",error)
            throw {
                status      :   error.status || "fail",
                statusCode  :   error.statusCode || 500,
                result      :   [],
                error       :   error.error || error || "Something went wrong"
            }
        }
    },
    logoutUser : async(filter={})=>{
        try {
        
            let updateUserResp = await UsersDao.updateUser(filter,{active_status : "false", last_login: new Date()})
            return  {
                status      :   "success",
                statusCode  :   200,
                result      :   "Loggedout Successfully",
                error       :   ""
            }
        } catch (error) {
            console.log("error",error)
            throw {
                status      :   error.status || "fail",
                statusCode  :   error.statusCode || 500,
                result      :   [],
                error       :   error.error || error || "Something went wrong"
            }
        }
    },

    generateOtp : async function(){
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    },
    forgotPassword : async function(filter = {}){
        try {

            let data = await UsersDao.fetchUser(filter)

            if(data.length === 0 ){
                throw { 
                    status      :   "fail",
                    statusCode  :   400,
                    result      :   [],
                    error       :   `Please check User Id`
                }
            }
        
            let generateOtpResp = await this.generateOtp();
            console.log("generateOtpResp",generateOtpResp)

            let updateUserResp = await UsersDao.updateUser(filter,{forgot_password_otp : generateOtpResp})
            console.log("updateUserResp",updateUserResp)
            if(updateUserResp.status === "success"){
                // send email with OTP to user's registered Email Id
                console.log("Here")
                const templatePath = './modules/mail/emailTemplates/forgot-password-email-template.html';
                const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

                // Replace placeholders with actual data
                const replacedTemplate = htmlTemplate.replace('{{name}}', `${updateUserResp.result.first_name} ${updateUserResp.result.last_name}`).replace('{{OTP}}', generateOtpResp );

                // Email content
                const mailOptions = {
                to: updateUserResp.result.email,
                subject: 'Password Reset for iChatApp',
                html: replacedTemplate
                };
                let resp = await sendMail(mailOptions)
                console.log("resp",resp)
                if(resp.status === "success"){
                    return  {
                        status      :   "success",
                        statusCode  :   200,
                        result      :   "Password Reset Mail Sent Successfull",
                        error       :   ""
                    }
                }
                else{
                    throw {
                        status      :   "fail",
                        statusCode  :   400,
                        result      :   [],
                        error       :   "Error in Password reset"
                    }
                }
               
            }
            else{
                throw {
                    status          :   "fail",
                    statusCode      :   400,
                    result          :   [],
                    error           :   "Error in Password reset"
                }
            }
            
        } catch (error) {
            console.log("error",error)
            throw {
                status              :   error.status || "fail",
                statusCode          :   error.statusCode || 500,
                result              :   [],
                error               :   error.error || error || "Something went wrong"
            }
        }
    },
    registerUser : async(body)=>{
        try {
            console.log("registerUser")
            let {
                first_name,
                last_name,
                mobile,
                email,
                age,
                password,
                confirm_password
            } = body

            if(password !== confirm_password){
                throw {
                    status      :   "fail",
                    statusCode  :   400,
                    result      :   [],
                    error       :   "Password and Confirm Password didnt match"
                }
            }

            let hashPwd = await middlewares.bcryptPassword(password)
            if(hashPwd.status === "fail"){
                throw  {
                    status      :   hashPwd.status,
                    statusCode  :   hashPwd.statusCode,
                    result      :   [],
                    error       :   hashPwd.error
                }
            }

            let user_id = `${first_name}_${last_name}`.toLowerCase()
            console.log("user_id",user_id)
            let obj =   {
                first_name,
                last_name,
                mobile,
                email,
                age,
                user_id,
                password     :   hashPwd.result
            }
            let registerUser = await UsersDao.addUser([obj])

            if(registerUser.status === "fail"){
                throw {
                    status      :  registerUser.status || "fail",
                    statusCode  :   registerUser.statusCode || 400,
                    result      :  [],
                    error       :   registerUser.error || "Error in Registration"
                }
            }

            const templatePath = './modules/mail/emailTemplates/user-registered-email-template.html';
             const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

                // Replace placeholders with actual data
            const replacedTemplate = htmlTemplate.replace('{{name}}', `${first_name} ${last_name}`).replace('{{user_id}}', user_id);

                // Email content
            const mailOptions = {
                to: email,
                subject: 'Registration Success for iChatApp',
                html: replacedTemplate
            };
            let resp = await sendMail(mailOptions)
            console.log("resp",resp)
                

            return  {
                status      :   "success",
                statusCode  :   200,
                result      :   "Registered Successfully",
                error       :   ""
            }
        } catch (error) {
            console.log("error userService",error)
            throw {
                status      :   error.status || "fail",
                statusCode  :   error.statusCode || 500,
                result      :   [],
                error       :   error.error || error || "Something went wrong"
            }
        }
        
    },
    resetPassword : async(body)=>{
        try {
           
            let {
                user_id,
                password,
                confirm_password
            } = body

            if(password !== confirm_password){
                throw {
                    status          :   "fail",
                    statusCode      :   400,
                    result          :   [],
                    error           :   "Password and Confirm Password didnt match"
                }
            }

            let hashPwd = await middlewares.bcryptPassword(password)
            if(hashPwd.status === "fail"){
                throw  {
                    status          :   hashPwd.status,
                    statusCode      :   hashPwd.statusCode,
                    result          :   [],
                    error           :   hashPwd.error
                }
            }

            let filter = {
                user_id             : user_id
            }
            let updateObj =   {
                password            :   hashPwd.result,
                forgot_password_otp :   ""
            }
            let updateUserResp = await UsersDao.updateUser(filter,updateObj)
            if(updateUserResp.status === "success"){
                return  {
                    status      :   "success",
                    statusCode  :   200,
                    result      :   "Password Reset Successfully",
                    error       :   ""
                }
            }
            else{
                throw {
                    status      :   "fail",
                    statusCode  :   400,
                    result      :   "Failed to reset password",
                    error       :   ""
                }
            }
           
        } catch (error) {
            console.log("error userService",error)
            throw {
                status      :   error.statusCode || "fail",
                statusCode  :   error.statusCode || 500,
                result      :   [],
                error       :   error.error || error || "Something went wrong"
            }
        }
        
    }
}

module.exports = userService
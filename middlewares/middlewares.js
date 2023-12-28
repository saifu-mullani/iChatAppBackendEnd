const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust according to your security needs


const middlewares = {

   
    bcryptPassword : async (password)=>{
        try {

            console.log("bcryptPassword")
        
            let hashValue = await bcrypt.hash(password, saltRounds);
            console.log("hashValue",hashValue)
            return {
                status      :   "success",
                statusCode  :   200,
                result      :   hashValue,
                error       :   "" 
            }
            
        } catch (error) {
            return {
                status      :   "fail",
                statusCode  :   400,
                result      :   [],
                error       :   "Error while encrypting password" 
            }
        }
    },
    decryptPassword : async (loginPassword,storedHashedPassword)=>{
        try {

            console.log("decryptPassword",loginPassword,storedHashedPassword)

            let compareResp = await  bcrypt.compare(loginPassword, storedHashedPassword);
            console.log("compareResp",compareResp)
            if(compareResp){
                return {
                    status      :   "success",
                    statusCode  :   200,
                    result      :   compareResp,
                    error       :   "" 
                }
            }
            throw {
                status      :   "fail",
                statusCode  :   401,
                result      :   [],
                error       :   "Bad Password"
            }
            
        } catch (error) {
            console.log("error",error)
            throw {
                status      :   error.status || "fail",
                statusCode  :   error.statusCode || 400,
                result      :   [],
                error       :   error.error || "Bad Password" 
            }
        }
    }

}

module.exports = middlewares
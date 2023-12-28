const MessagesDao = require("../../mongoCalls/messages")
const middlewares   = require("../../middlewares/middlewares");



const messageService = {
    insertMessage : async(messageObj)=>{
        try {
          
         
            let data = await MessagesDao.insertMessage(messageObj)
 
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
    fetchMessages : async(filter ={})=>{
        try {
          
          
            let data = await MessagesDao.fetchMessages(filter)

            console.log(data)
 
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

    fetchOldChatUser : async(filter ={})=>{
        try {
          
          
            let data = await MessagesDao.fetchOldChatUser(filter)
            let uniqueUsers = {}

            data.forEach((curr)=>{
                uniqueUsers[curr.user1_id] = 1;
                uniqueUsers[curr.user2_id] = 1;
            })
           let data2 = Object.keys(uniqueUsers).filter((curr)=>curr !== filter.user_id)
            console.log(uniqueUsers,data2)
            return  {
                status      :   "success",
                statusCode  :   200,
                result      :  data2,
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


}

module.exports = messageService
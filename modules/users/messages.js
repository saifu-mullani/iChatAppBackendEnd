const MessagesDao = require("../../mongoCalls/messages")
const GroupsDao = require("../../mongoCalls/groupsDao")
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
            let groupDataResp = await GroupsDao.fetchGroups({ "group_members": { $in: [filter.user_id] } })
            let uniqueUsers = {}

            groupDataResp.length && groupDataResp.forEach((curr)=>{
                uniqueUsers[curr.group_name] = {name:curr.group_name , type : "Group"};
            })
            data.forEach((curr)=>{
                uniqueUsers[curr.user1_id] = {name:curr.user1_id , type : "Individual"};
                uniqueUsers[curr.user2_id] = {name:curr.user2_id , type : "Individual"};
            })
           let data3 = Object.values(uniqueUsers).filter((curr)=> curr.name !== filter.user_id)
           
           return  {
                status      :   "success",
                statusCode  :   200,
                result      :   data3,
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
const groupsDao = require("../../mongoCalls/groupsDao")

const groupService = {
    fetchGroups : async(filter={})=>{
        try {
          
            let data = await groupsDao.fetchGroups(filter)
 
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
    createGroup : async(data = {})=>{
        try {
          
            let createGroupResp = await groupsDao.createGroup(data)
 
            return  {
                status      :   "success",
                statusCode  :   200,
                result      :  createGroupResp,
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
    validateGroupName : async(filter={})=>{
        try {
          
            let data = await groupsDao.fetchGroups(filter)
            if(data.length){
                throw {
                    status      :   "fail",
                    statusCode  :   400,
                    result      :  [],
                    error       :   "Group Name Already Taken"
                }
            }
 
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
}

module.exports = groupService
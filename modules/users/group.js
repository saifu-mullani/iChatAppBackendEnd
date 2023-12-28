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
}

module.exports = groupService
const  mongoose = require ("mongoose");


const GroupsDao ={

    fetchGroups : async(filter={})=>{
      
            try {

                let result = await mongoose.model('i_chat_groups').find(filter)
                // console.log("result",result)
                return result

            } catch (error) {
                console.log("Error",error)
                throw {
                    status      :   "fail",
                    statusCode  :   500,
                    result      :   [],
                    error       :   "Error While fetching groups"
                }
            }
 
    },

}



module.exports = GroupsDao;

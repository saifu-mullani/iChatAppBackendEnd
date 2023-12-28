const  mongoose = require ("mongoose");

const MongoProjectDao ={

    fetchUser : async(filter={})=>{
      
            try {

                let result = await mongoose.model('i_chat_users').find(filter)
                // console.log("result",result)
                return result

            } catch (error) {
                console.log("Error",error)
                throw {
                    status      :   "fail",
                    statusCode  :   500,
                    result      :   [],
                    error       :   "Error While fetching users"
                }
            }
 
    },

    updateUser : async(filter, data)=>{
       
        try {

            console.log("data",JSON.stringify(data))
            let result = await mongoose.model('i_chat_users').findOneAndUpdate(filter,data,{ returnDocument: 'after' })
            if(result === null){
                return { status      :   "fail",
                statusCode  :   400,
                result      :   [],
                error       :   "No record found to update"}
            }
            return {
                status      :   "success",
                statusCode  :   200,
                result      :   result,
                error       :   ""
            }

        } catch (error) {
          
                throw {
                    status      :   "fail",
                    statusCode  :   500,
                    result      :   [],
                    error       :   "Error While updating"
                }
            
        }
  
    },
    addUser : async(data)=>{
       
            try {

                console.log("data",JSON.stringify(data))
                let result = await mongoose.model('i_chat_users').insertMany(data)
                return result

            } catch (error) {
                console.log("Error",error)
                if(error.code === 11000){
                    throw {
                        status      :   "fail",
                        statusCode  :   400,
                        result      :   [],
                        error       :   "Duplicate User Error"
                    }
                }
                else{
                    throw {
                        status      :   "fail",
                        statusCode  :   500,
                        result      :   [],
                        error       :   "Error While registration"
                    }
                } 
            }
      
    }


}



module.exports = MongoProjectDao;

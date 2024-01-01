const { array } = require("joi");
const  mongoose = require ("mongoose");


const MongoProjectDao ={

    fetchMessages : async(filter={})=>{
      
            try {

                let filt = {$or:[{user1_id:filter.user1_id,user2_id:filter.user2_id},{user1_id:filter.user2_id,user2_id:filter.user1_id}]}
                let result = await mongoose.model('i_chat_messages').find(filt)
             
                return result

            } catch (error) {
                console.log("Error",error)
                throw {
                    status      :   "fail",
                    statusCode  :   500,
                    result      :   [],
                    error       :   "Error While fetching messages"
                }
            }
 
    },
    fetchOldChatUser : async(filter={})=>{
      
        try {

            let filt = {$or:[{user1_id:filter.user_id},{user2_id:filter.user_id}]}
            let result = await mongoose.model('i_chat_messages').find(filt)
         
            return result

        } catch (error) {
            console.log("Error",error)
            throw {
                status      :   "fail",
                statusCode  :   500,
                result      :   [],
                error       :   "Error While fetching messages"
            }
        }

    },
    
    insertMessage : async(messageObj={})=>{
      
        try {


          
            

            let result = await mongoose.model('i_chat_messages').findOneAndUpdate( 
                {$or:[{user1_id:messageObj.sender,user2_id:messageObj.receiver},{user1_id:messageObj.receiver,user2_id:messageObj.sender}]},
                { 
                    $setOnInsert: {
                        user1_id:messageObj.sender,
                        user2_id:messageObj.receiver
                    },
                    $push: { messages: { $each: [{ messageId : new mongoose.Types.ObjectId() , message: messageObj.message, sender : messageObj.sender, timestamp: messageObj.timestamp }], $position: 0 } } },
                
                { upsert: true, returnDocument: 'after' })
              
            return result

        } catch (error) {
            console.log("Error",error)
            throw {
                status      :   "fail",
                statusCode  :   500,
                result      :   [],
                error       :   "Error While fetching messages"
            }
        }

}

}



module.exports = MongoProjectDao;

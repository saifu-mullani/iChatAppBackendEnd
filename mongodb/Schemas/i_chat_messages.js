const { Schema, model} = require ("mongoose");


const chatMessagesSchema = new Schema( {
    user1_id: {
        type: String,
    },
    user2_id: {
        type: String,
    },
    messages:{
        type: []
    }
})

module.exports = model("i_chat_messages", chatMessagesSchema, "i_chat_messages");
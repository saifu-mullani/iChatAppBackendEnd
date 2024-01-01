const { Schema, model} = require ("mongoose");
const mongoose = require('mongoose');


const chatMessagesSchema = new Schema( {
    user1_id: {
        type: String,
    },
    user2_id: {
        type: String,
    },
    messages: []
})

module.exports = model("i_chat_messages", chatMessagesSchema, "i_chat_messages");
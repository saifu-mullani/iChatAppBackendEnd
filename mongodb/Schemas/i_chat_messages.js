const { Schema, model} = require ("mongoose");
const mongoose = require('mongoose');


const chatMessagesSchema = new Schema( {
    user1_id: {
        type: String,
    },
    user2_id: {
        type: String,
    },
    messages: {
        message: String,
        sender: String,
        timestamp: Date,
        messageId: { type: mongoose.Schema.Types.ObjectId, default:  () => new mongoose.Types.ObjectId()}
      } 
})

module.exports = model("i_chat_messages", chatMessagesSchema, "i_chat_messages");
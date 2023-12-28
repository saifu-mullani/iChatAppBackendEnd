const { Schema, model} = require ("mongoose");


const groupSchema = new Schema( {
    group_name: {
        type: String,
      }
})

module.exports = model("i_chat_groups", groupSchema, "i_chat_groups");
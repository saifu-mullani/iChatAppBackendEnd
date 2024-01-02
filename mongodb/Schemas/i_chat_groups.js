const { Schema, model} = require ("mongoose");


const groupSchema = new Schema( {
    group_name: {
        type: String,
        unique:true
    },
    group_admin: [],
    group_members: [],
    create_ts: {
      type: Date
    },
    update_ts: {
      type: Date
    }
    
})

module.exports = model("i_chat_groups", groupSchema, "i_chat_groups");
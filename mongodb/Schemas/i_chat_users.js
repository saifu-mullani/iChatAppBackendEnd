const { Schema, model} = require ("mongoose");


const userSchema = new Schema( {
    first_name: {
      type: String,
    },
    last_name: {
        type: String,
    },
    user_id: {
        type: String,
    },
    password: {
        type: String,
    },
    forgot_password_otp:{
        type: String
    },
    mobile: {
        type: String,
    },
    user_id: {
        type: String,
        unique : true
    },
    active_status: {
        type: String,
        default: "false"
    },
    last_login: {
        type: Date,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
    },
})

module.exports = model("i_chat_users", userSchema, "i_chat_users");
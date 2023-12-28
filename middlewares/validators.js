const Joi = require("joi")

const loginSchemaValidator =  Joi.object({
    user_id:Joi.string().required(),
    password:Joi.string().required(),
})

module.exports = {loginSchemaValidator}
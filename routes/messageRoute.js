const express = require("express")
const router = express.Router()
const messagesService = require('../modules/users/messages')
const {loginSchemaValidator} = require("../middlewares/validators");



router.post('/sendMessages',async(req,res)=>{
    try {

      
        let result = await messagesService.insertMessage(req.body)
        res.status(result.statusCode || 500).send(result)

    } catch (error) {
        console.log("error",error)
        res.status(error.statusCode || 500).send(error)
    }
  })

  router.post('/fetchMessages',async(req,res)=>{
    try {

     
   
        let sender = req.body.sender;
        let receiver = req.body.receiver;

    
        let filter = {}
        sender ? filter["user1_id"] =  sender  : ""
        receiver ? filter["user2_id"] =  receiver  : ""

       
        let result = await messagesService.fetchMessages(filter)
        res.status(result.statusCode || 500).send(result)

    } catch (error) {
        console.log("error",error)
        res.status(error.statusCode || 500).send(error)
    }
  })

  router.post('/fetchOldChatUser',async(req,res)=>{
    try {

     
        let user_id = req.body.user_id;

        let filter = {}
        user_id ? filter["user_id"] =  user_id  : ""
       
       
        let result = await messagesService.fetchOldChatUser(filter)
        res.status(result.statusCode || 500).send(result)

    } catch (error) {
        console.log("error",error)
        res.status(error.statusCode || 500).send(error)
    }
  })

module.exports = router
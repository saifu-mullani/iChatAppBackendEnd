const express = require("express")
const router = express.Router()
const groupService = require('../modules/users/group')




router.get('/',async(req,res)=>{
    try {
        console.log("groupService / route")

        let filter = {};
        let fetchGroupsResp =  await groupService.fetchGroups(filter)
        res.status(fetchGroupsResp.statusCode || 200 ).send(fetchGroupsResp)
        
    } catch (error) {
        console.log("error",error)
        res.status(error.statusCode || 500).send(error)
    }
  })

module.exports = router
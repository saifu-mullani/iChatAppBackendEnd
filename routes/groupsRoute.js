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

  router.post('/createGroup',async(req,res)=>{
    try {
        console.log("groupService / route")

        let {group_name, group_members,group_admin} = req.body ;
        let createGroupsResp =  await groupService.createGroup({group_name,group_members,group_admin,create_ts:new Date()})
        res.status(createGroupsResp.statusCode || 200 ).send(createGroupsResp)
        
    } catch (error) {
        console.log("error",error)
        res.status(error.statusCode || 500).send(error)
    }
  })

  router.post('/validateGroupName',async(req,res)=>{
    try {
        console.log("validateGroupName / route")

        let {group_name} = req.body ;
        let validateGroupNameResp =  await groupService.validateGroupName({group_name})
        res.status(validateGroupNameResp.statusCode || 200 ).send(validateGroupNameResp)
        
    } catch (error) {
        console.log("error",error)
        res.status(error.statusCode || 500).send(error)
    }
  })
module.exports = router
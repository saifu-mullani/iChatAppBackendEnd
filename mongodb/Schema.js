const mongoose = require('mongoose');
//const db = require('./connection');

const userSchema = new mongoose.Schema({
        cecid: {
          type: String,
          unique: true,
          required: true
        },
        employee_id: {
          type: String
        },
        iops_pin_or_org: {
          type: String
        },
        iops_pin_or_org_type: {
          type: String
        },
        group_name: {
          type: String
        },
        name: {
          type: String
        },
        title: {
          type: String
        },
        office: {
          type: String
        },
        managers: {
          type: String
        },
        supervisor_party_key: {
          type: String
        },
        reportees: {
          type: String
        },
        department_id: {
          type: String
        },
        phone_num: {
          type: String
        },
        is_comp_owner: {
          type: Boolean,
          default: false
        },
        comp_owner_for_os: {
          type: String
        },
        
        create_ts: {
          type: Date
        },
        update_ts: {
          type: Date
        }
})

const User = mongoose.model("rs_user_pin_org_mapping", userSchema);

module.exports = {User};
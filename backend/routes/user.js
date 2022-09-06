const user = require('../model/User');
const userMapping = require('../model/UserMapping');
const express = require('express');
const User = require('../model/User');

const router = express.Router();

router.get('/getotp',async(req,resp)=>{
    const userId = req.query.mobileno;
    console.log(userId);
    if(userId){
        const user = await User.findOne({userId});
        if(user){
            user.otp="1234";
            resp.send({respCode:1,user:user});
        }
        else{
            resp.send({respCode:3,respMsg:"User with Mobile No. does not exist"});
        }
    }
    else{
        resp.send({respCode:2,respMsg:"Mobile No empty"})
    }
    
})

router.post('/verifyotp',(req,resp)=>{
    
})

module.exports = router;


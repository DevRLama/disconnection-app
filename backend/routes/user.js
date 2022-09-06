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
        //if user exists with given mobile number
        if(user){
            //create otp and save to database
            const otp = Math.floor(1000 + Math.random() * 9000);
            user.otp = otp;
            otpUpdateResp = await User.updateOne({userId},{otp:otp});
            if(otpUpdateResp.acknowledged){
                console.log(user);
                resp.send({respCode:1,user:user});
            } 
            else{
                resp.send({respCode:4, respMsg:"Error creating otp"});
            }       
        }
        //send error response that user with mobile no does not exist.
        else{
            resp.send({respCode:3,respMsg:"User with Mobile No. does not exist"});
        }
    }
    else{
        resp.send({respCode:2,respMsg:"Mobile No not provided"})
    }
    
})

router.get('/verifyotp',async(req,resp)=>{
    const userId = req.query.mobileno;
    const otp = req.query.otp;
    
    const user = await User.findOne({userId});
    if(user.otp === otp)
    {
        console.log("OTP verified successfully");
        resp.send({respCode:1, respMsg:"OTP verified successfully"});
    }
    else{
        resp.send({respCode:2, respMsg:"Incorrect OTP"});
    }
    
});

// router.get('/getuser',async(req,res)=>{
//     const userId = req.query.mobileno;
//     const user = await User.findOne({userId});

// })

module.exports = router;


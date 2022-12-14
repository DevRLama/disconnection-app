const user = require('../model/User');
const express = require('express');
const User = require('../model/User');
const nodemailer=require('nodemailer')
const { body, validationResult } = require('express-validator');


const router = express.Router();

router.get('/getotp', async (req, resp) => {
    

    const userId = req.query.mobileno;

    //Configuration for OTP on email
    const transporter=nodemailer.createTransport({
        port:465,
        host:"smtp.gmail.com",
        auth:{
            user:"", //Account ID from which email is to be sent
            pass:'' //App password of Google Account
        },
        secure:true,
    });

    console.log(userId);
    if (userId) {

        const user = await User.findOne({ userId });
        //if user exists with given mobile number
        if (user && !(user.isDeleted)) {
            //create otp and save to database
            const otp = Math.floor(1000 + Math.random() * 9000);
            user.otp = otp;
            otpUpdateResp = await User.updateOne({ userId }, { otp: otp }); // Saving OTP in database for verify purpose.
            if (otpUpdateResp.acknowledged) {
                console.log(user);
                // OTP created will be sent to user through email
                const mailData={
                    from:'',
                    to:'',
                    subject:'Test App OTP',
                    text:'Test OTP for my test App',
                    html:`Your OTP for login is :- <b>${otp}</b>`
                };

                transporter.sendMail(mailData,function(err,info){
                    if(err){
                        resp.status(500).send('Mail Failed')
                    }else{
                        resp.status(200).send('OTP sent successfully.')
                    }
                })



                resp.send({ respCode: 1, user: user });
            }
            else {
                resp.send({ respCode: 4, respMsg: "Error creating otp" });
            }
        }
        //send error response that user with mobile no does not exist.
        else {
            resp.send({ respCode: 3, respMsg: "User with Mobile No. does not exist" });
        }
    }
    else {
        resp.send({ respCode: 2, respMsg: "Mobile No not provided" })
    }

})

router.get('/verifyotp', async (req, resp) => {
    const userId = req.query.mobileno;
    const otp = req.query.otp;

    const user = await User.findOne({ userId });
    if (user.otp === otp) {
        console.log("OTP verified successfully");
        resp.send({ respCode: 1, respMsg: "OTP verified successfully" });
        await User.findOneAndUpdate({ userId: userId }, { $set: { otp: "" } })
    }
    else {
        resp.send({ respCode: 2, respMsg: "Incorrect OTP" });
    }

});
router.get('/deleteuser', async (req, resp) => {
    const userId = req.query.mobileno;
    const user = await User.findOne({ userId });


    //user.isDeleted = true;
    if (user) {
        if (user.role === "Lineman") {
            userDeleteResp = await User.updateOne({ userId }, { isDeleted: true });
            if (userDeleteResp.acknowledged) {

                console.log(user);
                resp.send({ respCode: 1, user: user });
            }
        } else {
            resp.send({ respCode: 3, respMsg: "User is not a lineman" });
        }
    }
    else {
        resp.send({ respCode: 4, respMsg: "User doesn't exist" });
    }





})

router.post('/create',[
    body('mobileno', 'mobile no is required').exists({ checkFalsy: true }),
    body('firstName', 'first name is required').exists({ checkFalsy: true }),
    body('lastName','last name is required').exists({ checkFalsy: true }),
    body('role', 'role is required').exists({ checkFalsy: true }),
    body('supervisorID', 'supervisorID is required').exists({checkFalsy: true }),
],async (req, resp) => {
        console.log(req.body)
        //if there are errors, Bad request return
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.send({ respCode: 2, respMsg: errors.array() })
        }
        try {
            let user = await User.findOne({ userId: req.body.mobileno })
            if (user) {
                return resp.send({ respCode: 3, respMsg: "User with mobile no already exists" });
            }
            user = await User.create({
                userId: req.body.mobileno,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                supervisorID:req.body.supervisorID,
                isDeleted:"false"
            })
            console.log(user)
            resp.send({ respCode: 1, respMsg: "User created successfully" });
        }
        catch (error) {
            console.log(error);
            resp.send({ respCode: 4, respMsg: "Error creating user" });
        }
    })


//Route: To update data of lineman
router.post('/update', [
    body('mobileno', 'mobile no is required').exists({ checkFalsy: true }),
    body('firstName', 'first name is required').exists({ checkFalsy: true }),
    body('lastName', 'last name is required').exists({ checkFalsy: true }),
],async (req, resp) => {
    
    console.log(req)
    //if there are errors, Bad request return
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.send({ respCode: 2, respMsg: errors.array() })
    }
    try {
        console.log(req.body);
        let user = await User.findOneAndUpdate(
            { userId: req.body.mobileno },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userId: req.body.mobileno
                }
            })
        resp.send({ respCode: 1, respMsg: "User updated successfully" });
    }
    catch (error) {
        console.log(error);
        resp.send({ respCode: 4, respMsg: "Error updating user" });
    }
})

router.get('/getlineman',async (req,resp)=>{
    const userId = req.query.userId;
    if(userId){
        try{
            let linemans = await User.find({$and:[{supervisorID:userId},{isDeleted:false}]});
            resp.send({ respCode: 1, linemans});
        }
        catch(error){
            resp.send({ respCode: 2, respMsg: "Error fetching lineman" });
        }
    }
    else {
        resp.send({ respCode: 3, respMsg: "userId is required" });
    }
    
})


// Get user

router.get('/getuserDetail',async (req,resp)=>{
    const userId = req.query.mobileno;
    if(userId){
        try{
            let user = await User.findOne({userId:userId}).select("-otp");
            resp.send({ respCode: 1, user});
        }
        catch(error){
            resp.send({ respCode: 2, respMsg: "Error fetching user data" });
        }
    }
    else {
        resp.send({ respCode: 3, respMsg: "userId is required" });
    }
    
})


module.exports = router;


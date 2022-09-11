const Disconnection = require('../model/Disconnection');
const express = require('express');
const { body, validationResult } = require('express-validator');
const { exists } = require('../model/Disconnection');
const multer=require("multer")
const path=require('path')

const router = express.Router();

//file path for storing file on backend express
const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./data");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"--"+file.originalname);
    },
});

//Route 1: To get disconnection data
router.get('/getdc', async (req, resp) => {
    const count = req.query.count;
    if (count) {
        const disconnectionData = await Disconnection.find({$and:[{ $or: [{ "billingStatus": "Live" }, { "billingStatus": "First Bill Issued" }, { "billingStatus": "New Connection" }] },{"AssignedTo":null}]})
            .limit(count);

        resp.send({ respCode: 1, disconnectionData });
    }
    else {
        resp.send({ respCode: 2, respMsg: "count not set" })
    }
})

router.post('/assigndc', [
    body('accountIds', 'accountIds field is required').exists({ checkFalsy: true }),
    body('jeId', 'JE field is required').exists({ checkFalsy: true }),
    body('linemanId', 'lineman Id field is required').exists({ checkFalsy: true })
], async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.send({ respCode: 3, respMsg: errors.array() })
        }
        console.log(req.body)
        const accountIds = req.body.accountIds;
        const jeId = req.body.jeId;
        const linemanId = req.body.linemanId;
        console.log(req.body.accountIds)
        var currDate = new Date();
        var localDate = currDate.toLocaleString();
        console.log(localDate)
        try {
            const result = await Disconnection.updateMany({ accountId: { $in: accountIds } }, { $set: { AssignedTo: linemanId, AssignedBy: jeId, AssignedDate: localDate } })
            if (result.acknowledged) {
                resp.send({ respCode: 1, respMsg: result.modifiedCount + " Updated successfully" });
            }
        }
        catch (error) {
            resp.send({respCode:2, respMsg:error})
        }
    })





    //Route for lineman work assigned

    router.get('/getlinemandc', async (req, resp) => {
        const count = req.query.count;
        const linemanId=req.query.linemanId;
        if (count) {
            const disconnectionData = await Disconnection.find({$and:[{"AssignedTo":linemanId},{"CompletionDate":null}]})
                .limit(count);
    
            resp.send({ respCode: 1, disconnectionData });
        }
        else {
            resp.send({ respCode: 2, respMsg: "count not set" })
        }
    })


    //Route update lineman disconnection data
    router.post('/setdcDate', [
        body('accountIds', 'accountIds field is required').exists({ checkFalsy: true })
        // body('jeId', 'JE field is required').exists({ checkFalsy: true }),
        // body('linemanId', 'lineman Id field is required').exists({ checkFalsy: true })
    ], async (req, resp) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.send({ respCode: 3, respMsg: errors.array() })
            }
            console.log(req.body)
            const accountIds = req.body.accountIds;
            // const jeId = req.body.jeId;
            // const linemanId = req.body.linemanId;
            console.log(req.body.accountIds)
            var currDate = new Date();
            var localDate = currDate.toLocaleString();
            console.log(localDate)
            try {
                const result = await Disconnection.updateMany({ accountId: { $in: accountIds } }, { $set: { CompletionDate: localDate } })
                const result1=await Disconnection.updateMany({ accountId: { $in: accountIds } }, { $set: { Remark: "Disconnected" } })
                if (result.acknowledged && result1.acknowledged) {
                    resp.send({ respCode: 1, respMsg: result.modifiedCount + " Updated successfully" });
                }
            }
            catch (error) {
                resp.send({respCode:2, respMsg:error})
            }
        })

         //Route for getting report base on user Role and userId

    router.get('/getreport', async (req, resp) => {
        const role=req.query.role;
        const userId = req.query.userId;
        
        if(role=='JE')
        {
            //const JEdata = await Disconnection.find({$and:[{"AssignedTo":{ $exists : true, $not : null }},{"AssignedBy":userId}]});
            const jeData = await Disconnection.find({"AssignedBy":userId});
            resp.send({respCode:1, jeData});
        }

        else if(role=='Lineman')
        {
            const linemanData = await Disconnection.find({"AssignedTo":userId});
            resp.send({respCode:2, linemanData});
        }

        else
        {
            resp.send({respCode:3, respMsg:"Some error occurred"});
        }
        
    });
        

    // Route: To submit csv file at backend
const upload=multer({storage:fileStorageEngine});
router.post("/single",upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.send({respCode:1,msg:"Single file upload success"})
});

    
module.exports = router;
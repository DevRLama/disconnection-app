const Disconnection = require('../model/Disconnection');
const DisconnectionAssignment = require('../model/DisconnectionAssignment');
const express = require('express');

const router = express.Router();

router.get('/getdc', async (req, resp) => {
    const count = req.query.count;
    if (count) {
        const disconnectionData = await Disconnection.find({ $or: [{ "billingStatus": "Live" }, { "billingStatus": "First Bill Issued" }, { "billingStatus": "New Connection" }] })
            .limit(count);

        resp.send({respCode:1, disconnectionData});
    }
    else{
        resp.send({respCode:2,respMsg:"count not set"})
    }
})

module.exports = router;
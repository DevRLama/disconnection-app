const Disconnection = require('../model/Disconnection');
const express = require('express');
const { body, validationResult } = require('express-validator');
const { exists } = require('../model/Disconnection');

const router = express.Router();

router.get('/getdc', async (req, resp) => {
    const count = req.query.count;
    if (count) {
        const disconnectionData = await Disconnection.find({ $or: [{ "billingStatus": "Live" }, { "billingStatus": "First Bill Issued" }, { "billingStatus": "New Connection" }] })
            .limit(count);

        resp.send({ respCode: 1, disconnectionData });
    }
    else {
        resp.send({ respCode: 2, respMsg: "count not set" })
    }
})

router.post('/assigndc', [
    body().isArray(),
    body('*.accountIds', 'accountIds field is required').exists({ checkFalsy: true }),
    body('*.jeId', 'JE field is required').exists({ checkFalsy: true }),
    body('*.linemanId', 'lineman Id field is required').exists({ checkFalsy: true })], async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.send({ respCode: 2, respMsg: errors.array() })
        }
        const accountIds = req.body.accountIds;
        const jeId = req.body.jeId;
        const linemanId = req.body.linemanId;
        var currDate = new Date();
        var localDate = currDate.toLocaleString();
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

module.exports = router;
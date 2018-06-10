import {
    fromRpcSig,
    toBuffer,
    hashPersonalMessage,
    ecrecover,
    publicToAddress,
    bufferToHex,
} from 'ethereumjs-util'

import resources from './resources'
import { signerDidPay, summary, withinTimeWindow } from './helpers'

const express = require('express')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(express.static("dist"))

interface ResourceRequest {
    signingAddress: string
    timestamp: Date
    resourceId: string
}

function recoverResourceRequest(sig: string, msg: string): ResourceRequest {
    const [timestamp, resourceId] = msg.split('|')
    const resourceIdBuffer = toBuffer(resourceId)
    const resourceIdHash = hashPersonalMessage(resourceIdBuffer)

    const sigBuffer = toBuffer(sig)
    const sigParams = fromRpcSig(sigBuffer)
    const publicKey = ecrecover(
        hashPersonalMessage(new Buffer(msg, 'utf8')),
        sigParams.v,
        sigParams.r,
        sigParams.s,
    )

    const addressBuffer = publicToAddress(publicKey)
    const signingAddress = bufferToHex(addressBuffer)

    const resourceRequest = {
        signingAddress,
        timestamp: new Date(timestamp),
        resourceId,
    }
    return resourceRequest
}

app.get("/v1/resources/", async (req, res) => {
    console.log("GET /v1/resources/", req.query["msg"])
    const {
        signingAddress,
        timestamp,
        resourceId,
    } = recoverResourceRequest(req.query["sig"], req.query["msg"])
    // confirm timestamp in valid range
    if (!withinTimeWindow(timestamp)) {
        res.status(403).send("Forbidden")
        return
    }
    // TODO probably could use a nonce in the protocol...
    // check if signingAddress paid for resource Id
    // return resource if paid for
    // return summary if not paid for
    let resource = resources[resourceId]
    const paid = await signerDidPay(signingAddress, resourceId, resource.price)
    if (!paid) {
        resource = summary(resource)
        resource.paid = false
    } else {
        resource.paid = true
    }
    res.status(200).send(resource)
})

app.listen(3000, () => console.log("Listening on port 3000"))

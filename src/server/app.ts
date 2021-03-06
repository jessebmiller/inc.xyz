import {
    fromRpcSig,
    toBuffer,
    hashPersonalMessage,
    ecrecover,
    publicToAddress,
    bufferToHex,
} from 'ethereumjs-util'

import getResources from './resources'
import { signerDidPay, summary } from './helpers'

const express = require('express')

const app = express()

const resources = getResources()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(express.static(__dirname + "/client"))

interface ResourceRequest {
    signingAddress: string
    resourceId: string
}

function recoverResourceRequest(sig: string, msg: string): ResourceRequest {
    const resourceId = msg
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
        resourceId,
    }
    return resourceRequest
}

app.get("/v1/resources/", async (req, res) => {
    console.log("GET /v1/resources/", req.query.msg, req.query.sig)
    const {
        signingAddress,
        resourceId,
    } = recoverResourceRequest(req.query.sig, req.query.msg)
    console.log("recovered", signingAddress, resourceId)
    // check if signingAddress paid for resource Id
    // return resource if paid for
    // return summary otherwise
    let resource = resources[resourceId]
    const paid = await signerDidPay(signingAddress, resource.fundingAddress, resource.price)
    if (!paid) {
        resource = summary(resource)
        resource.paid = false
    } else {
        resource.paid = true
    }
    res.status(200).send(resource)
})

app.get("/*", (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})

app.listen(80, () => console.log("Listening on port 80"))

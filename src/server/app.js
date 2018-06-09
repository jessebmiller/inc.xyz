"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereumjs_util_1 = require("ethereumjs-util");
const resources_1 = require("./resources");
const helpers_1 = require("./helpers");
const express = require('express');
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static("dist"));
function recoverResourceRequest(sig, msg) {
    const [timestamp, resourceId] = msg.split('|');
    const requestBuffer = ethereumjs_util_1.toBuffer(sig);
    const sigParams = ethereumjs_util_1.fromRpcSig(requestBuffer);
    const resourceIdBuffer = ethereumjs_util_1.toBuffer(resourceId);
    const resourceIdHash = ethereumjs_util_1.hashPersonalMessage(resourceIdBuffer);
    const publicKey = ethereumjs_util_1.ecrecover(resourceIdHash, sigParams.v, sigParams.r, sigParams.s);
    const addressBuffer = ethereumjs_util_1.publicToAddress(publicKey);
    const signingAddress = ethereumjs_util_1.bufferToHex(addressBuffer);
    // TODO CHECK FOR VALIDITY AND ERRORS!!!
    const resourceRequest = {
        signingAddress,
        timestamp: new Date(timestamp),
        resourceId,
    };
    return resourceRequest;
}
app.get("/v1/resources/", (req, res) => {
    console.log("GET /v1/resources/", req.query["resource-request"]);
    const { signingAddress, timestamp, resourceId, } = recoverResourceRequest(req.query["sig"], req.query["msg"]);
    // confirm timestamp in valid range
    if (!helpers_1.withinTimeWindow(timestamp)) {
        res.status(403).send("Forbidden");
        return;
    }
    // TODO probably could use a nonce in the protocol...
    // check if signingAddress paid for resource Id
    // return resource if paid for
    // return summary if not paid for
    let resource = resources_1.default[resourceId];
    if (!helpers_1.signerDidPay(signingAddress, resourceId)) {
        resource = helpers_1.summary(resource);
        resource.paid = false;
    }
    resource.paid = true;
    res.status(200).send(resource);
});
app.listen(3000, () => console.log("Listening on port 3000"));

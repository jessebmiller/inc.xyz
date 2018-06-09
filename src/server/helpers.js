"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signerDidPay = (signingAddress, resourceId) => {
    // TODO kinda looks like setting up a contract to identify payment is the
    //      easier way to do this. It's that or setting up an index.
    //      maybe etherscan can help here?
};
exports.summary = resource => {
    return Object.assign({}, resource, { content: "" });
};
exports.withinTimeWindow = (timestamp) => {
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const years = days * 365;
    const window = 30 * days;
    const now = new Date().getTime();
    const time = timestamp.getTime();
    // is now between the signed time and the window?
    return (now > time && now < (time + window)) ? true : false;
};

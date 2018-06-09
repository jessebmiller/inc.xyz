"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signerDidPay = (signingAddress, resourceId) => {
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

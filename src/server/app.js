const express = require('express');
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static("dist"));
const resources = {
    "0x123": {
        title: "Article Title",
        "abstract": "Article abstract...",
        content: "# Article \n\n full article about some stuff",
        fundingAddress: "0x123",
        price: 100000,
        "type": "Article",
    },
    "0x456": {
        title: "Another Title",
        "abstract": "Just the abstract...",
        content: "# Full Content \n\n shouldn't be allowed",
        fundingAddress: "0x456",
        price: 100000,
        "type": "Article",
    }
};
function recoverResourceRequest(signedRequest) {
    return {
        signingAddress: "0x123",
        timestamp: new Date(),
        resourceId: "0x456",
    };
}
app.get("/v1/resources/", (req, res) => {
    const request = recoverResourceRequest(req.query["resource-request"]);
    res.status(200).send(resources["0x123"]);
});
app.listen(3000, () => console.log("Listening on port 3000"));

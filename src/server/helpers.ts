import { URL } from 'url'
import fetch from 'node-fetch'

interface Transaction {
    "from": string
    to: string
    value: string
    confirmations: string
}

`
{
    "blockNumber":"330511",
    "timeStamp":"1443927353",
    "hash":"0x27e199cba5fee6d23fb084ada3407711f431b552ee1b8d46c670093a0e0ecbd6",
    "nonce":"12",
    "blockHash":"0x7166f1377d5e1f91f...0dd768c379ce3ec646eda7e4c97be0e6",
    "transactionIndex":"0",
    "from":"0x063dd253c8da4ea9b12105781c9611b8297f5d14",
    "to":"0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
    "value":"0",
    "gas":"300000",
    "gasPrice":"50000000000",
    "isError":"0",
    "txreceipt_status":"",
    "input":"0x797af62726fa5f182c...b7479c893be2548ea03d9dcd0c8e598",
    "contractAddress":"",
    "cumulativeGasUsed":"35817",
    "gasUsed":"35817",
    "confirmations":"5428830",
}
`

const transactionPaysPrice = (
    tx: Transaction,
    fundingAddress: string,
    price: number,
): boolean => {
    if (fundingAddress !== tx.to) {
        return false
    }
    if (price > parseInt(tx.value, 10)) {
        return false
    }
    if (parseInt(tx.confirmations, 10) < 5) {
        return false
    }
    // it's confirmed, to the resource, and is enough value
    // TODO total all transactions so if someone pays less they aren't screwed.
    return true
}

export const signerDidPay = async (
    signingAddress: string,
    fundingAddress: string,
    price: number,
): Promise<boolean> => {
    if (price === 0) {
        return await true
    }
    let apiURL = new URL("https://api-ropsten.etherscan.io/api")
    apiURL.searchParams.append("address", signingAddress)
    apiURL.searchParams.append("module", "account")
    apiURL.searchParams.append("action", "txlist")
    const urlString = apiURL.toString()
    const response = await fetch(urlString)
    const responseObj = await response.json()
    for(let tx of responseObj.result) {
        if(transactionPaysPrice(tx, fundingAddress, price)) {
            return await true
        }
    }
    return await false
}

export const summary = resource => {
    return Object.assign({}, resource, { content: "" })
}

export const withinTimeWindow = (timestamp: Date): boolean => {
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const years = days * 365;

    const window = 30 * days

    const now = new Date().getTime()
    const time = timestamp.getTime()

    // is now between the signed time and the window?
    return (now > time && now < (time + window)) ? true : false
}

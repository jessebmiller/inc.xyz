import React from 'react'
import unit from 'ethjs-unit'

let FundButton = ({ paid, price, fundingAddress, type }) => {
  return (
    paid ? (
      null
    ) : (
      <p>Please pay {unit.fromWei(price, "ether")}ETH to {fundingAddress} on Ropsten to unlock this {type}.</p>
    )
  )
}

export default FundButton

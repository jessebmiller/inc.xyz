import React from 'react'
import { connect } from 'react-redux'
import unit from 'ethjs-unit'

let FundButton = ({ paid, price, fundingAddress, type }) => {
  return (
    paid ? (
      null
    ) : (
      <p>Please pay {unit.fromWei(price, "ether")}ETH to {fundingAddress} to unlock this {type}.</p>
    )
  )
}

/*
function mapState(state) {
  console.log("state", state)
  return {
    eth: state.eth
  }
}

FundButton = connect(mapState)(FundButton)
*/

export default FundButton

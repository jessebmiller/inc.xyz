import React from 'react'

let FundButton = ({ funded, fundingGoal, fundingAddress }) => {
  return (
    funded ? (
      null
    ) : (
      <p>goal: {fundingGoal}, address: {fundingAddress}</p>
    )
  )
}

export default FundButton

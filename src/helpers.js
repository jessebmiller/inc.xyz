import ethUtil from 'ethereumjs-util'
import store from './store'

export async function sign (data, account) {
  const eth = store.getState().eth
  if (!account) {
    account = await eth.coinbase()
  }
  const message = ethUtil.bufferToHex(new Buffer(data, 'utf8'))
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [account, message],
      from: account
    }, (err, result) => {
      if (err !== null) {
        reject(err)
      }
      resolve(result)
    })
  })
}

---
title: Ropsten Incrementalist Test
abstract: |
  It's not a very interesting article, but you can pay for it to see how the
  system works.
price: 1000000000000000
type: Article
fundingAddress: 0x293acc337277d5d4618e919f8d6fe22adcdb401e
---

## How this thing works
* There is a trusted (for now) server
* The client, your web browser and MetaMask, signed a message asking for this
* The server checked the etherscan api to see if the signing address has paid
  the address associated with this article
  * if it did, you got this
  * otherwise you got the title, abstract and a message asking you to pay

## It's just a proof of concept
* But I'm building it out
* I'm doing it on my own nights and weekends
* You can get involved too! contact me on the GitHub repo
  (jessebmiller/inc.xyz)[https://github.com/jessebmiller/inc.xyz)
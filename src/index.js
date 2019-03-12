const Keystore = require('./keystore')
const Keygen = require('./keygen')

const ecc = require('celesosjs-ecc')

module.exports = {
  Keystore,
  Keygen,
  modules: {
    ecc
  }
}
const Keystore = require('./keystore')
const Keygen = require('./keygen')

const ecc = require('celesjs-ecc')

module.exports = {
  Keystore,
  Keygen,
  modules: {
    ecc
  }
}
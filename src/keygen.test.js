/* eslint-env mocha */
const assert = require('assert')
const { accountPermissions, checkKeySet } = require('./test-utils.js')

const { PrivateKey } = require('celesjs-ecc')
const Keygen = require('./keygen')

describe('Keygen', () => {
	it('initialize', () => PrivateKey.initialize())

	it('generateMasterKeys (create)', async () => {
		const keys = await Keygen.generateMasterKeys()
		checkKeySet(keys)
	}).timeout(5000)

	it('generateMasterKeys (re-construct)', async () => {
		const master = 'PW5JMx76CTUTXxpAbwAqGMMVzSeJaP5UVTT5c2uobcpaMUdLAphSp'
		const keys = await Keygen.generateMasterKeys(master)
		assert.equal(keys.masterPrivateKey, master, 'masterPrivateKey')
		checkKeySet(keys)
	})

	it('authsByPath', () => {
		const paths = Keygen.authsByPath(accountPermissions)
		assert.deepEqual(['active', 'active/mypermission', 'owner'], Object.keys(paths))
	})

	it('deriveKeys', async () => {
		const master = 'PW5JMx76CTUTXxpAbwAqGMMVzSeJaP5UVTT5c2uobcpaMUdLAphSp'
		const keys = await Keygen.generateMasterKeys(master)
		const wifsByPath = {
			owner: keys.privateKeys.owner,
			active: keys.privateKeys.active
		}

		const derivedKeys = Keygen.deriveKeys('active/mypermission', wifsByPath)
		const active = PrivateKey(keys.privateKeys.active)
		const checkKey = active.getChildKey('mypermission').toWif()

		assert.equal(derivedKeys.length, 1, 'derived key count')
		assert.equal(derivedKeys[0].path, 'active/mypermission')
		assert.equal(derivedKeys[0].privateKey.toWif(), checkKey, 'wrong private key')
	})
})

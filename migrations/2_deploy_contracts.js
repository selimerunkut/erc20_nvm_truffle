
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const NVMToken = artifacts.require('NVMToken');

module.exports = async function (deployer, network, accounts) {
  const instance = await deployProxy(
    NVMToken,
    [web3.utils.toWei('300000000', 'ether')],
    { deployer, initializer: "initialize", unsafeAllowCustomTypes: true });
  //unsafeAllowCustomTypes Ignores struct mapping in AccessControl, which is fine because it's used in a mapping
  //See: https://solidity.readthedocs.io/en/v0.6.2/miscellaneous.html#mappings-and-dynamic-arrays
  console.log('Deployed', instance.address);
};
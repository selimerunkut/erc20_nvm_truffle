// Load dependencies
const { expect } = require('chai');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

var my_constants = require('./include_in_tesfiles.js')

// Start test block
contract('NVMToken (proxy)', async accounts => {
  before(async function () {
    // Deploy a new contract before the tests
    this.nvmToken = await deployProxy(
      my_constants._t_c.NVMToken,
      [web3.utils.toWei('300000000', 'ether')],
      { initializer: "initialize", unsafeAllowCustomTypes: true });
    console.log('Deployed', this.nvmToken.address);
  });

  it("name should be " + my_constants._t_c.TOKEN_NAME, async function () {
    expect((await this.nvmToken.name()).toString()).to.equal(my_constants._t_c.TOKEN_NAME);
  });

  it("symbol should be " + my_constants._t_c.TOKEN_SYMBOL, async function () {
    expect((await this.nvmToken.symbol()).toString()).to.equal(my_constants._t_c.TOKEN_SYMBOL);
  });

  it('has 18 decimals', async function () {
    expect(await this.nvmToken.decimals()).to.be.bignumber.equal('18');
  });

  it('reverts when transferring tokens to the zero address', async function () {
    await expectRevert(
      this.nvmToken.transfer(constants.ZERO_ADDRESS, 1000, { from: accounts[0] }),
      'ERC20: transfer to the zero address',
    );
  });
  it('has cap of 300 million tokens', async function () {
    expect(await this.nvmToken.cap()).to.be.bignumber.equal('300000000000000000000000000');
  });
});
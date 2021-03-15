const { expect } = require('chai');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

var my_constants = require('./include_in_tesfiles.js')

contract("NVMToken", async accounts => {

  before(async function () {
    // Deploy a new contract before the tests
    this.nvmToken = await deployProxy(
      my_constants._t_c.NVMToken,
      [my_constants._t_c.TOKEN_NAME, my_constants._t_c.TOKEN_SYMBOL],
      { initializer: "initialize", unsafeAllowCustomTypes: true });
    console.log('Deployed', this.nvmToken.address);
    this.nvmToken.setFeeWalletAddress(accounts[1]);
    this.nvmToken.setTransferFeeDivisor(2000);
  });

  it("mint coins and transfer with fee to account, fee should be collected", async function () {

    const transferAmount = 10000000000000000000

    this.nvmToken.mintWithoutDecimals(accounts[0], 10, false)
    let balance = (await this.nvmToken.balanceOf(accounts[0])).toString()
    assert.equal(balance, transferAmount);

    this.nvmToken.mintWithFee(accounts[4], transferAmount.toString())
    let accountBalance = (await this.nvmToken.balanceOf(accounts[4])).toString()
    assert.equal(accountBalance, transferAmount - (transferAmount / my_constants._t_c.FEE))

    mintingFeeAccount = (await this.nvmToken.feeAddress()).toString()
    let feeCollectorAccountBalance = (await this.nvmToken.balanceOf(mintingFeeAccount)).toString()
    assert.equal(feeCollectorAccountBalance, transferAmount / my_constants._t_c.FEE)

  });
});
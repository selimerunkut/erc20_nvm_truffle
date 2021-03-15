// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";

/**
 * @title NVM  Token
 * @dev this contract is a Pausable ERC20 token with Burn and Mint functions.
 * NOTE: All calls to this contract should be made through
 * the proxy, including admin actions.
 * Any call to transfer against this contract should fail.
 */
contract NVMToken is
    ERC20PresetMinterPauserUpgradeable,
    ERC20CappedUpgradeable
{
    function initialize(uint256 cap) public initializer {
        __ERC20PresetMinterPauser_init("NVM Token", "NVM");
        __ERC20Capped_init_unchained(cap);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    )
        internal
        virtual
        override(ERC20CappedUpgradeable, ERC20PresetMinterPauserUpgradeable)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "./Crowdsale.sol";

contract KryptoniteTokenSale is Crowdsale {
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token)
        public
    {

    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "./Crowdsale.sol";
import "./KYCContract.sol";

contract KryptoniteTokenSale is Crowdsale {
    KYCContract kyc;
    
    constructor(uint256 rate, address payable wallet, IERC20 token, KYCContract _kyc) Crowdsale(rate, wallet, token) public {
        kyc = _kyc;
    }

    /**
     * @dev Overriding function from parent Crowdsale contract.
     * Checking if address is approved through KYC before purchasing of the tokens.
     */
     function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
         // Calling the original function from parent contract
         super._preValidatePurchase(beneficiary, weiAmount);
         
         // Checking if the buyer's address has been KYC approved
         require(kyc.isKycCompleted(beneficiary), "KYC is not completed. You cannot buy tokens.");
     }
}
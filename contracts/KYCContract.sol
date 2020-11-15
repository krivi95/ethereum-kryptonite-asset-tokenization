// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYCContract is Ownable{
    mapping(address => bool) approved;

    function approveAddress(address _address) public {
        approved[_address] = true;
    }

    function revokeAddress(address _address) public {
        approved[_address] = false;
    }

    function isKycCompleted(address _address) public view returns(bool) {
        return approved[_address];
    }
}
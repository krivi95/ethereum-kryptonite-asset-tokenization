/**
 * Setting up chai library for testing smart contracts.
 */

 "use strict";

// Importing libraries
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

// Cinfiguring test environment (same settings used in @openzeppelin/test-helpers/src/setup.js)
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);
chai.use(chaiAsPromised);
const expect = chai.expect;

module.exports = chai;
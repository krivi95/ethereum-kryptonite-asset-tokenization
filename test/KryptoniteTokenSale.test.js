/**
 * Testing of a smart contract using chai library.
 * In order to test it, start Ganache and update the truffle.config file to reglect the Ganache network parameters.
 * Command: "truffle test".
 */

// For loading initial supply amount from environment file
// (via "dotenv" library)
require("dotenv").config({"path": "../.env"});

// Setting up testing environment
const chai = require("./setupChai");
const BN = web3.utils.BN;
const expect = chai.expect;

// Contracts for testing
const KryptoniteToken = artifacts.require("./KryptoniteToken.sol");
const KryptoniteTokenSale = artifacts.require("./KryptoniteTokenSale.sol");
const KYCContract = artifacts.require("./KYCContract.sol");

contract("KryptoToken: Initial supply test", async (accounts) => {
    /**
     * We will test the migration of two contracts and the transfer of tokens.
     * Deploying the contracts through migrations file.
     */
    const [ owner, recipient, anotherAccount ] = accounts;

    it("All tokens are transfered to the Crowdsale contract", async () => {
        let instance = await KryptoniteToken.deployed();
        
        // Owner has transfered all the tokens
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(new BN(0));
        
        // Tokens are now with the Crowdsale contract
        let balanceOfKryptoniteTokenSale = await instance.balanceOf(KryptoniteTokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balanceOfKryptoniteTokenSale).to.be.a.bignumber.equal(totalSupply);
    });
    
    it("Should be possible to buy tokens", async () => {
        let instanceKryptoniteToken = await KryptoniteToken.deployed();
        let instanceKYC = await KYCContract.deployed(); 
        let instanceKryptoniteTokenSale = await KryptoniteTokenSale.deployed();

        // Approve address through KYC so the user could buy
        instanceKYC.approveAddress(anotherAccount);

        // Sent ether to KryptoniteTokenSale smart contract and receive tokens in return
        balanceBefore = await instanceKryptoniteToken.balanceOf(anotherAccount);
        expect(instanceKryptoniteTokenSale.sendTransaction({from: anotherAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(instanceKryptoniteToken.balanceOf(anotherAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });
});
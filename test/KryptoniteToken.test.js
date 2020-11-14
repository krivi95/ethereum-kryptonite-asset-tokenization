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

 // Contract for testing
 const KryptoniteToken = artifacts.require("./KryptoniteToken.sol");


contract("KryptoToken: Initial supply test", async (accounts) => {
    const [ owner, recipient, anotherAccount ] = accounts;

    // Truffle hook which is called before running any of the test cases
    // Contract deployment is detached from the migration
    // (We can test the contract standalone, without crowdsale contract) 
    beforeEach(async () => {
        this.KryptoniteToken = await KryptoniteToken.new(process.env.INITIAL_TOKEN_SUPPLY);
    });

    it("Total initial supply of tokens should be in owner's account", async () =>{
        let instance = this.KryptoniteToken;
        let totalSupply = await instance.totalSupply();

        // Initial supple is with owner/deployer of contract
        return expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);   
    });

    it("Sending tokens from one account another", async () => {
        let instance = this.KryptoniteToken;
        let totalSupply = await instance.totalSupply();
        let tokensToSend = 99;

        // Initial supple is with owner/deployer of contract
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);   
        
        // Seding tokens from owner's account to some other account
        expect(instance.transfer(recipient, tokensToSend)).to.eventually.be.fulfilled;   

        // Checking balances on affected accounts        
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(tokensToSend)));   
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(tokensToSend));   
    });

    it("Not possible to transfer more than total number of issued tokens", async () => {
        let instance = this.KryptoniteToken;
        let totalSupply = await instance.totalSupply();
        let tokensToSend = totalSupply.add(new BN(9999));

        // Seding tokens from owner's account to some other account
        expect(instance.transfer(recipient, tokensToSend)).to.eventually.be.rejected;   

        // Initial supple is with owner/deployer of contract and should be intact
        return expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);   
    })
});
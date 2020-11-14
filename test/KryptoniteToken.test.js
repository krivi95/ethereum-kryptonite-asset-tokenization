/**
 * Testing of a smart contract using chai library.
 * In order to test it, start Ganache and update the truffle.config file to reglect the Ganache network parameters.
 * Command: "truffle test".
 */

// Contract for testing
const KryptoniteToken = artifacts.require("./KryptoniteToken.sol");

// Importing libraries
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

// Cinfiguring test environment (same settings used in @openzeppelin/test-helpers/src/setup.js)
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);
chai.use(chaiAsPromised);
const expect = chai.expect;


contract("KryptoToken: Initial supply test", async (accounts) => {
    const [ owner, recipient, anotherAccount ] = accounts;

    it("Total initial supply of tokens should be in owner's account", async () =>{
        let instance = await KryptoniteToken.deployed();
        let totalSupply = await instance.totalSupply();

        // Initial supple is with owner/deployer of contract
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);   
    });

    it("Sending tokens from one account another", async () => {
        let instance = await KryptoniteToken.deployed();
        let totalSupply = await instance.totalSupply();
        let tokensToSend = 99;

        // Initial supple is with owner/deployer of contract
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);   
        
        // Seding tokens from owner's account to some other account
        expect(instance.transfer(recipient, tokensToSend)).to.eventually.be.fulfilled;   

        // Checking balances on affected accounts        
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(tokensToSend)));   
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(tokensToSend));   
    });

    it("Not possible to transfer more than total number of issued tokens", async () => {
        let instance = await KryptoniteToken.deployed();
        let totalSupply = await instance.totalSupply();
        let tokensToSend = totalSupply.add(new BN(9999));

        // Seding tokens from owner's account to some other account
        expect(instance.transfer(recipient, tokensToSend)).to.eventually.be.rejected;   

        // Initial supple is with owner/deployer of contract and should be intact
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);   
    })
});
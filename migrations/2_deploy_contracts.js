// For loading initial supply amount from environment file 
// (via "dotenv" library)
require("dotenv").config({"path": "../.env"});

var KryptoniteToken = artifacts.require("./KryptoniteToken.sol");
var KryptoniteTokenSale = artifacts.require("./KryptoniteTokenSale.sol"); 
var KYC = artifacts.require("./KYCContract.sol");

module.exports = async function (deployer) {
    let tokenSupply = process.env.INITIAL_TOKEN_SUPPLY;
    let address = await web3.eth.getAccounts();

    // Creating/minting new ERC-20 token with given initial supply
    await deployer.deploy(KryptoniteToken, tokenSupply);

    // Creating KYC contract
    await deployer.deploy(KYC);

    // Creating crowdsale contract
    await deployer.deploy(KryptoniteTokenSale, 1, address[0], KryptoniteToken.address, KYC.address);
    
    // Transfering the ownership of tokens to the crowdsale contract
    let instance = await KryptoniteToken.deployed();
    await instance.transfer(KryptoniteTokenSale.address, tokenSupply);
};

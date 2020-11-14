var KryptoniteToken = artifacts.require("./KryptoniteToken.sol");

module.exports = async function (deployer) {
    await deployer.deploy(KryptoniteToken, 1000000);
};

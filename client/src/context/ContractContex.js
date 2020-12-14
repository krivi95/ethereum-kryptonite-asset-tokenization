import React from "react";

/**
 * Setting up a context that stores initialized contacts for interaction with react components.
 */
const ContractContex = React.createContext({
    kryptoniteToken: null,
    kryptoniteTokenSale: null,
    kryptoniteTokenSaleAddress: null,
    kycContract: null,
    web3: null,
    accounts: null
}); 

export default ContractContex;